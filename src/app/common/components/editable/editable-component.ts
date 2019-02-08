import { OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

export class EditableComponent implements OnChanges {
  @Input() entity: any;
  @Input() set field(fieldName: string) {
    this.entityField = fieldName;
    this.setOriginValue();
  }
  @Input() className: string;
  @Output() entityUpdated = new EventEmitter();
  @Input() style: any;

  isActiveInput = false;

  public entityField: string;
  public entityValueOrigin: any;

  constructor() { }

  ngOnChanges() {
    this.setOriginValue();
    this.isActiveInput = false;
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

  private setOriginValue() {
    this.entityValueOrigin = this.entity[this.entityField];
  }

}
