<template>
  <div class="table">
    <div
      id="dices"
      v-if="
        (this.partyData.isStart &&
          !(
            this.partyData.diceRemaining === partyData.nbOfDices &&
            this.partyData.points === 0
          )) ||
        this.partyData.lose
      "
    >
      <div
        v-for="(dice, index) in this.partyData.dices"
        :class="`dice dice--${
          this.animationDices ? index + 1 : 'not'
        } shadow--${!animationDices ? this.dicesShadowColor[index] : 'not'}`"
        :key="{ dice }"
      >
        <img
          :src="require(`@/assets/dices/${dice}.png`)"
          :alt="`Dé face ${dice}`"
        />
      </div>
    </div>
    <ul class="player-list">
      <li
        v-for="player in this.partyData.playerNb"
        :key="player"
        :class="`position-${player}`"
        :style="this.playerPositonCSS[player]"
      >
        <button
          :value="player"
          v-if="
            !this.partyData.playersName[player - 1] ||
            this.partyData.playersName[player - 1] === -10
          "
          v-on:click="this.$parent.addPlayer(player)"
          :class="`buttonPlayer empty-place empty-place--${
            partyData.isStart ? 'red' : 'green'
          }`"
        >
          {{ this.partyData.isStart ? "Abandon" : "Libre" }}<br />J{{ player }}
        </button>
        <button
          :class="`buttonPlayer used-place used-place--${
            player == partyData.playerTurn ? 'yellow' : 'blue'
          }`"
          v-else
        >
          {{ this.partyData.playersName[player - 1] }}<br />
          {{ this.partyData.playersScore[player - 1] }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    animationDices: Boolean,
    partyData: Object,
    dicesShadowColor: Array,
  },
  data() {
    return {
      animation: true,
      playerPositonCSS: {
        // loop on template
        1: { bottom: "40%", right: "100%" },
        2: { bottom: "100%", right: "85%" },
        3: { bottom: "100%", right: "60%" },
        4: { bottom: "100%", right: "35%" },
        5: { bottom: "100%", right: "10%" },
        6: { top: "40%", left: "100%" },
        7: { top: "100%", left: "85%" },
        8: { top: "100%", left: "60%" },
        9: { top: "100%", left: "35%" },
        10: { top: "100%", left: "10%" },
      },
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/main";
.table {
  box-shadow: #3f3f3f 3px 3px 20px, #d5d5d5 -3px -3px 20px;
  position: relative;
  margin: 50px 0 50px 0;
  width: 70vw;
  max-width: 750px;
  height: 25vw;
  max-height: 250px;
  background-image: linear-gradient(to right, #000000, #484848, #000000);
  border: #00a6ff 1vw solid;
  border-radius: 15vw;
  .player-list {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    li {
      position: absolute;
      max-width: 25%;
      .buttonPlayer {
        overflow-wrap: break-word;
        font-size: 0.5rem;
        @include desktop-tablet-only {
          font-size: 0.8rem;
        }
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 2px;
        color: white;
        cursor: pointer;
        transition-property: box-shadow background-color;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
      }
      .empty-place {
        &--red {
          background-color: #9c350f;
          box-shadow: #9c350f 1px 1px 10px, #9c350f -1px -1px 10px;
        }
        &--green {
          background-color: #0f9c22;
          box-shadow: #0f9c22 1px 1px 10px, #0f9c22 -1px -1px 10px;
        }
      }
      .used-place {
        cursor: auto;
        &--yellow {
          color: black;
          background-color: #dee81d;
          box-shadow: #dee81d 1px 1px 10px, #dee81d -1px -1px 10px;
        }
        &--blue {
          background-color: #2a2896;
          box-shadow: #2a2896 3px 3px 10px, #2a2896 -3px -3px 10px;
        }
      }
    }
  }
  #dices {
    position: absolute;
    width: 100%;
    height: 25%;
    top: 35%;
    display: flex;
    justify-content: space-evenly;
    .dice {
      height: 100%;
      border-radius: 15%;
      overflow: hidden;
      animation-duration: 1s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;

      @for $i from 1 through 9 {
        &--#{$i} {
          opacity: 0;
          animation-delay: #{$i * 20}0ms;
          animation-name: turnDices;
        }
      }
      img {
        height: 100%;
        width: auto;
      }
    }
  }

  .shadow {
    &--blue {
      box-shadow: blue 2px 2px 5px, blue -2px -2px 5px, blue 2px -2px 5px,
        blue -2px 2px 5px;
    }
    &--green {
      box-shadow: greenyellow 2px 2px 5px, greenyellow -2px -2px 5px, greenyellow 2px -2px 5px,
        greenyellow -2px 2px 5px;
    }
    &--yellow {
      box-shadow: yellow 2px 2px 5px, yellow -2px -2px 5px,
        yellow 2px -2px 5px, yellow -2px 2px 5px;
    }
    &--orange {
      box-shadow: orange 2px 2px 5px, orange -2px -2px 5px,
        orange 2px -2px 5px, orange -2px 2px 5px;
    }
    &--purple {
      box-shadow: purple 2px 2px 5px, purple -2px -2px 5px,
        purple 2px -2px 5px, purple -2px 2px 5px;
    }
    &--red {
      box-shadow: red 2px 2px 5px, red -2px -2px 5px, red 2px -2px 5px,
        red -2px 2px 5px;
    }
  }
  @keyframes turnDices {
    0% {
      transform: rotate(0turn);
      background-color: white;
      opacity: 1;
    }
    10% {
      background-color: white;
    }
    99% {
      background-color: white;
    }
    100% {
      background-color: black;
      transform: rotate(15turn);
      opacity: 1;
    }
  }
}
</style>