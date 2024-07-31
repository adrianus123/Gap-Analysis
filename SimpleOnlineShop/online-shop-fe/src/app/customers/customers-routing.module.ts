import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'customers',
    redirectTo: 'customers/list',
    pathMatch: 'full'
  },
  {
    path: 'customers/list',
    component: ListComponent
  },
  {
    path: 'customers/details',
    component: DetailsComponent
  },
  {
    path: 'customers/create',
    component: CreateComponent
  },
  {
    path: 'customers/edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
