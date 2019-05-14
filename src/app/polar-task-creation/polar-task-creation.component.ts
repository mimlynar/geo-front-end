import {Component, OnInit} from '@angular/core';
import {PolarTask} from "../polarTask";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {PolarService} from "../polar.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './polar-task-creation.component.html',
  styleUrls: ['./polar-task-creation.component.css']
})
export class PolarTaskCreationComponent implements OnInit {

  task: PolarTask;

  constructor(
    private location: Location,
    private router: Router,
    private taskService: PolarService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.task = new PolarTask();
  }

  close(): void {
    this.location.back();
  }

  create(): void {
    this.taskService.save(this.task)
      .subscribe(task => {
        this.router.navigateByUrl("projects/" + this.getCurrentProjectId() + "/task/" + task.id)
        ;
      });

  }

  private getCurrentProjectId(): number {
    let idFromUrl = this.route.snapshot.paramMap.get('projectId');
    return idFromUrl !== null ? +idFromUrl : null;
  }
}
