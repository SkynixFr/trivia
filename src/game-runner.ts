import { Game } from './game';
import { WinningCondition } from './WiningCondition';

export class GameRunner {
  public static main(): void {
    const game = new Game(new WinningCondition());
    game.addPlayer('Chet');
    game.addPlayer('Pat');
    game.addPlayer('Sue');

    let notAWinner: boolean;
    do {
      game.roll(Math.floor(Math.random() * 6) + 1);

      if (Math.floor(Math.random() * 10) == 7) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }
    } while (notAWinner);
  }
}

GameRunner.main();
