import { NgModule } from '@angular/core';

import { GameBoardComponent } from './components/game-board.component';
import { GameService } from './services/game.service';
import { MazeService } from './services/maze.service';

@NgModule({
  declarations: [GameBoardComponent],
  imports: [],
  providers: [GameService, MazeService],
})
export class PacmanModule {}
