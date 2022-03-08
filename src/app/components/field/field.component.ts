import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() fieldIndex: number;
  @Input() archive: boolean;

  timeout = null;

  field = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ];

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.field = this.archive ? this.dataService.archiveFields[this.fieldIndex] : this.dataService.fields[this.fieldIndex];
  }

  onChange(e, i1, i2) {
    if (this.field[i1][i2].length === 2) {
      document.getElementById(`${this.fieldIndex}${i1}${i2}`)?.blur();
      this.timeout = setTimeout(() => {
        const id = `${this.fieldIndex}${i2 + 1 > 4 ? i1 + 1 : i1}${i2 + 1 > 4 ? 0 : i2 + 1}`;
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  keytab(event) {
    const element = event.srcElement.nextElementSibling; // get the sibling element

    if (element == null) {
      // check if its null
      return;
    } else {
      element.focus();
    } // focus if not null
  }

  onBlur(e, i1, i2) {
    console.log('blur');
    if (e.target.value !== '') {
      let double = null;

      const value = e.target.value.length === 1 ? '0' + e.target.value : e.target.value;

      for (const [j1, row] of this.field.entries()) {
        const itemIndex = row.indexOf(value?.substring(0, 2));

        if (itemIndex > -1 && (itemIndex !== i2 || j1 !== i1)) {
          double = true;
        }
      }

      if (double) {
        this.field[i1][i2] = '';

        this.dataService.sendNotification('error', `Das Feld ${e.target.value} gibt es schon!`);
      }

      if (this.field[i1][i2].length === 1) {
        this.field[i1][i2] = '0' + this.field[i1][i2];
      }

      this.dataService.saveField(JSON.parse(JSON.stringify(this.field)), this.fieldIndex);
    }
  }

  isFieldComplete() {
    let isComplete = true;

    for (const row of this.field) {
      if (row[0] === '' || row[1] === '' || row[2] === '' || row[3] === '' || row[4] === '') {
        isComplete = false;
      }
    }

    return isComplete;
  }

  getCircleImage(val) {
    return this.archive ? this.dataService.archiveBingoNumbers[this.fieldIndex].includes(val) : this.dataService.korken.includes(val);
  }
}
