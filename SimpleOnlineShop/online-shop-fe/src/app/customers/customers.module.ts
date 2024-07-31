import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    // ListComponent,
    // DetailsComponent,
    // CreateComponent,
    // EditComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ListComponent,
    DetailsComponent,
    CreateComponent,
    EditComponent
  ]
})
export class CustomersModule { }
