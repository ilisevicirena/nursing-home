import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { getString } from '../../../resources/strings';
import { Subscription } from 'rxjs';
import { NotesService } from '../../../services/rest/notes.service';

@Component({
  selector: 'sample-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit, OnDestroy {

  constructor(
    private notesService: NotesService
  ) {
  }

  @Input() selectedNote: any;
  @Output() saved: EventEmitter<number> = new EventEmitter();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter();

  public getString = getString;

  private subs: Subscription[] = [];

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  config = {
    placeholder: getString('typeText'),
    height: '350px',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'link', 'hr']]
    ],
    fontNames: ['Open Sans']
  }

  public hexToRgbA(hex: string | undefined): string {
    var c: any;
    if (hex) {
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');

        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.08)';
      }

      return ''
    }

    return '';
  }

  public saveNote(): void {
    if (this.selectedNote.Id == 0) {
      this.subs.push(
        this.notesService.add(this.selectedNote).subscribe(data => {
          if (data.NoteId)
            this.saved.emit(data.NoteId);
        })
      );
    } else {
      this.subs.push(
        this.notesService.update(this.selectedNote).subscribe(() => {
          this.saved.emit(this.selectedNote.Id);
        })
      );
    }
  }

  public cancelSave(): void {
    this.canceled.emit(true);
  }
}
