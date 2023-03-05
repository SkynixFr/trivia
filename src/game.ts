import { Category, ICategory } from './category';
import { Player, IPlayer } from './player';
import { ICategoryManager, CategoryManager } from './category-manager';
import { WinningCondition } from './WiningCondition';

export class Game {
	public players: IPlayer[] = [];
	private categoryManager: ICategoryManager;

	private winningCondition: WinningCondition;
	private currentPlayerIndex: number = 0;
	public currentPlayer: IPlayer = { ...({} as IPlayer) };

	constructor(winningCondition: WinningCondition) {
		this.winningCondition = winningCondition;
		this.categoryManager = new CategoryManager();
	}

	public addCategory(name: string): void {
		this.categoryManager.addCategory(name);
	}

	public addPlayer(name: string): void {
		this.players.push(new Player(name));
	}

	private addQuestion(categoryName: ICategory, question: string): void {
		categoryName.addQuestion(question);
	}

	public addQuestions(categoryName: ICategory) {
		for (let i = 1; i < 51; i++) {
			let question = 'Question n°' + i;
			this.addQuestion(categoryName, question);
		}
	}

	public getCategories(): string[] {
		return this.categoryManager.getCategories();
	}

	public getCategory(name: string): ICategory | undefined {
		return this.categoryManager.getCategory(name);
	}

	public getCurrentPlayer() {
		return this.currentPlayer;
	}

	private getCurrentPlayerPlace(): number {
		return this.currentPlayer.getPlace();
	}

	public setCurrentPlayer() {
		this.currentPlayer = this.players[this.currentPlayerIndex];
	}

	public currentCategory(): ICategory | undefined {
		const categories = this.getCategories();
		const index = this.currentPlayer.getPlace() % categories.length;

		return this.getCategory(categories[index]);
	}

	public askQuestion(): void {
		const currentCategory = this.currentCategory();
		if (currentCategory) {
			console.log(`The category is ${currentCategory}`);
			console.log(
				currentCategory.getQuestion(this.currentPlayer.getPlace())
			);
		}
	}

	private determineIfPlayerIsGettingOutOfPenaltyBox(roll: number) {
		if (roll % 2 != 0) {
			this.getCurrentPlayer().releaseFromPenaltyBox();
			console.log(
				`${this.getCurrentPlayer().getName()} is getting out of the penalty box`
			);
		} else {
			console.log(
				`${this.getCurrentPlayer().getName()} is not getting out of the penalty box`
			);
		}
	}

	private calculateNewPlayerPlace(roll: number) {
		let currentPlayerPlace = this.getCurrentPlayerPlace();
		currentPlayerPlace += roll;

		if (currentPlayerPlace > 11) {
			currentPlayerPlace -= 12;
		}

		console.log(
			`${this.getCurrentPlayer().getName()}'s old location is ${this.getCurrentPlayerPlace()}`
		);

		this.getCurrentPlayer().setPlace(currentPlayerPlace);

		console.log(
			`${this.getCurrentPlayer().getName()}'s new location is ${this.getCurrentPlayerPlace()}`
		);
	}

	private nextPlayer(): IPlayer {
		this.currentPlayerIndex += 1;
		if (this.currentPlayerIndex == this.players.length) {
			this.currentPlayerIndex = 0;
		}

		this.setCurrentPlayer();

		return this.currentPlayer;
	}

	public rollDice(roll: number): void {
		console.log(`${this.getCurrentPlayer().getName()} is the current player`);
		console.log(`He have rolled a ${roll}`);

		if (this.getCurrentPlayer().isInPenaltyBox()) {
			this.determineIfPlayerIsGettingOutOfPenaltyBox(roll);
		} else {
			this.calculateNewPlayerPlace(roll);
		}

		const currentCategory = this.currentCategory();
		if (currentCategory) {
			console.log(`The category is ${currentCategory.getName()}`);
			console.log(currentCategory.getNextQuestion());
		}
	}

	public wrongAnswer(): boolean {
		console.log('Question was incorrectly answered');
		console.log(`${this.currentPlayer} was sent to the penalty box`);

		this.currentPlayer.setInPenaltyBox();

		this.nextPlayer();
		return true;
	}

	public correctAnswer(): boolean {
		console.log('Question was correctly answered !');
		this.getCurrentPlayer().addCoin();

		console.log(
			`${this.getCurrentPlayer().getName()} now has ${this.getCurrentPlayer().getPurse()} Gold coins`
		);

		const winner = this.winningCondition.didPlayerWin(
			this.getCurrentPlayer().getPurse()
		);

		if (winner) {
			console.log(`Player ${this.getCurrentPlayer().getName()} has won`);
			return false;
		} else {
			this.nextPlayer();
			return true;
		}
	}

	// public addCategory(name: string): void {
	// 	this.categoryManager.addCategory(name);
	// 	console.log(
	// 		`The category ${this.categoryManager.getCategory(name)} was added`
	// 	);
	// }

	// public addPlayer(name: string): void {
	// 	const player = new Player(name);
	// 	this.players.push(player);

	// 	console.log(`${player.getName()} was added`);
	// 	console.log(`They are player number ${this.howManyPlayers()}`);
	// }

	// private getCategory(): Category {
	// 	const categories = ['Pop', 'Science', 'Sports', 'Rock'];
	// 	const index = this.currentPlayer.getPlace() % categories.length;
	// 	return new Category(categories[index]);
	// }

	// private askQuestion(): void {
	// 	const currentCategory = this.getCategory();
	// 	console.log(`The category is ${currentCategory.getName()}`);
	// 	console.log(currentCategory.getQuestion(this.currentPlayer.getPlace()));
	// }

	// private nextPlayer(): IPlayer {
	// 	this.currentPlayerIndex += 1;
	// 	if (this.currentPlayerIndex == this.players.length) {
	// 		this.currentPlayerIndex = 0;
	// 	}
	// 	return (this.currentPlayer = this.players[this.currentPlayerIndex]);
	// }

	// private howManyPlayers(): number {
	// 	return this.players.length;
	// }

	// private getCurrentPlayer(): IPlayer {
	// 	return this.currentPlayer;
	// }

	// private getCurrentPlayerPlace(): number {
	// 	return this.places[this.currentPlayerIndex];
	// }

	// private determineIfPlayerIsGettingOutOfPenaltyBox(roll: number) {
	// 	if (roll % 2 != 0) {
	// 		this.getCurrentPlayer().releaseFromPenaltyBox();
	// 		console.log(
	// 			`${this.getCurrentPlayer()} is getting out of the penalty box`
	// 		);
	// 	} else {
	// 		console.log(
	// 			`${this.getCurrentPlayer()} is not getting out of the penalty box`
	// 		);
	// 	}
	// }

	// private calculateNewPlayerPlace(roll: number) {
	// 	let currentPlayerPlace = this.getCurrentPlayerPlace();
	// 	currentPlayerPlace += roll;

	// 	if (currentPlayerPlace > 11) {
	// 		currentPlayerPlace -= 12;
	// 	}

	// 	console.log(
	// 		`${this.getCurrentPlayer()}'s new location is ${this.getCurrentPlayerPlace()}`
	// 	);
	// }

	// public roll(roll: number) {
	// 	console.log(`${this.getCurrentPlayer().getName()} is the current player`);
	// 	console.log(`He have rolled a ${roll}`);

	// 	if (this.getCurrentPlayer().isInPenaltyBox()) {
	// 		this.determineIfPlayerIsGettingOutOfPenaltyBox(roll);
	// 	} else {
	// 		this.calculateNewPlayerPlace(roll);
	// 	}
	// 	console.log(
	// 		`${this.getCurrentPlayer().getName()}his new location is ${
	// 			this.places[this.currentPlayerIndex]
	// 		}`
	// 	);
	// 	console.log(`The category is ${this.getCategory().getName()}`);
	// 	console.log(this.getCategory().getNextQuestion());
	// }

	// private didPlayerWin(): boolean {
	// 	return this.winningCondition.didPlayerWin(
	// 		this.purses,
	// 		this.currentPlayerIndex
	// 	);
	// }

	// public wrongAnswer(): boolean {
	// 	console.log('Question was incorrectly answered');
	// 	console.log(`${this.currentPlayer} was sent to the penalty box`);

	// 	this.currentPlayer.setInPenaltyBox();

	// 	this.currentPlayerIndex += 1;
	// 	if (this.currentPlayerIndex == this.players.length)
	// 		this.currentPlayerIndex = 0;
	// 	return true;
	// }

	// public wasCorrectlyAnswered(): boolean {
	// 	if (this.getCurrentPlayer().isInPenaltyBox()) {
	// 		const roll = Math.floor(Math.random() * 6) + 1; // Simulation
	// 		if (
	// 			this.getCurrentPlayer().determineIfPlayerIsGettingOutOfPenaltyBox(
	// 				roll
	// 			)
	// 		) {
	// 			console.log('Answer was correct!!!!');
	// 			this.getCurrentPlayer().addCoin();
	// 			console.log(
	// 				`${this.getCurrentPlayer().getName()} now has ${this.getCurrentPlayer().getPurse()} Gold Coins.`
	// 			);

	// 			const winner = this.didPlayerWin();
	// 			this.nextPlayer();
	// 			return winner;
	// 		} else {
	// 			console.log(
	// 				`${this.getCurrentPlayer().getName()} is not getting out of the penalty box`
	// 			);
	// 			this.nextPlayer();
	// 			return true;
	// 		}
	// 	} else {
	// 		console.log('Answer was correct!!!!');
	// 		this.getCurrentPlayer().addCoin();
	// 		console.log(
	// 			`${this.getCurrentPlayer().getName()} now has ${this.getCurrentPlayer().getPurse()} Gold Coins.`
	// 		);

	// 		const winner = this.didPlayerWin();
	// 		this.nextPlayer();
	// 		return winner;
	// 	}
	// }
}
