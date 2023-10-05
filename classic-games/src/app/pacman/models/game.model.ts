import { Pacman } from './pacman.model';
import { Ghost } from './ghost.model';
import { Dot } from './dot.model';
import { Maze } from './maze.model';

export class Game {
  pacman?: Pacman;
  ghosts?: Ghost[];
  dots?: Dot[];
  maze?: Maze;
  score: number = 0;
}
