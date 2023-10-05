import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { MazeService } from '../services/maze.service';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  // Initialize app, pacman, dots, ghosts, maze, keystate
  private app: any;
  private game: Game = new Game();
  private keysState: { [key: string]: boolean } = {};

  // Add constructor to initialize services
  constructor(
    private ngZone: NgZone,
    private gameService: GameService,
    private mazeService: MazeService
  ) {}

  ngOnInit(): void {
    // Create pixi application
    this.ngZone.runOutsideAngular(() => {
      this.app = new PIXI.Application({
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
      });
      document.body.appendChild(this.app.view);

      // Initialize game elements - create methods for create pacman, dots, ghosts, maze
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

    for (const dot of this.game.dots) {
      this.app.stage.addChild(dot.sprite);
    }
  }

  createGhosts(): void {
    this.game.ghosts = this.gameService.createGhosts();

    for (const ghost of this.game.ghosts) {
      this.app.stage.addChild(ghost.sprite);
    }
  }

  createMaze(): void {
    // this.game.maze = this.mazeService.createMaze();
    // TODO: use maze service
  }

  // Create host listeners

  ngOnDestroy(): void {
    // Clean up resources when component is destroyed
    this.app.destroy();
  }
}
