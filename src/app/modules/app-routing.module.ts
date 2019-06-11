import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProjectsComponent} from "../components/projects/projects.component";
import {PolarTaskComponent} from "../components/polar-task/polar-task.component";
import {ProjectComponent} from "../components/project/project.component";
import {PointsComponent} from "../components/points/points.component";

const routes: Routes = [
  {path: '', redirectTo: '/projects', pathMatch: 'full'},
  {
    path: 'projects', children:
      [
        {path: '', component: ProjectsComponent},
        {
          path: ':projectId', children:
            [
              {path: '', component: ProjectComponent},
              {path: 'points', component: PointsComponent},
              {path: 'task/:taskId', component: PolarTaskComponent}
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
