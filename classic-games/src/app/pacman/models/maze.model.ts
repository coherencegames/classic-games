import * as PIXI from 'pixi.js';

export interface Maze {
  initialMazeGrid: number[][];
  mazeGrid: number[][];
  mazeWidth: number;
  mazeHeight: number;
  cellWidth: number;
  cellHeight: number;
  rows: number;
  cols: number;
  cellSprites: PIXI.Sprite[];
}
