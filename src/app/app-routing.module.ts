import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllItemsComponent } from './components/all-items/all-items.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: "", component: AllItemsComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
