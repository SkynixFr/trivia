interface IWinningCondition {
	didPlayerWin(purses: number[], currentPlayerIndex: number): boolean;
}

export class WinningCondition implements IWinningCondition {
	public didPlayerWin(purses: number[], currentPlayerIndex: number): boolean {
		return purses[currentPlayerIndex] === 6;
	}
}
