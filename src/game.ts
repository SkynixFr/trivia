import { Category, ICategory, IQuestion } from './question';
import { Player, IPlayer } from './player';
import { ICategoryManager, CategoryManager } from './category-manager';
import { WinningCondition } from './WiningCondition';
const categoryManager: ICategoryManager = new CategoryManager();

export class Game {
	private players: IPlayer[] = [];
	private winningCondition: IWinningCondition;
	private questionManager: IQuestionManager;

	private popQuestions: Array<string> = [];
	private scienceQuestions: Array<string> = [];
	private sportsQuestions: Array<string> = [];
	private rockQuestions: Array<string> = [];
	private places: number[] = [];
	private purses: number[] = [];
	private currentPlayerIndex: number = 0;
	private currentPlayer = this.players[this.currentPlayerIndex];

	constructor(winningCondition: IWinningCondition) {
		this.winningCondition = winningCondition;
		this.questionManager = new QuestionManager();
	}
	private askQuestion(): void {
		const currentCategory = this.getCategory();
		console.log(`The category is ${currentCategory.getName()}`);
		console.log(currentCategory.getQuestion(this.currentPlayer.getPlace()));
	}

	private getCategory(): Category {
		const categories = ['Pop', 'Science', 'Sports', 'Rock'];
		const index = this.currentPlayer.getPlace() % categories.length;
		return new Category(categories[index], this.questionManager);
	}
	public addPlayer(name: string) {
		const player = new Player(name);
		this.players.push(player);

		console.log(`${player.getName()} was added`);
		console.log(`They are player number ${this.howManyPlayers()}`);
	}
    private nextPlayer() {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length) {
          this.currentPlayerIndex = 0;
        }
        this.currentPlayer = this.players[this.currentPlayerIndex];
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
		console.log(
			`${this.getCurrentPlayer().getName()}his new location is ${
				this.places[this.currentPlayerIndex]
			}`
		);
		console.log(`The category is ${this.getCategory().getName()}`);
		console.log(this.getCategory().getNextQuestion());
	}
	private didPlayerWin(): boolean {
		return this.winningCondition.didPlayerWin(
			this.purses,
			this.currentPlayerIndex
		);
	}

	public wrongAnswer(): boolean {
		console.log('Question was incorrectly answered');
		console.log(`${this.currentPlayer} was sent to the penalty box`);

		this.currentPlayer.setInPenaltyBox();;

		this.currentPlayerIndex += 1;
		if (this.currentPlayerIndex == this.players.length)
			this.currentPlayerIndex = 0;
		return true;
	}

	public wasCorrectlyAnswered(): boolean {
        if (this.getCurrentPlayer().isInPenaltyBox()) {
            const roll = Math.floor(Math.random() * 6) + 1; // Simulation 
            if (this.getCurrentPlayer().determineIfPlayerIsGettingOutOfPenaltyBox(roll)) {
                console.log('Answer was correct!!!!');
                this.getCurrentPlayer().addCoin();
                console.log(`${this.getCurrentPlayer().getName()} now has ${this.getCurrentPlayer().getPurse()} Gold Coins.`);
    
                const winner = this.didPlayerWin();
                this.nextPlayer();
                return winner;
            } else {
                console.log(`${this.getCurrentPlayer().getName()} is not getting out of the penalty box`);
                this.nextPlayer();
                return true;
            }
        } else {
            console.log('Answer was correct!!!!');
            this.getCurrentPlayer().addCoin();
            console.log(`${this.getCurrentPlayer().getName()} now has ${this.getCurrentPlayer().getPurse()} Gold Coins.`);
    
            const winner = this.didPlayerWin();
            this.nextPlayer();
            return winner;
        }
    }
    
}    
