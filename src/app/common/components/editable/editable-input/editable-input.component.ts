import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent implements OnInit {
  @Input() entity: any;
  @Input() set field(fieldName: string) {
    this.entityField = fieldName;
    this.entityValueOrigin = this.entity[this.entityField];
  }
  @Input() className: string;
  @Output() entityUpdated = new EventEmitter();

  isActiveInput = false;

  public entityField: string;
  public entityValueOrigin: any;

  constructor() { }

  ngOnInit() {
  }

  updateEntity() {
    const entityValue = this.entity[this.entityField];

    if (entityValue !== this.entityValueOrigin) {
      this.entityUpdated.emit({[this.entityField]: this.entity[this.entityField]});
      this.entityValueOrigin = this.entity[this.entityField];
    }
    this.isActiveInput = false;
  }

  cancelUpdate() {
    this.isActiveInput = false;
    this.entity[this.entityField] = this.entityValueOrigin;
  }

}
