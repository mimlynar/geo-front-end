import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PolarTaskComponent} from './polar-task/polar-task.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProjectsComponent} from './projects/projects.component';
import {ProjectComponent} from './project/project.component';
import {AppRoutingModule} from './app-routing.module';
import {ProjectCreationComponent} from './project-creation/project-creation.component';
import {PolarTaskCreationComponent} from './polar-task-creation/polar-task-creation.component';
import {PointsComponent} from './points/points.component';
import {HttpClientModule} from '@angular/common/http';
import {CustomMaterialModule} from "./custom-material/custom-material.module";
import {MatAutocompleteModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    PolarTaskComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectCreationComponent,
    PolarTaskCreationComponent,
    PointsComponent
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
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PolarTaskCreationComponent, ProjectCreationComponent]
})
export class AppModule { }
