import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { NbDialogRef } from "@nebular/theme";
import { NotesService } from "../../../services/rest/notes.service";
import { TagsService } from "../../../services/rest/tags.service";
import { hexToRgbA } from "../../../resources/functions";

@Component({
  selector: "sample-note-tags",
  templateUrl: "./note-tags.component.html",
  styleUrls: ["./note-tags.component.scss"],
})
export class NoteTagsComponent implements OnInit, OnDestroy {
  public getString = getString;
  public hexToRgbA = hexToRgbA;
  public noteId: number = 0;
  public tags: any[] = [];
  public selectedTags: any[] = [];

  private _subs: Subscription[] = [];
  private _changes: boolean = false;

  constructor(
    private _ref: NbDialogRef<NoteTagsComponent>,
    private _notesService: NotesService,
    private _tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.getTags();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getTags(): void {
    this._subs.push(
      this._tagsService.getData().subscribe((data) => {
        this.tags = data;
        if (this.noteId > 0) this.getTagsForNote();
        else
          this.tags.map(
            (t) =>
              (t.selected = this.selectedTags.find((x) => x.Id == t.Id)
                ? true
                : false)
          );
      })
    );
  }

  private getTagsForNote(): void {
    this._subs.push(
      this._notesService.getNoteTags(this.noteId).subscribe((data) => {
        this.selectedTags = data;
        this.tags.map(
          (t) =>
            (t.selected = this.selectedTags.find((x) => x.Id == t.Id)
              ? true
              : false)
        );
      })
    );
  }

  public close(): void {
    this._ref.close({
      selectedTags: this.selectedTags,
      changes: this._changes,
    });
  }

  public toggleSelected(t: any): void {
    t.selected = !t.selected;
    this._changes = true;

    if (this.noteId > 0) {
      if (t.selected) {
        this._subs.push(
          this._notesService.addTagToNote(this.noteId, t.Id).subscribe(() => {
            this.getTagsForNote();
          })
        );
      } else {
        this._subs.push(
          this._notesService
            .removeTagFromNote(this.noteId, t.Id)
            .subscribe(() => {
              this.getTagsForNote();
            })
        );
      }
    } else {
      if (t.selected) this.selectedTags.push(t);
      else
        this.selectedTags.splice(
          this.selectedTags.findIndex((y) => y.Id == t.Id),
          1
        );
    }
  }

  public clearAll(): void {
    this._changes = true;

    if (this.noteId > 0) {
      for (let index = 0; index < this.selectedTags.length; index++) {
        const t = this.selectedTags[index];
        this._subs.push(
          this._notesService
            .removeTagFromNote(this.noteId, t.Id)
            .subscribe(() => {
              if (index == this.selectedTags.length - 1) this.getTagsForNote();
            })
        );
      }
    } else this.selectedTags = [];
  }
}
