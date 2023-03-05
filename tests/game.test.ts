import { describe, expect, test } from '@jest/globals';
import { ICategory } from '../src/category';

import { Game } from '../src/game';
import { WinningCondition } from '../src/winingCondition';

describe('Game', () => {
	let game: Game;

	beforeEach(() => {
		game = new Game(new WinningCondition());
	});

	test("Ajout d'un joueur", () => {
		//Arrange
		game.addPlayer('Bob');

		//Act
		const result = game.howManyPlayers();

		//Assert
		expect(result).toEqual(1);
	});

	test("Ajout d'une categorie", () => {
		//Arrange
		game.addCategory('Pop');

		//Act
		const result = game.getCategory('Pop');

		//Assert
		expect(result).toEqual({
			currentQuestionIndex: -1,
			name: 'Pop',
			questions: []
		});
	});

	test("Devrait retourner l'actuel joueur", () => {
		//Arrange
		game.addPlayer('Bob');
		game.setCurrentPlayer();

		//Act
		const result = game.getCurrentPlayer().getName();

		//Assert
		expect(result).toBe('Bob');
	});

	test("Ajout d'une question pour une catégorie", () => {
		//Arrange
		game.addCategory('Geography');
		const geographieCategory: ICategory | undefined =
			game.getCategory('Geography');

		if (geographieCategory) {
			game.addQuestion(geographieCategory, 'Question n°1');
		}

		//Act
		const result = game.getCategory('Geography')?.getQuestions();

		//Assert
		expect(result).toEqual(['Question n°1']);
	});

	test('Ajout de 10 questions dans une catégorie', () => {
		//Arrange
		game.addCategory('Pop');
		const popCategory: ICategory | undefined = game.getCategory('Pop');
		if (popCategory) {
			for (let i = 1; i < 11; i++) {
				let question = 'Question n°' + i;
				game.addQuestion(popCategory, question);
			}
		}
		const expectedQuestions = [
			'Question n°1',
			'Question n°2',
			'Question n°3',
			'Question n°4',
			'Question n°5',
			'Question n°6',
			'Question n°7',
			'Question n°8',
			'Question n°9',
			'Question n°10'
		];

		//Act
		const result = game.getCategory('Pop')?.getQuestions();

		//Assert
		expect(result).toEqual(expectedQuestions);
	});

	test("Devrait modifier la localisation d'un joueur et afficher la catégorie et la question", () => {
		//Arrange
		game.addPlayer('Bob');
		game.addCategory('Pop');
		const popCategory: ICategory | undefined = game.getCategory('Pop');

		if (popCategory) {
			game.addQuestion(popCategory, 'Question n°1');
			game.addQuestion(popCategory, 'Question n°2');
		}

		game.setCurrentPlayer();

		//Act
		game.rollDice(4);

		//Assert
		expect(game.getCurrentPlayer().getName()).toBe('Bob');
		expect(game.currentCategory()?.getName()).toBe('Pop');
		expect(game.currentCategory()?.getNextQuestion()).toBe('Question n°2');
		expect(game.getCurrentPlayer().getPlace()).toBe(4);
	});

	test('Mauvaise réponse', () => {
		//Arrange
		game.addPlayer('Bob');

		game.setCurrentPlayer();

		//Act
		game.wrongAnswer();

		//Assert
		expect(game.getCurrentPlayer().getName()).toBe('Bob');
		expect(game.getCurrentPlayer().isInPenaltyBox()).toBe(true);
	});

	test('Bonne réponse', () => {
		//Arrange
		game.addPlayer('Bob');
		game.addCategory('Pop');
		const popCategory: ICategory | undefined = game.getCategory('Pop');

		if (popCategory) {
			game.addQuestion(popCategory, 'Question n°1');
		}

		game.setCurrentPlayer();
		game.rollDice(8);

		//Act
		game.correctAnswer();

		//Assert
		expect(game.getCurrentPlayer().getName()).toBe('Bob');
		expect(game.getCurrentPlayer().getPurse()).toBe(1);
	});

	test('Devrait afficher le joueur actuel en tant que gagnant si ses points sont égaux à 6', () => {
		//Arrange
		game.addPlayer('Bob');
		game.setCurrentPlayer();

		//Act
		for (let i = 0; i < 6; i++) {
			game.correctAnswer();
		}

		//Assert
		expect(game.getCurrentPlayer().getName()).toBe('Bob');
		expect(game.getCurrentPlayer().getPurse()).toBe(6);
		expect(
			game.winningCondition.didPlayerWin(game.getCurrentPlayer().getPurse())
		).toBe(true);
	});
});
