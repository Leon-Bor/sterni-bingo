import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/index.component';
import { ImprintComponent } from './views/imprint/imprint.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { FieldComponent } from './components/field/field.component';
import { KorkenComponent } from './components/korken/korken.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChooseFieldComponent } from './components/dialogs/choose-field/choose-field.component';
@NgModule({
  declarations: [AppComponent, IndexComponent, ImprintComponent, PrivacyComponent, FieldComponent, KorkenComponent, ChooseFieldComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MatDialogModule],
  providers: [],
  entryComponents: [ChooseFieldComponent],
  exports: [MatDialogModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
