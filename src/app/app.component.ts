import { Component, OnInit } from '@angular/core';
import { CanonicalService } from './cano.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sterni-app';

  constructor(private canonicalService: CanonicalService) {}

  ngOnInit() {
    this.canonicalService.setCanonicalURL();
  }
}
