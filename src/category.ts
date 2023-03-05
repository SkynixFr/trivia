export interface ICategory {
	getQuestion(index: number): string;
	getQuestions(): string[];
	getName(): string;
	getNextQuestion(): string;
	addQuestion(question: string): void;
}

export class Category implements ICategory {
	private name: string;
	private questions: string[];
	private currentQuestionIndex = -1;

	constructor(name: string) {
		this.name = name;
		this.questions = [];
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
		this.currentQuestionIndex++;

		return this.getQuestion(this.currentQuestionIndex);
	}

	public addQuestion(question: string): void {
		this.questions.push(question);
	}
}
