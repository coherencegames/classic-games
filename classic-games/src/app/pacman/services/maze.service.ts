import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Constants } from '../core/constants';
import { Maze } from '../models/maze.model';

const CELL_WIDTH = Constants.MAZE_WIDTH / Constants.COLS;
const CELL_HEIGHT = Constants.MAZE_HEIGHT / Constants.ROWS;

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  // 0 - wall
  // 1 - path
  // 2 - ghost
  mazeGrid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 2, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  createMaze(): Maze {
    let mazeWidth = Constants.MAZE_WIDTH;
    let mazeHeight = Constants.MAZE_HEIGHT;

    let rows = Constants.ROWS;
    let cols = Constants.COLS;

    let cellWidth = mazeWidth / cols;
    let cellHeight = mazeHeight / rows;

    let cellSprites: PIXI.Sprite[] = [];

    for (let row = 0; row < this.mazeGrid.length; row++) {
      for (let col = 0; col < this.mazeGrid[row].length; col++) {
        let isWall = this.mazeGrid[row][col] === 0;
        let cellSprite = new PIXI.Sprite(PIXI.Texture.WHITE);

        cellSprite.width = cellWidth;
        cellSprite.height = cellHeight;
        cellSprite.x = col * cellWidth;
        cellSprite.y = row * cellHeight;
        cellSprite.tint = isWall ? 0xffffff : 0x000000;

        cellSprites.push(cellSprite);
      }
    }

    let maze: Maze = {
      initialMazeGrid: this.mazeGrid,
      mazeGrid: this.mazeGrid,
      mazeWidth: mazeWidth,
      mazeHeight: mazeHeight,
      cellWidth: cellWidth,
      cellHeight: cellHeight,
      rows: rows,
      cols: cols,
      cellSprites: cellSprites,
    };

    return maze;
  }

  getDotsValidCoordinates(): { x: number; y: number }[] {
    let dotsCoordinates: { x: number; y: number }[] = [];

    for (let row = 0; row < this.mazeGrid.length; row++) {
      for (let col = 0; col < this.mazeGrid[row].length; col++) {
        if (this.mazeGrid[row][col] === 1) {
          let x = col * CELL_WIDTH + CELL_WIDTH / 2;
          let y = row * CELL_HEIGHT + CELL_HEIGHT / 2;
          dotsCoordinates.push({ x, y });
        }
      }
    }

    return dotsCoordinates;
  }

  getGhostsValidCoordinates(): { x: number; y: number }[] {
    let ghostsCoordinates: { x: number; y: number }[] = [];

    for (let row = 0; row < this.mazeGrid.length; row++) {
      for (let col = 0; col < this.mazeGrid[row].length; col++) {
        if (this.mazeGrid[row][col] === 2) {
          let x = col * CELL_WIDTH;
          let y = row * CELL_HEIGHT;
          ghostsCoordinates.push({ x, y });
        }
      }
    }

    return ghostsCoordinates;
  }
  
  isPath(row: number, col: number): boolean {
    if (
      row >= 0 &&
      row < this.mazeGrid.length &&
      col >= 0 &&
      col < this.mazeGrid[0].length
    ) {
      return this.mazeGrid[row][col] === 1;
    }
    return false;
  }

  isWall(row: number, col: number): boolean {
    if (
      row >= 0 &&
      row < this.mazeGrid.length &&
      col >= 0 &&
      col < this.mazeGrid[0].length
    ) {
      return this.mazeGrid[row][col] === 0;
    }

    return true;
  }
}
