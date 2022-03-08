import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { ChooseFieldComponent } from '../components/dialogs/choose-field/choose-field.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, AfterViewInit {
  hatSchonGescheckt = !localStorage.getItem('hatGescheckt');
  hatGescheckt = localStorage.getItem('hatGescheckt') || '0';

  addValue = '';
  name = null;

  constructor(public dataService: DataService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    this.route.queryParams.subscribe((params) => {
      if (params?.saufLink) {
        this.dataService.getBingo(params?.saufLink);
      }

      if (!params?.saufLink) {
        const uuid = localStorage.getItem('saufLink') || uuidv4();
        router.navigate(['/'], { queryParams: { saufLink: uuid } });
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    try {
      (window as any)._mNHandle.queue.push(() => {
        (window as any)._mNDetails.loadTag('635952131', '300x250', '635952131');
      });
    } catch (error) {}
  }

  setHatGescheckt(value) {
    this.hatGescheckt = value;
    localStorage.setItem('hatGescheckt', value);
  }

  onValueChange(e) {
    this.addValue = e.target.value.substring(0, 2);
  }

  onAddValue() {
    if (this.addValue !== '') {
      this.dataService.addKorken(this.addValue.substring(0, 2));
      this.addValue = '';
      document.getElementById('korken-input').focus();
    }
  }

  onKorkenDelete(k) {
    this.dataService.removeKorken(k);
  }

  countKorken(value) {
    return this.dataService.korken.filter((v) => v === value).length;
  }

  isFirstKorken(value, index) {
    return this.dataService.korken.indexOf(value) === index;
  }

  onFieldAdd() {
    const dialogRef = this.dialog.open(ChooseFieldComponent, {
      data: {},
    });
  }

  onNewLink() {
    localStorage.removeItem('saufLink');
    location.reload();
  }

  onNameChange(e) {
    this.name = e.target.value;
  }

  onAddName() {
    if (this.name !== '') {
      this.dataService.addName(this.name);
    }
  }
}
