import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { UbigeoComponent } from './ubigeo/ubigeo.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    UbigeoComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
