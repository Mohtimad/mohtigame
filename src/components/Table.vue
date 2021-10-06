<template>
  <div class="table">
    <div
      id="dices"
      v-if="
        (this.partyData.isStart &&
          !(
            this.partyData.diceRemaining === 5 && this.partyData.points === 0
          )) ||
        this.partyData.lose
      "
    >
      <div class="dice" v-for="dice in this.partyData.dices" :key="{ dice }">
        <img :src="require(`@/assets/dices/${dice}.png`)" />
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
          v-if="!this.partyData.playersName[player - 1]"
          v-on:click="this.$parent.addPlayer(player)"
        >
          Libre<br />J{{ player }}
        </button>
        <button class="used-place" v-else>
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
    partyData: Object,
  },
  data() {
    return {
      playerColor: 'green',
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
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  box-shadow: #3f3f3f 3px 3px 20px, #d5d5d5 -3px -3px 20px;
  position: relative;
  margin: 50px 0 50px 0;
  width: 75vw;
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
      button {
        overflow-wrap: break-word;
        font-size: 0.7rem;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 2px;
        background-color: #0f9c22;
        //box-shadow: #0f9c22 1px 1px 10px, #0f9c22 -1px -1px 10px;
        color: white;
        cursor: pointer;
      }
      .used-place {
        background-color: #2a2896;
        //box-shadow: #2a2896 3px 3px 10px,#2a2896 -3px -3px 10px;
        cursor: not-allowed;
      }
    }
  }
  #dices {
    position: absolute;
    width: 100%;
    height: 30%;
    top: 35%;
    display: flex;
    justify-content: space-evenly;
    .dice {
      //animation-duration: 1s;
      //animation-name: turnDices;
      //animation-timing-function: ease-out;
      //animation-fill-mode: forwards;
      height: 100%;
      img {
        height: 100%;
        width: auto;
      }
    }
  }
}
</style>