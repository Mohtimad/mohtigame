const localStorage = require('localStorage');
const gameStat = require('./rules')

module.exports.initNewParty = (data) => {
    let partyData = localStorage.getItem(`game_${data.room}`)
    // init game stats in storage if not exist
    if (!partyData) {
        let newParty = gameStat.modelGame(data.room)
        const playerNb = Math.floor(parseInt(data.room - 1) / 5) + 1
        newParty.playerNb = playerNb < 2 ? 2 : playerNb
        newParty.playersName.length = newParty.playerNb
        newParty.playersID.length = newParty.playerNb
        newParty.playersScore.length = newParty.playerNb
        localStorage.setItem(`game_${data.room}`, JSON.stringify(newParty))
    }
}