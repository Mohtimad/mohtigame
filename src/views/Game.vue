<template>
  <div id="game">
    <h1 class="h1">Salon n°{{ this.id }}</h1>
    <h2 class="h2">
      Partie à {{ this.partyData.playerNb }} joueurs<br />en
      {{ this.partyData.maxScore }} points
    </h2>

    <p v-if="this.partyData.win && this.canDisplayWin" class="winner">
      Bravo {{ this.partyData.lastWinner }}!
    </p>
    <p v-else-if="this.partyData.lastWinner !== ''" class="last-winner">
      Dernier vainqueur : {{ this.partyData.lastWinner }}
    </p>
    <Table
      :animationDices="this.animationDices"
      :partyData="{ ...this.partyData }"
    />
    <div v-if="this.partyData.isStart && !this.animationDices" class="banner">
      <p class="banner--red" v-if="this.partyData.lose">
        PERDU
        {{
          this.partyData.points === 0
            ? "AUCUN POINT"
            : `${this.partyData.points} POINTS`
        }}
      </p>
      <p v-else>
        <span
          v-if="
            !this.partyData.lose &&
            !this.partyData.win &&
            this.partyData.isStart &&
            this.time >= 0 &&
            this.time <= 9
          "
          class="timer"
        >
          {{ this.time }}</span
        >
        {{
          this.partyData.win
            ? `VICTOIRE ${this.partyData.maxScore}`
            : this.partyData.points === 0
            ? "DÉBUT DU TOUR"
            : `${this.partyData.points} POINTS`
        }}
        -
        <span
          v-if="
            this.partyData.playerTurn === this.actualPlayer &&
            !this.partyData.lose &&
            !this.partyData.win
          "
        >
          <Button
            text="Prendre"
            v-on:click="takePoint"
            v-if="this.partyData.canMakePoints"
            class="button"
          />
          <Button
            class="button"
            :text="`Lancer x${this.partyData.diceRemaining}`"
            v-on:click="rollDices"
            v-if="
              !this.partyData.playersName.includes(null) ||
              this.partyData.isStart
            "
          />
        </span>
        <span v-else class="dice-remaining">
          {{ `DÉ(S) RESTANT(S) x${this.partyData.diceRemaining}` }}
        </span>
      </p>
    </div>
    <div
      v-else-if="this.animationDices && this.partyData.isStart"
      class="banner"
    >
      <p>Veuillez patienter...</p>
    </div>
    <div class="banner">
      <div v-if="this.partyData.isStart">
        <p v-if="this.partyData.playerTurn !== this.actualPlayer">
          C'est le tour de
          {{ this.partyData.playersName[this.partyData.playerTurn - 1] }} [J{{
            this.partyData.playerTurn
          }}]
        </p>
        <p class="banner--green" v-else>C'est votre tour !</p>
      </div>
      <div v-else>
        <p class="banner--orange">Pas assez de joueur</p>
      </div>
    </div>
    <Chat :socket="socket" />
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";
export default {
  components: {
    Chat,
    Table,
    Button,
  },
  props: {
    socket: Object,
  },
  data() {
    return {
      username: this.$store.state.username,
      time: 0,
      animationDices: true,
      id: this.$route.params.id, //this is the id from the browser
      actualPlayer: -1,
      canDisplayWin: false,
      partyData: {
        playerNb: 0,
        isStart: false,
        maxScore: 0,
        dicePoints: [100, 0, 0, 0, 50, 0],
        playersName: [],
        playersScore: [],
        playerTurn: 0,
        dices: [],
        nbOfDices: 5,
        diceRemaining: 5,
        points: 0,
        canMakePoints: false,
        pointsBase: 300,
        lastWinner: "",
        lose: false,
        win: false,
        timePerTurn: 0,
      },
    };
  },

  watch: {},

  mounted() {
    this.socket.emit("room", {
      room: this.id,
      username: this.username,
    });
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },

  beforeMount() {
    this.socket.on(`game_${this.id}`, (partyData) => {
      this.partyData = { ...partyData };
      if (partyData.win) {
        this.actualPlayer = -1;
        this.canDisplayWin = false;
        setTimeout(() => {
          this.canDisplayWin = true;
        }, partyData.dices.length * 20 * 10 + 2000);
      }
      this.animationDices = true;
      setTimeout(() => {
        this.animationDices = false;
      }, partyData.dices.length * 20 * 10 + 1000);
    });
  },

  methods: {
    updateTime: function () {
      this.time =
        this.partyData.timePerTurn - Math.floor(Date.now() / 1000) - 1;
    },
    sendMsg: function (value) {
      this.socket.emit(`chat`, { msg: value, room: this.id });
    },

    takePoint: function () {
      this.socket.emit(`takePoints`, this.id);
    },

    rollDices: function () {
      this.socket.emit(`game`, this.id);
    },

    addPlayer: function (value) {
      if (this.partyData.isStart && this.actualPlayer === -1) {
        this.$store.commit("incrementChat", "La partie a déjà commencé !");
      } else if (this.actualPlayer === -1) {
        this.actualPlayer = value;
        this.socket.emit("addPlayer", {
          // playerNb & usename only for notifcation chat
          playerNb: this.actualPlayer - 1,
          username: this.username,
          room: this.id,
        });
      } else {
        this.$store.commit("incrementChat", "Vous avez déjà pris place !");
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
  .h2 {
    color: orange;
  }
  .h1 {
    font-size: 1rem;
  }
  .last-winner {
    color: white;
    font-size: 0.7rem;
  }
  .winner {
    text-align: center;
    width: 100%;
    max-width: 1200px;
    color: white;
    background-image: linear-gradient(to bottom, #509850, green, #509850);
  }
  .banner {
    font-size: 0.8rem;
    text-align: center;
    width: 100%;
    max-width: 1200px;
    background-color: rgba(0, 0, 255, 0.474);
    //background-image: linear-gradient(to bottom, #509850, green, #509850);
    color: white;
    p {
      position: relative;
      height: 100%;
      margin: 0;
      padding: 10px 0;
    }
    .button {
      font-size: 0.8rem;
      padding: 2px 5px;
    }
    &--red {
      background-color: rgba(245, 0, 0, 0.578);
    }
    &--green {
      background-color: rgba(9, 255, 5, 0.578);
    }
    &--orange {
      background-color: rgba(255, 132, 0, 0.578);
    }
  }
  .timer {
    z-index: 10;
    position: absolute;
    right: 10px;
    bottom: 100%;
    color: red;
    border-radius: 50%;
    font-size: 3rem;
  }
  .dice-remaining {
    color: #ffbf00;
  }
}
</style>
