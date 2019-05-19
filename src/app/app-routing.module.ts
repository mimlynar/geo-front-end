import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectCreationComponent} from "./project-creation/project-creation.component";
import {PolarTaskComponent} from "./polar-task/polar-task.component";
import {PolarTaskCreationComponent} from "./polar-task-creation/polar-task-creation.component";
import {ProjectComponent} from "./project/project.component";
import {PointsComponent} from "./points/points.component";
import {Project} from "./project";

const routes: Routes = [
  {path: '', redirectTo: '/projects', pathMatch: 'full'},
  {
    path: 'projects', children:
      [
        {path: '', component: ProjectsComponent},
        {path: 'new', component: ProjectCreationComponent},
        {
          path: ':projectId', children:
            [
              {path: '', component: ProjectComponent},
              {path: 'points', component: PointsComponent},
              {
                path: 'task', children:
                  [
                    {path: '', component: PolarTaskCreationComponent},
                    {path: ':taskId', component: PolarTaskComponent}
                  ]
              }
            ]

        }

      ]
  },
  {path: '**', redirectTo:'projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
