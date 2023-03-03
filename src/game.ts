export class Game {
	private players: Array<string> = [];
	private places: Array<number> = [];
	private purses: Array<number> = [];
	private inPenaltyBox: Array<boolean> = [];
	private currentPlayer: number = 0;
	private isGettingOutOfPenaltyBox: boolean = false;

	private popQuestions: Array<string> = [];
	private scienceQuestions: Array<string> = [];
	private sportsQuestions: Array<string> = [];
	private rockQuestions: Array<string> = [];
	//ajout de question manager
    private questionManager: QuestionManager;

    constructor() {
      this.questionManager = new QuestionManager();
    }
  
    private askQuestion(): void {
      const currentCategory = this.getCategory();
      console.log(`The category is ${currentCategory.getName()}`);
      console.log(currentCategory.getQuestion(this.places[this.currentPlayer]));
    }
  
    private getCategory(): Category {
      const categories = ["Pop", "Science", "Sports", "Rock"];
      const index = this.places[this.currentPlayer] % categories.length;
      return new Category(categories[index], this.questionManager);
	  //on a plus besoin du boucle puisque chaque catégorie de questions est gérée de manière autonome.

	/* constructor() {
		for (let i = 0; i < 50; i++) {
			this.popQuestions.push('Pop Question ' + i);
			this.scienceQuestions.push('Science Question ' + i);
			this.sportsQuestions.push('Sports Question ' + i);
			this.rockQuestions.push(this.createRockQuestion(i));
		}
	}

	private createRockQuestion(index: number): string {
		return 'Rock Question ' + index;
	} */

	// public add(name: string): boolean {
	// 	this.players.push(name);
	// 	this.places[this.howManyPlayers()] = 0;
	// 	this.purses[this.howManyPlayers()] = 0;
	// 	this.inPenaltyBox[this.howManyPlayers()] = false;

	// 	console.log(name + ' was added');
	// 	console.log('They are player number ' + this.players.length);

	// 	return true;
	// }

	private howManyPlayers(): number {
		return this.players.length;
	}

	public roll(roll: number) {
		console.log(this.players[this.currentPlayer] + ' is the current player');
		console.log('They have rolled a ' + roll);

		if (this.inPenaltyBox[this.currentPlayer]) {
			if (roll % 2 != 0) {
				this.isGettingOutOfPenaltyBox = true;

				console.log(
					this.players[this.currentPlayer] +
						' is getting out of the penalty box'
				);
				this.places[this.currentPlayer] =
					this.places[this.currentPlayer] + roll;
				if (this.places[this.currentPlayer] > 11) {
					this.places[this.currentPlayer] =
						this.places[this.currentPlayer] - 12;
				}

				console.log(
					this.players[this.currentPlayer] +
						"'s new location is " +
						this.places[this.currentPlayer]
				);
				console.log('The category is ' + this.currentCategory());
				this.askQuestion();
			} else {
				console.log(
					this.players[this.currentPlayer] +
						' is not getting out of the penalty box'
				);
				this.isGettingOutOfPenaltyBox = false;
			}
		} else {
			this.places[this.currentPlayer] =
				this.places[this.currentPlayer] + roll;
			if (this.places[this.currentPlayer] > 11) {
				this.places[this.currentPlayer] =
					this.places[this.currentPlayer] - 12;
			}

			console.log(
				this.players[this.currentPlayer] +
					"'s new location is " +
					this.places[this.currentPlayer]
			);
			console.log('The category is ' + this.currentCategory());
			this.askQuestion();
		}
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

	private didPlayerWin(): boolean {
		return !(this.purses[this.currentPlayer] == 6);
	}

	public wrongAnswer(): boolean {
		console.log('Question was incorrectly answered');
		console.log(
			this.players[this.currentPlayer] + ' was sent to the penalty box'
		);
		this.inPenaltyBox[this.currentPlayer] = true;

		this.currentPlayer += 1;
		if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
		return true;
	}

	public wasCorrectlyAnswered(): boolean {
		if (this.inPenaltyBox[this.currentPlayer]) {
			if (this.isGettingOutOfPenaltyBox) {
				console.log('Answer was correct!!!!');
				this.purses[this.currentPlayer] += 1;
				console.log(
					this.players[this.currentPlayer] +
						' now has ' +
						this.purses[this.currentPlayer] +
						' Gold Coins.'
				);

				var winner = this.didPlayerWin();
				this.currentPlayer += 1;
				if (this.currentPlayer == this.players.length)
					this.currentPlayer = 0;

				return winner;
			} else {
				this.currentPlayer += 1;
				if (this.currentPlayer == this.players.length)
					this.currentPlayer = 0;
				return true;
			}
		} else {
			console.log('Answer was corrent!!!!');

			this.purses[this.currentPlayer] += 1;
			console.log(
				this.players[this.currentPlayer] +
					' now has ' +
					this.purses[this.currentPlayer] +
					' Gold Coins.'
			);

			var winner = this.didPlayerWin();

			this.currentPlayer += 1;
			if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

			return winner;
		}
	}
}

export class Player {
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
  class QuestionManager {
    getQuestions(name: string): string[] {
        throw new Error("Method not implemented.");
    }
    private categories: Category[] = [];
  
    constructor() {
      this.categories.push(new Category("Pop", this));
      this.categories.push(new Category("Science", this));
      this.categories.push(new Category("Sports", this));
      this.categories.push(new Category("Rock", this));
    }
  
    public getQuestion(categoryName: string, index: number): string {
      const category = this.categories.find(c => c.getName() === categoryName);
      if (category) {
        return category.getQuestion(index);
      }
      return "";
    }
  }
  
  class Category {
    private name: string;
    private questions: string[];
    private currentQuestionIndex = 0;
  
    constructor(name: string, questionManager: QuestionManager) {
      this.name = name;
      this.questions = questionManager.getQuestions(name);
    }
  
    public getQuestion(index: number): string {
      return this.questions[index];
    }
  
    public getQuestions(): string[] {
      return this.questions;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getNextQuestion(): string {
      const question = this.questions[this.currentQuestionIndex];
      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
      return question;
    }
  }