module.exports.modelGame = (room) => {
    return {
        playerNb: 0,
        isStart: false,
        maxScore: (room - 1) % 5 < 3 ? 5000 : 10000,
        dicePoints: [100, 0, 0, 0, 50, 0],
        playersName: [],
        playersID: [],
        playersScore: [],
        playerTurn: 0,
        dices: [],
        nbOfDices: (room - 1) % 5 < 3 ? 5 : 8,
        diceRemaining: (room - 1) % 5 < 3 ? 5 : 8,
        points: 0,
        canMakePoints: false,
        lose: false,
        win: false,
        pointsBase: (room - 1) % 5 < 3 ? 300 : 500,
        lastWinner: '',
        timePerTurn: null
    }
}