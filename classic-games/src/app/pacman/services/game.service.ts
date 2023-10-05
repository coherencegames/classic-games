import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Pacman } from '../models/pacman.model';
import { Dot } from '../models/dot.model';
import { Ghost } from '../models/ghost.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Implement all needed methods for game logic

  createPacman(): Pacman {
    let pacman: Pacman = {
      x: 0,
      y: 0,
      sprite: PIXI.Sprite.from('assets/images/pacman.png'),
    };

    // Resize
    pacman.sprite.width = 40;
    pacman.sprite.height = 40;

    pacman.sprite.x = pacman.x;
    pacman.sprite.y = pacman.y;

    return pacman;
  }

  createDots(): Dot[] {
    let dots: Dot[] = [
      { x: 50, y: 50, sprite: PIXI.Sprite.from('assets/images/dot.png') },
      { x: 100, y: 50, sprite: PIXI.Sprite.from('assets/images/dot.png') },
      { x: 150, y: 50, sprite: PIXI.Sprite.from('assets/images/dot.png') },
      // Add more dot positions
    ];

    for (let dot of dots) {
      // Resize
      dot.sprite.width = 20;
      dot.sprite.height = 20;

      dot.sprite.x = dot.x;
      dot.sprite.y = dot.y;
    }

    return dots;
  }

  createGhosts(): Ghost[] {
    let ghosts: Ghost[] = [
      { x: 200, y: 200, sprite: PIXI.Sprite.from('assets/images/ghost.png') },
      { x: 250, y: 200, sprite: PIXI.Sprite.from('assets/images/ghost.png') },
      { x: 300, y: 200, sprite: PIXI.Sprite.from('assets/images/ghost.png') },
      // Add more ghost positions here
    ];

    for (let ghost of ghosts) {
      // Resize
      ghost.sprite.width = 40;
      ghost.sprite.height = 40;

      ghost.sprite.x = ghost.x;
      ghost.sprite.y = ghost.y;
    }

    return ghosts;
  }
}
