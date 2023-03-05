export interface IWinningCondition {
	didPlayerWin(purse: number): boolean;
}

export class WinningCondition implements IWinningCondition {
	public didPlayerWin(purse: number): boolean {
		return purse === 6;
	}
}
