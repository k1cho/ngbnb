import { Component, Input } from '@angular/core';
import { EditableComponent } from '../editable-component';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent extends EditableComponent {
  @Input() type = 'text';

  @Input() transform = (value) => value;
}
