import { ICategory } from './category';
import { Game } from './game';
import { WinningCondition } from './WiningCondition';

export class GameRunner {
	public static main(): void {
		const game = new Game(new WinningCondition());
		game.addPlayer('Chet');
		game.addPlayer('Pat');
		game.addPlayer('Sue');

		game.addCategory('Pop');
		game.addCategory('Science');
		game.addCategory('Sport');
		game.addCategory('Rock');

		const popCategory: ICategory | undefined = game.getCategory('Pop');
		const scienceCategory: ICategory | undefined =
			game.getCategory('Science');
		const sportCategory: ICategory | undefined = game.getCategory('Sport');
		const rockCategory: ICategory | undefined = game.getCategory('Rock');

		if (sportCategory && popCategory && scienceCategory && rockCategory) {
			game.addQuestions(popCategory);
			game.addQuestions(scienceCategory);
			game.addQuestions(sportCategory);
			game.addQuestions(rockCategory);
		}
		console.log(`Game building...`);
		console.log(`The categories are ${game.getCategories()}`);
		console.log(`The players are ${game.getPlayers()}`);

		game.setCurrentPlayer();

		let notAWinner: boolean;
		do {
			game.rollDice(Math.floor(Math.random() * 6) + 1);

			if (Math.floor(Math.random() * 10) == 7) {
				notAWinner = game.wrongAnswer();
			} else {
				notAWinner = game.correctAnswer();
			}
		} while (notAWinner);
	}
}

GameRunner.main();
