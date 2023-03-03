export class Game {
	private players: IPlayer[] = [];
	private winningCondition: IWinningCondition;

	private places: Array<number> = [];
	private purses: Array<number> = [];
	private inPenaltyBox: Array<boolean> = [];
	private currentPlayerIndex: number = 0;
	private currentPlayer = this.players[this.currentPlayerIndex];

	// private popQuestions: Array<string> = [];
	// private scienceQuestions: Array<string> = [];
	// private sportsQuestions: Array<string> = [];
	// private rockQuestions: Array<string> = [];

	constructor(winningCondition: IWinningCondition) {
		this.winningCondition = winningCondition;
		// for (let i = 0; i < 50; i++) {
		// 	this.popQuestions.push('Pop Question ' + i);
		// 	this.scienceQuestions.push('Science Question ' + i);
		// 	this.sportsQuestions.push('Sports Question ' + i);
		// 	this.rockQuestions.push(this.createRockQuestion(i));
		// }
	}

	// private createRockQuestion(index: number): string {
	// 	return 'Rock Question ' + index;
	// }

	public addPlayer(name: string) {
		const player = new Player(name);
		this.players.push(player);

		console.log(`${player.getName()} was added`);
		console.log(`They are player number ${this.howManyPlayers()}`);
	}

	private howManyPlayers(): number {
		return this.players.length;
	}

	private getCurrentPlayer(): IPlayer {
		return this.currentPlayer;
	}

	private getCurrentPlayerPlace(): number {
		return this.places[this.currentPlayerIndex];
	}

	private determineIfPlayerIsGettingOutOfPenaltyBox(roll: number) {
		if (roll % 2 != 0) {
			this.getCurrentPlayer().releaseFromPenaltyBox();
			console.log(
				`${this.getCurrentPlayer()} is getting out of the penalty box`
			);
		} else {
			console.log(
				`${this.getCurrentPlayer()} is not getting out of the penalty box`
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
			`${this.getCurrentPlayer()}'s new location is ${this.getCurrentPlayerPlace()}`
		);
	}

	public roll(roll: number) {
		console.log(`${this.getCurrentPlayer().getName()} is the current player`);
		console.log(`He have rolled a ${roll}`);

		if (this.getCurrentPlayer().isInPenaltyBox()) {
			this.determineIfPlayerIsGettingOutOfPenaltyBox(roll);
		} else {
			this.calculateNewPlayerPlace(roll);
		}

		// console.log(
		// 	this.players[this.currentPlayerIndex] + ' is the current player'
		// );
		// console.log('They have rolled a ' + roll);

		// if (this.inPenaltyBox[this.currentPlayerIndex]) {
		// 	if (roll % 2 != 0) {
		// 		this.isGettingOutOfPenaltyBox = true;

		// 		console.log(
		// 			this.players[this.currentPlayerIndex] +
		// 				' is getting out of the penalty box'
		// 		);
		// 		this.places[this.currentPlayerIndex] =
		// 			this.places[this.currentPlayerIndex] + roll;
		// 		if (this.places[this.currentPlayerIndex] > 11) {
		// 			this.places[this.currentPlayerIndex] =
		// 				this.places[this.currentPlayerIndex] - 12;
		// 		}

		// 		console.log(
		// 			this.players[this.currentPlayerIndex] +
		// 				"'s new location is " +
		// 				this.places[this.currentPlayerIndex]
		// 		);
		// 		console.log('The category is ' + this.currentCategory());
		// 		this.askQuestion();
		// 	} else {
		// 		console.log(
		// 			this.players[this.currentPlayerIndex] +
		// 				' is not getting out of the penalty box'
		// 		);
		// 		this.isGettingOutOfPenaltyBox = false;
		// 	}
		// } else {
		// 	this.places[this.currentPlayerIndex] =
		// 		this.places[this.currentPlayerIndex] + roll;
		// 	if (this.places[this.currentPlayerIndex] > 11) {
		// 		this.places[this.currentPlayerIndex] =
		// 			this.places[this.currentPlayerIndex] - 12;
		// 	}

		// 	console.log(
		// 		this.players[this.currentPlayerIndex] +
		// 			"'s new location is " +
		// 			this.places[this.currentPlayerIndex]
		// 	);
		// 	console.log('The category is ' + this.currentCategory());
		// 	this.askQuestion();
		// }
	}
	/* private askQuestion(): void {
		if (this.currentCategory() == 'Pop')
			console.log(this.popQuestions.shift());
		if (this.currentCategory() == 'Science')
			console.log(this.scienceQuestions.shift());
		if (this.currentCategory() == 'Sports')
			console.log(this.sportsQuestions.shift());
		if (this.currentCategory() == 'Rock')
			console.log(this.rockQuestions.shift());
	}

	private currentCategory(): string {
		if (this.places[this.currentPlayer] == 0) return 'Pop';
		if (this.places[this.currentPlayer] == 4) return 'Pop';
		if (this.places[this.currentPlayer] == 8) return 'Pop';
		if (this.places[this.currentPlayer] == 1) return 'Science';
		if (this.places[this.currentPlayer] == 5) return 'Science';
		if (this.places[this.currentPlayer] == 9) return 'Science';
		if (this.places[this.currentPlayer] == 2) return 'Sports';
		if (this.places[this.currentPlayer] == 6) return 'Sports';
		if (this.places[this.currentPlayer] == 10) return 'Sports';
		return 'Rock';
	} */

	// private askQuestion(): void {
	// 	if (this.currentCategory() == 'Pop')
	// 		console.log(this.popQuestions.shift());
	// 	if (this.currentCategory() == 'Science')
	// 		console.log(this.scienceQuestions.shift());
	// 	if (this.currentCategory() == 'Sports')
	// 		console.log(this.sportsQuestions.shift());
	// 	if (this.currentCategory() == 'Rock')
	// 		console.log(this.rockQuestions.shift());
	// }

	// private currentCategory(): string {
	// 	if (this.places[this.currentPlayerIndex] == 0) return 'Pop';
	// 	if (this.places[this.currentPlayerIndex] == 4) return 'Pop';
	// 	if (this.places[this.currentPlayerIndex] == 8) return 'Pop';
	// 	if (this.places[this.currentPlayerIndex] == 1) return 'Science';
	// 	if (this.places[this.currentPlayerIndex] == 5) return 'Science';
	// 	if (this.places[this.currentPlayerIndex] == 9) return 'Science';
	// 	if (this.places[this.currentPlayerIndex] == 2) return 'Sports';
	// 	if (this.places[this.currentPlayerIndex] == 6) return 'Sports';
	// 	if (this.places[this.currentPlayerIndex] == 10) return 'Sports';
	// 	return 'Rock';
	// }

	private didPlayerWin(): boolean {
		return this.winningCondition.didPlayerWin(
			this.purses,
			this.currentPlayerIndex
		);
	}

	// public wrongAnswer(): boolean {
	// 	console.log('Question was incorrectly answered');
	// 	console.log(
	// 		this.players[this.currentPlayerIndex] + ' was sent to the penalty box'
	// 	);
	// 	this.inPenaltyBox[this.currentPlayerIndex] = true;

	// 	this.currentPlayerIndex += 1;
	// 	if (this.currentPlayerIndex == this.players.length)
	// 		this.currentPlayerIndex = 0;
	// 	return true;
	// }

	// public wasCorrectlyAnswered(): boolean {
	// 	if (this.inPenaltyBox[this.currentPlayerIndex]) {
	// 		if (this.isGettingOutOfPenaltyBox) {
	// 			console.log('Answer was correct!!!!');
	// 			this.purses[this.currentPlayerIndex] += 1;
	// 			console.log(
	// 				this.players[this.currentPlayerIndex] +
	// 					' now has ' +
	// 					this.purses[this.currentPlayerIndex] +
	// 					' Gold Coins.'
	// 			);

	// 			var winner = this.didPlayerWin();
	// 			this.currentPlayerIndex += 1;
	// 			if (this.currentPlayerIndex == this.players.length)
	// 				this.currentPlayerIndex = 0;

	// 			return winner;
	// 		} else {
	// 			this.currentPlayerIndex += 1;
	// 			if (this.currentPlayerIndex == this.players.length)
	// 				this.currentPlayerIndex = 0;
	// 			return true;
	// 		}
	// 	} else {
	// 		console.log('Answer was corrent!!!!');

	// 		this.purses[this.currentPlayerIndex] += 1;
	// 		console.log(
	// 			this.players[this.currentPlayerIndex] +
	// 				' now has ' +
	// 				this.purses[this.currentPlayerIndex] +
	// 				' Gold Coins.'
	// 		);

	// 		var winner = this.didPlayerWin();

	// 		this.currentPlayerIndex += 1;
	// 		if (this.currentPlayerIndex == this.players.length)
	// 			this.currentPlayerIndex = 0;

	// 		return winner;
	// 	}
	// }
}

interface IPlayer {
	getName(): string;
	getPlace(): number;
	setPlace(place: number): void;
	getPurse(): number;
	setPurse(purse: number): void;
	isInPenaltyBox(): boolean;
	setInPenaltyBox(): void;
	releaseFromPenaltyBox(): void;
}

export class Player implements IPlayer {
	private name: string;
	private place: number = 0;
	private purse: number = 0;
	private inPenaltyBox: boolean = false;
	constructor(name: string) {
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}

	public getPlace(): number {
		return this.place;
	}

	public setPlace(place: number) {
		this.place = place;
	}

	public getPurse(): number {
		return this.purse;
	}

	public setPurse(purse: number) {
		this.purse = purse;
	}

	public isInPenaltyBox(): boolean {
		return this.inPenaltyBox;
	}

	public setInPenaltyBox() {
		this.inPenaltyBox = true;
	}

	public releaseFromPenaltyBox() {
		this.inPenaltyBox = false;
	}
}

interface IWinningCondition {
	didPlayerWin(purses: number[], currentPlayerIndex: number): boolean;
}

export class WinningCondition implements IWinningCondition {
	public didPlayerWin(purses: number[], currentPlayerIndex: number): boolean {
		return purses[currentPlayerIndex] === 6;
	}
}
//Extraction des classes Questions et Catégorie de la classe Game
class Question {
	private popQuestions: string[] = [];
	private scienceQuestions: string[] = [];
	private sportsQuestions: string[] = [];
	private rockQuestions: string[] = [];
	private currentCategory: string = '';

	constructor() {
		this.initializeQuestions();
	}

	private initializeQuestions(): void {
		for (let i = 0; i < 50; i++) {
			this.popQuestions.push(`Pop Question ${i}`);
			this.scienceQuestions.push(`Science Question ${i}`);
			this.sportsQuestions.push(`Sports Question ${i}`);
			this.rockQuestions.push(`Rock Question ${i}`);
		}
	}

	public ask(category: string): void {
		const question = {
			Pop: this.popQuestions.shift(),
			Science: this.scienceQuestions.shift(),
			Sports: this.sportsQuestions.shift(),
			Rock: this.rockQuestions.shift()
		}[category];
		console.log(question);
	}

	public getCurrentCategory(): string {
		return this.currentCategory;
	}
}
