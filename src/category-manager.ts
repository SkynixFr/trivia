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
