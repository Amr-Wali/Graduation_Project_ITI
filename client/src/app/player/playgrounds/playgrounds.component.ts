import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/sharedServices/playground.service';

@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.css']
})
export class PlaygroundsComponent implements OnInit {

  serverError;
  PlaygroundsList = [];
  constructor(private playgroundService: PlaygroundService) { }

  list() {
    this.playgroundService.getAll().subscribe((list) => {
      this.PlaygroundsList = <any>list;
    },
      err => {
        this.serverError = err;
      }
    );
  }

  ngOnInit() {
    this.list();
  }

}
