import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from '../app.component';
import {PolarTaskComponent} from '../components/polar-task/polar-task.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProjectsComponent} from '../components/projects/projects.component';
import {ProjectComponent} from '../components/project/project.component';
import {AppRoutingModule} from './app-routing.module';
import {ProjectCreationComponent} from '../components/project-creation/project-creation.component';
import {PolarTaskCreationComponent} from '../components/polar-task-creation/polar-task-creation.component';
import {PointsComponent} from '../components/points/points.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomMaterialModule} from "./custom-material.module";
import {MatAutocompleteModule} from "@angular/material";
import {MessageComponent} from '../components/message/message.component';
import {HttpErrorInterceptor} from "../services/errorHandler";


@NgModule({
  declarations: [
    AppComponent,
    PolarTaskComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectCreationComponent,
    PolarTaskCreationComponent,
    PointsComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [PolarTaskCreationComponent, ProjectCreationComponent]
})
export class AppModule { }
