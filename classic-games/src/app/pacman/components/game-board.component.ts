import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Constants } from '../core/constants';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { MazeService } from '../services/maze.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  private app: any;
  private game: Game = new Game();
  private keysState: { [key: string]: boolean } = {};

  constructor(
    private ngZone: NgZone,
    private gameService: GameService,
    private mazeService: MazeService
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.app = new PIXI.Application({
        width: Constants.GAME_WIDTH,
        height: Constants.GAME_HEIGHT,
      });
      document.body.appendChild(this.app.view);

      this.createMaze();

      this.createPacman();
      this.createDots();
      this.createGhosts();
    });

    // Start game loop - create methods for move pacman, handle input, update game
  }

  createPacman(): void {
    this.game.pacman = this.gameService.createPacman();
    this.app.stage.addChild(this.game.pacman?.sprite);
  }

  createDots(): void {
    this.game.dots = this.gameService.createDots();

    for (let dot of this.game.dots) {
      this.app.stage.addChild(dot.sprite);
    }
  }

  createGhosts(): void {
    this.game.ghosts = this.gameService.createGhosts();

    for (let ghost of this.game.ghosts) {
      this.app.stage.addChild(ghost.sprite);
    }
  }

  createMaze(): void {
    this.game.maze = this.mazeService.createMaze();

    for (let cellSprite of this.game.maze.cellSprites) {
      this.app.stage.addChild(cellSprite);
    }
  }

  // Create host listeners

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
