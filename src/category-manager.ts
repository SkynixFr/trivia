import { ICategory, Category } from './category';
export interface ICategoryManager {
	getCategory(name: string): ICategory | undefined;
	getCategories(): string[];
	addCategory(categoryName: string): void;
}

export class CategoryManager implements ICategoryManager {
	private categories: ICategory[];

	constructor() {
		this.categories = [];
	}

	public getCategory(name: string): ICategory | undefined {
		return this.categories.find(category => category.getName() === name);
	}

	public getCategories(): string[] {
		return this.categories.map(category => category.getName());
	}

	public addCategory(categoryName: string): void {
		const category = new Category(categoryName);
		this.categories.push(category);
	}
}
//Exemple d'utilisation des catégories et des questions
// const categoryManager = new CategoryManager();

// categoryManager.addCategory('Geography');

// const geographyCategory = categoryManager.getCategory('Geography');

// if (geographyCategory) {
// 	geographyCategory.addQuestion({ text: 'What is the capital of France?' });
// 	geographyCategory.addQuestion({
// 		text: 'What is the largest country in the world?'
// 	});
// }

// console.log(geographyCategory);
