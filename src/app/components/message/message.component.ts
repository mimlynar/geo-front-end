import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.messageService.dataSource.subscribe(message => this.showMessage(message))
  }


  showMessage(message: string) {
    if (message) {
      this.openSnackBar(message);
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
