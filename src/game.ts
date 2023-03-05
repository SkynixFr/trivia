import { ICategory } from './category';
import { Player, IPlayer } from './player';
import { ICategoryManager, CategoryManager } from './category-manager';
import { WinningCondition } from './winingCondition';

export class Game {
	private players: IPlayer[] = [];
	private categoryManager: ICategoryManager;
	public winningCondition: WinningCondition;
	private currentPlayerIndex: number = 0;
	private currentPlayer: IPlayer = { ...({} as IPlayer) };

	constructor(winningCondition: WinningCondition) {
		this.winningCondition = winningCondition;
		this.categoryManager = new CategoryManager();
	}

	public howManyPlayers(): number {
		return this.players.length;
	}

	public addCategory(name: string): void {
		this.categoryManager.addCategory(name);
	}

	public addPlayer(name: string): void {
		this.players.push(new Player(name));
	}

	public addQuestion(categoryName: ICategory, question: string): void {
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

	public getPlayers(): string[] {
		return this.players.map(player => player.getName());
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

		this.getCurrentPlayer().setPlace(currentPlayerPlace);

		console.log(
			`${this.getCurrentPlayer().getName()}'s new location is ${this.getCurrentPlayerPlace()}`
		);
	}

	public nextPlayer(): IPlayer {
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
			console.log(
				`${currentCategory.getName()} ${currentCategory.getNextQuestion()}`
			);
		}
	}

	public wrongAnswer(): boolean {
		console.log('Question was incorrectly answered');
		console.log(
			`${this.getCurrentPlayer().getName()} was sent to the penalty box`
		);

		this.getCurrentPlayer().setInPenaltyBox();

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
}
