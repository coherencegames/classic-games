import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Constants } from '../core/constants';
import { Pacman } from '../models/pacman.model';
import { Dot } from '../models/dot.model';
import { Ghost } from '../models/ghost.model';
import { MazeService } from './maze.service';

const CELL_WIDTH = Constants.MAZE_WIDTH / Constants.COLS;
const CELL_HEIGHT = Constants.MAZE_HEIGHT / Constants.ROWS;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private mazeService: MazeService) {}

  createPacman(): Pacman {
    let pacman: Pacman = {
      x: 0,
      y: 0,
      sprite: PIXI.Sprite.from('assets/images/pacman.png'),
    };

    // Resize
    pacman.sprite.width = Constants.PACMAN_SPRITE_WIDTH;
    pacman.sprite.height = Constants.PACMAN_SPRITE_HEIGHT;

    pacman.sprite.x = pacman.x * CELL_WIDTH;
    pacman.sprite.y = pacman.y * CELL_HEIGHT;

    return pacman;
  }

  createDots(): Dot[] {
    let validCoordinates = this.mazeService.getDotsValidCoordinates();
    let dots: Dot[] = [];

    for (let coordinates of validCoordinates) {
      let dot: Dot = {
        x: coordinates.x,
        y: coordinates.y,
        sprite: PIXI.Sprite.from('assets/images/dot.png'),
      };

      // Resize
      dot.sprite.width = Constants.DOT_SPRITE_WIDTH;
      dot.sprite.height = Constants.DOT_SPRITE_HEIGHT;

      dot.sprite.x = dot.x;
      dot.sprite.y = dot.y;

      dots.push(dot);
    }

    return dots;
  }

  createGhosts(): Ghost[] {
    let validCoordinates = this.mazeService.getGhostsValidCoordinates();
    let ghosts: Ghost[] = [];

    for (let coordinates of validCoordinates) {
      let ghost: Ghost = {
        x: coordinates.x,
        y: coordinates.y,
        sprite: PIXI.Sprite.from('assets/images/ghost.png'),
      };

      // Resize
      ghost.sprite.width = Constants.GHOST_SPRITE_WIDTH;
      ghost.sprite.height = Constants.GHOST_SPRITE_HEIGHT;

      ghost.sprite.x = ghost.x;
      ghost.sprite.y = ghost.y;

      ghosts.push(ghost);
    }

    return ghosts;
  }

  movePacman(
    pacmanX: number,
    pacmanY: number,
    direction: string
  ): { x: number; y: number } {
    let newX = pacmanX;
    let newY = pacmanY;

    let cellsize = 50;
    let speed = 1;

    switch (direction) {
      case Constants.PACMAN_DIRECTION_UP:
        newY -= speed;

        break;
      case Constants.PACMAN_DIRECTION_DOWN:
        newY += speed;

        break;
      case Constants.PACMAN_DIRECTION_LEFT:
        newX -= speed;

        break;
      case Constants.PACMAN_DIRECTION_RIGHT:
        newX += speed;

        break;

      default:
        break;
    }

    if (
      this.mazeService.isPath(
        Math.floor(newY / cellsize),
        Math.floor(newX / cellsize)
      )
    ) {
      return { x: newX, y: newY };
    }

    return { x: pacmanX, y: pacmanY };
  }
}
