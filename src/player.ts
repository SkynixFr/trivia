
export interface IPlayer {
	getName(): string;
	getPlace(): number;
	setPlace(place: number): void;
	getPurse(): number;
	setPurse(purse: number): void;
	isInPenaltyBox(): boolean;
	setInPenaltyBox(): void;
	releaseFromPenaltyBox(): void;
	addCoin(): void;
    determineIfPlayerIsGettingOutOfPenaltyBox(roll: number): boolean;
}

export class Player implements IPlayer {
	private name: string;
	private place: number = 0;
	private purse: number = 0;
	private inPenaltyBox: boolean = false;
	constructor(name: string) {
		this.name = name;
	}
	public determineIfPlayerIsGettingOutOfPenaltyBox(roll: number): boolean {
        return roll % 2 !== 0;
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
	public addCoin() {
        this.purse += 1;
      }
}
