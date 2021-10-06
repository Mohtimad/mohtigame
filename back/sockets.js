
//var myVar;
//
//function myFunction() {
//  myVar = setTimeout(function(){ alert("Hello"); }, 3000);
//}
//
//function myStopFunction() {
//  clearTimeout(myVar);
//}

const localStorage = require('localStorage');
const gameStat = require('./sockets/rules')
const socketio = require('socket.io');
const gameIo = require('./sockets/gameIo');
const maxRoom = 99
const regexUsername = /^([a-zA-Z0-9.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{3,20})$/

const newTurn = (partyData) => {
    let playerNextTurn = partyData.playerTurn
    for (let i = 0; i <= partyData.playerNb; i++) {
        if (playerNextTurn + 1 > partyData.playerNb) {
            playerNextTurn = 0
        }
        if (partyData.playersID[playerNextTurn] === null ||
            partyData.playersScore[playerNextTurn] >= partyData.maxScore
        ) {
            playerNextTurn++
        } else {
            return playerNextTurn
        }
    }
}

const randomTurn = (maxPlayer) => {
    return (Math.floor(Math.random() * maxPlayer)) + 1
}

module.exports.listen = function (server) {
    const io = socketio(server, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', (socket) => {
        console.log(`Connecté au client ${socket.id}`)

        socket.on('room', function (data) {
            //check if the maximum number of rooms
            if (data.room > 0 &&
                data.room <= maxRoom &&
                !isNaN(parseInt(data.room, 10) &&
                    regexUsername.test(data.username))
            ) {
                let partyData = localStorage.getItem(`game_${data.room}`)
                // init game stats in storage if not exist
                if (!partyData) {
                    let newParty = gameStat.modelGame()
                    let playerNb = Math.floor(data.room / 10)
                    newParty.playerNb = playerNb < 2 ? 2 : playerNb + 1
                    newParty.playersName.length = playerNb + 1
                    newParty.playersID.length = playerNb + 1
                    newParty.playersScore.length = playerNb + 1
                    localStorage.setItem(`game_${data.room}`, JSON.stringify(newParty))
                    console.log(`Created Party ${data.room}`)
                }
                socket.broadcast.emit(`room_${data.room}`, `${data.username} à rejoint le salon`)
                // update party of room
                io.to(socket.id).emit(`game_${data.room}`, JSON.parse(localStorage.getItem(`game_${data.room}`)));

                socket.on('disconnect', function () {
                    // reset the stats if the client disconnects and passes his turn
                    let partyData = JSON.parse(localStorage.getItem(`game_${data.room}`))
                    let indexOfId = partyData.playersID.indexOf(socket.id)
                    if (indexOfId != -1) {
                        partyData.playersName[indexOfId] = null
                        partyData.playersID[indexOfId] = null
                        partyData.playersScore[indexOfId] = 0
                        if (partyData.playerTurn === indexOfId + 1) {
                            partyData.playerTurn = newTurn(partyData) + 1
                            partyData.points = 0
                            partyData.diceRemaining = partyData.nbOfDices
                        }
                        let playersActive = 0
                        io.emit(`room_${data.room}`, `${data.username} à quitté la partie !`)
                        if (partyData.isStart) {
                            for (let i = 0; i < partyData.playerNb; i++) {
                                if (partyData.playersID[i]) {
                                    playersActive++
                                }
                                if (i == partyData.playerNb - 1 && playersActive <= 1) {
                                    partyData.playersScore[partyData.playerTurn - 1] = partyData.maxScore
                                    io.emit(`room_${data.room}`, `${partyData.playersName[partyData.playerTurn - 1]} à gagné par forfait !`)
                                    partyData.lastWinner = partyData.playersName[partyData.playerTurn - 1]
                                    partyData.playerTurn = -1
                                    partyData.win = true
                                    let time = partyData.lose ? 3100 : 0

                                    setTimeout(() => {
                                        let newParty = gameStat.modelGame()
                                        let playerNb = Math.floor(data.room / 10)
                                        newParty.playerNb = playerNb < 2 ? 2 : playerNb + 1
                                        newParty.playersName.length = playerNb + 1
                                        newParty.playersID.length = playerNb + 1
                                        newParty.playersScore.length = playerNb + 1
                                        localStorage.setItem(`game_${data.room}`, JSON.stringify(newParty))
                                        io.emit(`game_${data.room}`, newParty);
                                    }, time)
                                    break;
                                }

                            }
                        }
                        // update party stats in storage
                        localStorage.setItem(`game_${data.room}`, JSON.stringify(partyData))
                        // update party stats for clients
                        io.emit(`game_${data.room}`, partyData);
                    } else {
                        socket.broadcast.emit(`room_${data.room}`, `${data.username} à quitté le salon`)
                    }
                })
            }
        });


        socket.on('takePoints', function (room) {
            let partyData = JSON.parse(localStorage.getItem(`game_${room}`))
            let playerNb = partyData.playerTurn - 1
            if (partyData.playersID[playerNb] == socket.id && partyData.canMakePoints) {
                partyData.playersScore[playerNb] += partyData.points
                partyData.points = 0
                partyData.diceRemaining = partyData.nbOfDices
                partyData.playerTurn = newTurn(partyData) + 1
                partyData.canMakePoints = false
                localStorage.setItem(`game_${room}`, JSON.stringify(partyData))
                io.emit(`game_${room}`, partyData);
            }
        })

        socket.on('addPlayer', function (data) {
            const playerNumber = parseInt(data.playerNb, 10)
            const maxPlayer = Math.floor(data.room / 10) + 1
            const room = parseInt(data.room, 10)
            let partyData = JSON.parse(localStorage.getItem(`game_${room}`))

            // security check
            if (room > 0 &&
                room <= maxRoom &&
                regexUsername.test(data.username) &&
                playerNumber >= 0 &&
                playerNumber < maxPlayer &&
                partyData.playersID[playerNumber] == null &&
                !partyData.isStart
            ) {
                if (!partyData.playersID.includes(socket.id)) {
                    if (!partyData.playersName[playerNumber]) {
                        partyData.playersName[playerNumber] = data.username
                        partyData.playersID[playerNumber] = socket.id
                        partyData.playersScore[playerNumber] = 0
                        socket.broadcast.emit(`room_${room}`, `${data.username} est le joueur 0${playerNumber + 1}`);
                        io.to(socket.id).emit(`room_${room}`, `Vous êtes le joueur 0${playerNumber + 1}`);
                        let canStart = partyData.playersID.indexOf(null)
                        if (canStart === -1) {
                            partyData.isStart = true
                            partyData.playerTurn = randomTurn(partyData.playerNb)
                        }
                        localStorage.setItem(`game_${data.room}`, JSON.stringify(partyData))
                        io.emit(`game_${room}`, partyData);
                    } else {
                        io.to(socket.id).emit(`room_${room}`, `${partyData.playersName[playerNumber]} est déjà le joueur 0${playerNumber + 1}`);
                    }
                }
            }
        });

        socket.on('chat', function (data) {
            io.emit(`room_${data.room}`, data.msg);
        })

        socket.on(`game`, function (room) {
            //let timeSet = 10_000
            //let counter = null
            //
            //const time = (partyData, room) => {
            //    counter = setInterval(() => {
            //        newTurn(partyData)
            //        partyData.points = 0
            //        partyData.diceRemaining = partyData.nbOfDices
            //        partyData.lose = false
            //        partyData.playerTurn = newTurn(partyData) + 1
            //        io.emit(`game_${room}`, partyData);
            //    }, timeSet);
            //}
            //
            //clearTimeout(counter);
            let partyData = JSON.parse(localStorage.getItem(`game_${room}`))
            let updatedPartyData = gameIo.turnInit(partyData)
            if (updatedPartyData.lose) {
                //timeSet += 3000
                setTimeout(() => {
                    updatedPartyData.points = 0
                    updatedPartyData.diceRemaining = updatedPartyData.nbOfDices
                    updatedPartyData.lose = false
                    updatedPartyData.playerTurn = newTurn(updatedPartyData) + 1
                    localStorage.setItem(`game_${room}`, JSON.stringify(updatedPartyData))
                    io.emit(`game_${room}`, updatedPartyData);
                }, 3000);
            } else if (updatedPartyData.win) {
                updatedPartyData.diceRemaining = 0
                updatedPartyData.playersScore[updatedPartyData.playerTurn - 1] += partyData.points
                updatedPartyData.points = 0
                updatedPartyData.playerTurn = -1
                localStorage.setItem(`game_${room}`, JSON.stringify(updatedPartyData))
                socket.broadcast.emit(`room_${room}`, `${updatedPartyData.playersName[updatedPartyData.playerTurn - 1]} à gagné la partie !!`);
                io.to(socket.id).emit(`room_${room}`, 'Vous avez gagné la partie !');
                io.emit(`game_${room}`, updatedPartyData);
                setTimeout(() => {
                    let newParty = gameStat.modelGame()
                    let playerNb = Math.floor(room / 10)
                    newParty.playerNb = playerNb < 2 ? 2 : playerNb + 1
                    newParty.playersName.length = playerNb + 1
                    newParty.playersID.length = playerNb + 1
                    newParty.playersScore.length = playerNb + 1
                    localStorage.setItem(`game_${room}`, JSON.stringify(newParty))
                    io.emit(`game_${room}`, newParty);
                }, 5000);
            }
            localStorage.setItem(`game_${room}`, JSON.stringify(updatedPartyData))
            io.emit(`game_${room}`, partyData);
            //time(partyData, room, timeSet)
        });
    });
};