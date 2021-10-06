<template>
  <div id="game">
    <h1>Partie à {{ this.partyData.playerNb }} joueurs<br />en {{this.partyData.maxScore}} points</h1>
    <Table :partyData="{ ...this.partyData }" />
    <div v-if="this.partyData.isStart" class="scores">
      <p v-if="this.partyData.lose">PERDU {{ this.partyData.points }} POINTS</p>
      <p v-else>
        {{ this.partyData.points }} POINTS
        <span
          v-if="
            this.partyData.playerTurn === this.actualPlayer &&
            !this.partyData.lose
          "
        >
          <button
            class="button"
            v-on:click="takePoint"
            v-if="this.partyData.canMakePoints"
          >
            Prendre
          </button>
          <button
            class="button"
            v-on:click="rollDices"
            v-if="
              !this.partyData.playersName.includes(null) ||
              this.partyData.isStart
            "
          >
            Lancer x{{ this.partyData.diceRemaining }}
          </button>
        </span>
      </p>
    </div>
    <div class="scores">
      <div v-if="this.partyData.isStart">
        <p v-if="this.partyData.playerTurn !== this.actualPlayer">
          C'est le tour de
          {{ this.partyData.playersName[this.partyData.playerTurn - 1] }} [J{{
            this.partyData.playerTurn
          }}]
        </p>
        <p v-else>C'est votre tour !</p>
      </div>
      <div v-else>
        <p>Pas assez de joueur</p>
      </div>
    </div>
    <Chat :content="this.chat" />
  </div>
</template>

<script>
const username = "Doudou";
import io from "socket.io-client";
import Chat from "@/components/Chat.vue";
import Table from "@/components/Table.vue";
export default {
  components: {
    Chat,
    Table,
  },
  data() {
    return {
      url: window.location.href,
      id: this.$route.params.id, //this is the id from the browser
      socket: io("localhost:3000"),
      actualPlayer: -1,
      chat: "",
      partyData: {
        playerNb: 0,
        isStart: false,
        maxScore: 5_000,
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
        lastWinner: "",
      },
    };
  },

  computed: {},

  mounted() {
    this.socket.on(`room_${this.id}`, (text) => {
      this.chat += text + "\n";
    });
    this.socket.emit("room", {
      room: this.id,
      username: username,
    });
  },

  beforeMount() {
    this.socket.on(`game_${this.id}`, (partyData) => {
      this.partyData = { ...partyData };
      if (partyData.win) {
        setTimeout(() => {
          this.actualPlayer = -1;
        }, 5000);
      }
    });
  },

  methods: {
    takePoint: function () {
      this.socket.emit(`takePoints`, this.id);
    },

    rollDices: function () {
      this.socket.emit(`game`, this.id);
    },

    addPlayer: function (value) {
      if (this.partyData.isStart && this.actualPlayer === -1) {
        this.chat += "La partie a déjà commencé !" + "\n";
      } else if (this.actualPlayer === -1) {
        this.actualPlayer = value;
        this.socket.emit("addPlayer", {
          // playerNb & usename only for notifcation chat
          playerNb: this.actualPlayer - 1,
          username: username,
          room: this.id,
        });
      } else {
        this.chat += "Vous avez déjà pris place !" + "\n";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .scores {
    border: white 1px 0 0 1px solid;
    text-align: center;
    margin: 0 0 20px 0;
    width: 100%;
    background-color: rgba(0, 0, 255, 0.474);
    color: white;
  }
  .button {
    margin: 0 5px;
    font-size: 1rem;
    cursor: pointer;
    background-color: unset;
    border: white 1px solid;
    color: white;
  }
}
</style>
