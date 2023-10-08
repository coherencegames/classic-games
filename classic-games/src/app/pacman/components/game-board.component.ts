import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  HostListener,
} from '@angular/core';
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
  private keyState: { [key: string]: boolean } = {};
  private direction: string = '';

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

      this.app.ticker.add(() => {
        this.handleInput();
        this.movePacman();
        this.updateGame();
      });
    });
  }

  createPacman(): void {
    this.game.pacman = this.gameService.createPacman();
    this.game.pacman.sprite.x = Constants.GAME_WIDTH / 2;
    this.game.pacman.sprite.y = Constants.GAME_HEIGHT / 2;

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

  private updateGame(): void {}

  private movePacman(): void {
    if (this.game.pacman) {
      let result = this.gameService.movePacman(
        this.game.pacman.sprite.x,
        this.game.pacman.sprite.y,
        this.direction
      );
      
      this.game.pacman.sprite.x = result.x;
      this.game.pacman.sprite.y = result.y;
    }
  }

  private handleInput(): void {
    if (this.keyState['ArrowUp']) {
      this.direction = Constants.PACMAN_DIRECTION_UP;
    }
    if (this.keyState['ArrowDown']) {
      this.direction = Constants.PACMAN_DIRECTION_DOWN;
    }
    if (this.keyState['ArrowLeft']) {
      this.direction = Constants.PACMAN_DIRECTION_LEFT;
    }
    if (this.keyState['ArrowRight']) {
      this.direction = Constants.PACMAN_DIRECTION_RIGHT;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.keyState[event.key] = true;
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.keyState[event.key] = false;
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
