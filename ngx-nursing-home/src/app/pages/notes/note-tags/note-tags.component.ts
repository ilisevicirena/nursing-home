import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NbDialogRef } from '@nebular/theme';
import { NotesService } from '../../../services/rest/notes.service';
import { TagsService } from '../../../services/rest/tags.service';
import { hexToRgbA } from '../../../resources/functions';

@Component({
  selector: 'sample-note-tags',
  templateUrl: './note-tags.component.html',
  styleUrls: ['./note-tags.component.scss']
})
export class NoteTagsComponent implements OnInit, OnDestroy {

  public getString = getString;
  public noteId: number = 0;
  public tags: any[] = [];
  public selectedTags: any[] = [];
  public hexToRgbA = hexToRgbA;

  private subs: Subscription[] = [];
  private changes: boolean = false;

  constructor(
    private ref: NbDialogRef<NoteTagsComponent>,
    private notesService: NotesService,
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.getTags();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getTags(): void {
    this.subs.push(
      this.tagsService.getData().subscribe(data => {
        this.tags = data;
        if (this.noteId > 0) this.getTagsForNote();
        else this.tags.map(t => t.selected = this.selectedTags.find(x => x.Id == t.Id) ? true : false);
      })
    );
  }

  private getTagsForNote(): void {
    this.subs.push(
      this.notesService.getNoteTags(this.noteId).subscribe(data => {
        this.selectedTags = data;
        this.tags.map(t => t.selected = this.selectedTags.find(x => x.Id == t.Id) ? true : false);
      })
    );
  }

  public close(result: boolean): void {
    this.ref.close({ selectedTags: this.selectedTags, changes: this.changes });
  }

  public toggleSelected(t: any): void {
    t.selected = !t.selected;
    this.changes = true;

    if (this.noteId > 0) {
      if (t.selected) {
        this.subs.push(
          this.notesService.addTagToNote(this.noteId, t.Id).subscribe(() => {
            this.getTagsForNote();
          })
        );
      } else {
        this.subs.push(
          this.notesService.removeTagFromNote(this.noteId, t.Id).subscribe(() => {
            this.getTagsForNote();
          })
        );
      }
    } else {
      if (t.selected)
        this.selectedTags.push(t);
      else
        this.selectedTags.splice(this.selectedTags.findIndex(y => y.Id == t.Id), 1);
    }
  }

  public clearAll(): void {
    this.changes = true;

    if (this.noteId > 0) {
      for (let index = 0; index < this.selectedTags.length; index++) {
        const t = this.selectedTags[index];
        this.subs.push(
          this.notesService.removeTagFromNote(this.noteId, t.Id).subscribe(() => {
            if (index == this.selectedTags.length - 1) this.getTagsForNote();
          })
        );
      }
    } else this.selectedTags = [];
  }
}
