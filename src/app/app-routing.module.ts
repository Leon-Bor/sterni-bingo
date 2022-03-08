import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './views/index.component';
import { ImprintComponent } from './views/imprint/imprint.component';
import { PrivacyComponent } from './views/privacy/privacy.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'fuck-off', component: ImprintComponent },
  { path: 'who-actually-cares', component: PrivacyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
