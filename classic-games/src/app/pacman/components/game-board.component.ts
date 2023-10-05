import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  // Initialize app, pacman, dots, ghosts, maze, keystate
  // Add constructor to initialize services

  ngOnInit(): void {
    // Create pixi application
    // Initialize game elements - create methods for create pacman, dots, ghosts, maze
    // Start game loop - create methods for move pacman, handle input, update game
  }

  // Create host listeners

  ngOnDestroy(): void {
    // Clean up resources when component is destroyed
  }
}
