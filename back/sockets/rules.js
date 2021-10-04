module.exports.modelGame = () => {
    return {
        playerNb: 0,
        isStart: false,
        maxScore: 1_000,
        dicePoints: [100, 0, 0, 0, 50, 0],
        playersName: [],
        playersID: [],
        playersScore: [],
        playerTurn: 0,
        dices: [],
        nbOfDices: 5,
        diceRemaining: 5,
        points: 0,
        canMakePoints: false,
        lose: false,
        win: false,
        msPerTurn: 10_000,
        pointsBase: 300,
        lastWinner: '',
    }
}