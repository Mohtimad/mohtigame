const localStorage = require('localStorage');
const socketio = require('socket.io');
const game = require('./sockets/game');
const textChat = require('./sockets/chat')
const party = require('./sockets/party');
const gameStat = require('./sockets/rules')
const maxRoom = 50
const regexUsername = /^[a-zA-Z0-9.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{3,8}$/;
const maxTimePerTurn = 15 //sec

const roomIsValid = (room) => {
    if (room > 0 &&
        room <= maxRoom &&
        !isNaN(parseInt(room, 10))) {
        return true
    } else {
        return false
    }
}

const usernameIsValid = (username) => {
    return regexUsername.test(username)
}

module.exports.listen = function (server) {
    const io = socketio(server , {cors: { origin: "*"}});

    // timer loop
    setInterval(() => {
        for (let i = 0; i < maxRoom; i++) {
            const partyData = JSON.parse(localStorage.getItem(`game_${i + 1}`))
            const time = Math.floor(Date.now() / 1000)
            if (partyData) {
                if (partyData.isStart && !partyData.lose && !partyData.win && time >= partyData.timePerTurn) {
                    partyData.playerTurn = game.nextTurn(partyData) + 1
                    partyData.timeServer = Math.floor(Date.now() / 1000)
                    partyData.timePerTurn = partyData.timeServer + maxTimePerTurn
                    partyData.points = 0
                    partyData.diceRemaining = partyData.nbOfDices
                    localStorage.setItem(`game_${i + 1}`, JSON.stringify(partyData))
                    delete partyData.playersID
                    io.emit(`game_${i + 1}`, partyData);
                }
            }
        }
    }, 1000)

    io.on('connection', (socket) => {
        console.log(`Connecté au client ${socket.id}`)
        socket.on('room', function (data) {
            //check if the maximum number of rooms
            if (roomIsValid(data.room) &&
                usernameIsValid(data.username)
            ) {
                party.initNewParty(data)
                socket.broadcast.emit(`room_${data.room}`, `${data.username} à rejoint le salon`)
                // update party of room
                let loadPartyData = JSON.parse(localStorage.getItem(`game_${data.room}`))
                delete loadPartyData.playersID
                io.to(socket.id).emit(`game_${data.room}`, loadPartyData);

                socket.on('disconnect', function () {
                    // reset the stats if the client disconnects and passes his turn
                    let partyData = JSON.parse(localStorage.getItem(`game_${data.room}`))
                    let playerNb = partyData.playersID.indexOf(socket.id)
                    if (playerNb != -1) {
                        let roomList = JSON.parse(localStorage.getItem('partyList'))
                        partyData.playersName[playerNb] = partyData.isStart ? -10 : null
                        partyData.playersID[playerNb] = null
                        partyData.playersScore[playerNb] = 0
                        if (partyData.playerTurn === playerNb + 1) {
                            partyData.playerTurn = game.nextTurn(partyData) + 1
                            partyData.timeServer = Math.floor(Date.now() / 1000)
                            partyData.timePerTurn = partyData.timeServer + maxTimePerTurn
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
                                if (i == partyData.playerNb - 1 && playersActive <= 1 && !partyData.win) {
                                    partyData.playersScore[partyData.playerTurn - 1] = partyData.maxScore
                                    io.emit(`room_${data.room}`, `${partyData.playersName[partyData.playerTurn - 1]} à gagné par forfait !`)
                                    let winnerName = partyData.playersName[partyData.playerTurn - 1]
                                    partyData.lastWinner = winnerName
                                    partyData.win = true
                                    roomList[data.room - 1] = 0

                                    setTimeout(() => {
                                        let newParty = gameStat.modelGame(data.room)
                                        let playerNb = Math.floor((data.room - 1) / 5) + 1
                                        newParty.playerNb = playerNb < 2 ? 2 : playerNb
                                        newParty.playersName.length = newParty.playerNb
                                        newParty.playersID.length = newParty.playerNb
                                        newParty.playersScore.length = newParty.playerNb
                                        newParty.lastWinner = winnerName
                                        localStorage.setItem(`game_${data.room}`, JSON.stringify(newParty))
                                        delete newParty.playersID
                                        io.emit(`game_${data.room}`, newParty);
                                    }, 5000)
                                    break;
                                }

                            }
                        } else {
                            roomList[data.room - 1]--
                        }
                        localStorage.setItem('partyList', JSON.stringify(roomList))
                        io.emit('home', roomList);
                        // update party stats in storage
                        localStorage.setItem(`game_${data.room}`, JSON.stringify(partyData))
                        // update party stats for clients
                        delete partyData.playersID
                        io.emit(`game_${data.room}`, partyData);
                    } else {
                        socket.broadcast.emit(`room_${data.room}`, `${data.username} à quitté le salon`)
                    }
                })
            }
        });


        socket.on('takePoints', function (room) {
            if (roomIsValid(room)) {
                let partyData = JSON.parse(localStorage.getItem(`game_${room}`))
                let playerNb = partyData.playerTurn - 1
                if (partyData.playersID[playerNb] == socket.id && partyData.canMakePoints) {
                    partyData.playersScore[playerNb] += partyData.points
                    partyData.points = 0
                    partyData.diceRemaining = partyData.nbOfDices
                    partyData.playerTurn = game.nextTurn(partyData) + 1
                    partyData.timeServer = Math.floor(Date.now() / 1000)
                    partyData.timePerTurn = partyData.timeServer + maxTimePerTurn
                    partyData.canMakePoints = false
                    localStorage.setItem(`game_${room}`, JSON.stringify(partyData))
                    delete partyData.playersID
                    io.emit(`game_${room}`, partyData);
                }
            }
        })

        socket.on('addPlayer', function (data) {
            const room = data.room
            const playerNumber = data.playerNb
            const maxPlayer = Math.floor((data.room - 1) / 5) + 1 < 2 ? 2 : Math.floor((data.room - 1) / 5) + 1
            let partyData = JSON.parse(localStorage.getItem(`game_${data.room}`))

            // security check
            if (data.room > 0 &&
                data.room <= maxRoom &&
                regexUsername.test(data.username) &&
                data.playerNb >= 0 &&
                data.playerNb <= maxPlayer &&
                partyData.playersID[playerNumber] == null &&
                !partyData.isStart &&
                partyData
            ) {
                if (!partyData.playersID.includes(socket.id)) {
                    if (!partyData.playersName[playerNumber]) {
                        partyData.playersName[playerNumber] = data.username
                        partyData.playersID[playerNumber] = socket.id
                        partyData.playersScore[playerNumber] = 0
                        let roomList = localStorage.getItem('partyList') ? JSON.parse(localStorage.getItem('partyList')) : new Array(maxRoom)
                        roomList[room - 1] = roomList[room - 1] ? roomList[room - 1] += 1 : 1
                        localStorage.setItem('partyList', JSON.stringify(roomList))
                        io.emit('home', roomList);
                        socket.broadcast.emit(`room_${room}`, `${data.username} est le joueur 0${playerNumber + 1}`);
                        io.to(socket.id).emit(`room_${room}`, `Vous êtes le joueur 0${playerNumber + 1}`);
                        let canStart = partyData.playersID.indexOf(null)

                        if (canStart === -1) {
                            partyData.isStart = true
                            partyData.playerTurn = game.randomTurn(partyData.playerNb)
                            partyData.timeServer = Math.floor(Date.now() / 1000)
                            partyData.timePerTurn = partyData.timeServer + maxTimePerTurn
                        }
                        localStorage.setItem(`game_${data.room}`, JSON.stringify(partyData))
                        delete partyData.playersID
                        io.emit(`game_${room}`, partyData);
                    } else {
                        io.to(socket.id).emit(`room_${room}`, `${partyData.playersName[playerNumber]} est déjà le joueur ${playerNumber + 1}`);
                    }
                }
            }
        });


        socket.on('chat', function (data) {
            if (data.room > 0 &&
                data.room <= maxRoom &&
                regexUsername.test(data.username)) {
                const text = textChat.text
                console.log(text[data.value])
                if (data.value >= 0 && data.value < text.length) {
                    io.emit(`room_${data.room}`, data.username + ' : ' + text[data.value]);
                }
            }
        })

        socket.on('home', function (data) {
            if (regexUsername.test(data.username)) {
                let roomList = localStorage.getItem('partyList') ? JSON.parse(localStorage.getItem('partyList')) : new Array(maxRoom)
                io.to(socket.id).emit('home', roomList);
            }
        })

        socket.on(`game`, function (room) {
            if (room > 0 &&
                room <= maxRoom) {
                let partyData = JSON.parse(localStorage.getItem(`game_${room}`))
                let updatedPartyData = game.turnInit(partyData)
                if (updatedPartyData.lose) {
                    setTimeout(() => {
                        updatedPartyData.points = 0
                        updatedPartyData.diceRemaining = updatedPartyData.nbOfDices
                        updatedPartyData.lose = false
                        updatedPartyData.playerTurn = game.nextTurn(updatedPartyData) + 1
                        updatedPartyData.timeServer = Math.floor(Date.now() / 1000)
                        updatedPartyData.timePerTurn = updatedPartyData.timeServer + maxTimePerTurn
                        localStorage.setItem(`game_${room}`, JSON.stringify(updatedPartyData))
                        delete updatedPartyData.playersID
                        io.emit(`game_${room}`, updatedPartyData);
                    }, partyData.dices.length * 20 * 10 + 3000);
                } else if (updatedPartyData.win) {
                    let winnerName = updatedPartyData.playersName[updatedPartyData.playerTurn - 1]
                    updatedPartyData.diceRemaining = 0
                    updatedPartyData.playersScore[updatedPartyData.playerTurn - 1] += partyData.points
                    updatedPartyData.points = 0
                    socket.broadcast.emit(`room_${room}`, `${updatedPartyData.playersName[updatedPartyData.playerTurn - 1]} à gagné la partie !!`);

                    updatedPartyData.lastWinner = winnerName
                    localStorage.setItem(`game_${room}`, JSON.stringify(updatedPartyData))
                    delete updatedPartyData.playersID
                    io.emit(`game_${room}`, updatedPartyData);
                    setTimeout(() => {
                        let newParty = gameStat.modelGame(room)
                        newParty.lastWinner = winnerName
                        let playerNb = Math.floor((room - 1) / 5) + 1
                        newParty.playerNb = playerNb < 2 ? 2 : playerNb
                        newParty.playersName.length = newParty.playerNb
                        newParty.playersID.length = newParty.playerNb
                        newParty.playersScore.length = newParty.playerNb
                        localStorage.setItem(`game_${room}`, JSON.stringify(newParty))
                        let roomList = JSON.parse(localStorage.getItem('partyList'))
                        roomList[room - 1] = 0
                        localStorage.setItem('partyList', JSON.stringify(roomList))
                        io.emit('home', roomList);
                        delete newParty.playersID
                        io.emit(`game_${room}`, newParty);
                        io.to(socket.id).emit(`room_${room}`, 'Vous avez gagné la partie !');
                    }, partyData.dices.length * 20 * 10 + 5000);
                }
                updatedPartyData.timeServer = Math.floor(Date.now() / 1000)
                updatedPartyData.timePerTurn = updatedPartyData.timeServer + maxTimePerTurn

                localStorage.setItem(`game_${room}`, JSON.stringify(updatedPartyData))
                let bufferPartydata = JSON.parse(localStorage.getItem(`game_${room}`))
                delete bufferPartydata.playersID
                io.emit(`game_${room}`, bufferPartydata);
            }
        });
    });
};