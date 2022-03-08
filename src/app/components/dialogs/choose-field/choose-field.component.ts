import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-choose-field',
  templateUrl: './choose-field.component.html',
  styleUrls: ['./choose-field.component.scss'],
})
export class ChooseFieldComponent implements OnInit, AfterViewInit {
  constructor(public dialogRef: MatDialogRef<any>, public dataService: DataService) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        document.getElementsByTagName('mat-dialog-container')[0].scrollTop = 0;
      }, 1);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChooseField(n) {
    this.dataService.addField(n);
    this.dialogRef.close();
  }
}
