const diceSides = 6
const maxCumulSideBonus = 4
const minCumulSideBonus = 3
//const maxPlayer = 2

const rollDices = (numberOfDice) => {
    let arrayDice = []
    for (let i = 0; i < numberOfDice; i++) {
        let dice = (Math.floor(Math.random() * diceSides)) + 1
        arrayDice.push(dice)
    }
    return arrayDice
}

const getResult = (dices, dicePoints) => {
    let points = 0
    let diceRemaining = dices.length
    let sumsOfSides = new Int16Array(diceSides)
    for (let i = 0; i < dices.length; i++) {
        sumsOfSides[dices[i] - 1]++
    }

    for (let i = 0; i < sumsOfSides.length; i++) {
        while (sumsOfSides[i] >= maxCumulSideBonus) {
            points += (10 ** (maxCumulSideBonus - 1)) * (i + 1)
            diceRemaining -= maxCumulSideBonus
            sumsOfSides[i] -= maxCumulSideBonus
        }
        while (sumsOfSides[i] >= minCumulSideBonus && i != 0) {
            points += ((10 ** (sumsOfSides[i] - 1)) * (i + 1))
            diceRemaining -= sumsOfSides[i]
            sumsOfSides[i] -= sumsOfSides[i]
        }
    }

    for (let i = 0; i < sumsOfSides.length; i++) {
        if (dicePoints[i] != 0) {
            points += sumsOfSides[i] * dicePoints[i]
            diceRemaining -= sumsOfSides[i]
        }
    }

    return {
        turnPoints: points,
        diceRemaining: diceRemaining
    }
}

const checkIfLost = (partyData) => {
    if (partyData.diceRemaining != 0 &&
        partyData.turnPoints == 0 ||
        partyData.points + partyData.playersScore[partyData.playerTurn - 1] > partyData.maxScore) {
        return true;
    } else {
        return false
    }
}

const checkIfWin = (partyData) => {
    if (partyData.points + partyData.playersScore[partyData.playerTurn - 1] == partyData.maxScore) {
        return true;
    } else {
        return false
    }
}

const checkIfCanMakePoints = (partyData) => {
    let pointsBase = partyData.playersScore[partyData.playerTurn - 1] != 0 ? 0 : partyData.pointsBase
    return partyData.points >= pointsBase && !partyData.lose
        ? Number.isInteger(partyData.points / 100)
        : false
}

exports.turnInit = (partyData) => {

    if (partyData.isStart) {
        partyData.dices = rollDices(partyData.diceRemaining)
        // return to result : points and the dice remaining
        const result = getResult(partyData.dices, partyData.dicePoints)
        partyData.turnPoints = result.turnPoints
        partyData.points += result.turnPoints
        partyData.diceRemaining = result.diceRemaining
        partyData.lose = checkIfLost(partyData)
        partyData.win = checkIfWin(partyData)
        partyData.diceRemaining = partyData.diceRemaining == 0 && !partyData.lose
            ? partyData.nbOfDices
            : partyData.diceRemaining
        partyData.canMakePoints = checkIfCanMakePoints(partyData)

    }
    return partyData
}