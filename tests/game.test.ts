import { describe, expect, test } from '@jest/globals';

import { Game } from '../src/game';
import { WinningCondition } from '../src/WiningCondition';

describe('Game', () => {
	let game: Game;

	beforeEach(() => {
		game = new Game(new WinningCondition());
	});

	test("Ajout d'un joueur", () => {
		game.addPlayer('Bob');
	});
});
