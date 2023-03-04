export interface IQuestion {
	text: string;
}

export interface ICategory {
	getQuestion(index: number): string;
	getQuestions(): IQuestion[];
	getName(): string;
	getNextQuestion(): string;
	addQuestion(question: IQuestion): void;
}

export class Category implements ICategory {
	private name: string;
	private questions: IQuestion[];
	private currentQuestionIndex = 0;

	constructor(name: string) {
		this.name = name;
		this.questions = [];
	}

	public getQuestion(index: number): string {
		return this.questions[index].text;
	}

	public getQuestions(): IQuestion[] {
		return this.questions;
	}

	public getName(): string {
		return this.name;
	}

	public getNextQuestion(): string {
		const question = this.questions[this.currentQuestionIndex];
		this.currentQuestionIndex =
			(this.currentQuestionIndex + 1) % this.questions.length;
		return question.text;
	}

	public addQuestion(question: IQuestion): void {
		this.questions.push(question);
	}
}