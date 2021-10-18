<template>
  <div id="rooms">
    <h1>Liste des salons</h1>
    <div id="list-rooms">
      <fieldset class="filter">
        <legend>Filtres</legend>
        <div class="filter__part">
          <input
            v-model="scoreFilter"
            type="radio"
            id="_5k10k"
            name="score"
            value="all"
          />
          <label for="_5k10k"
            ><span class="color--orangered">5K</span> /
            <span class="color--orange">10K</span></label
          >
        </div>

        <div class="filter__part">
          <input
            v-model="scoreFilter"
            type="radio"
            id="_5k"
            name="score"
            value="5"
          />
          <label for="_5k"><span class="color--orangered">5K</span></label>
        </div>
        <div class="filter__part">
          <input
            v-model="scoreFilter"
            type="radio"
            id="_10k"
            name="score"
            value="10"
          />
          <label for="_10k"><span class="color--orange">10K</span></label>
        </div>
        <div class="filter__part">
          <label for="playersSelect">Joueurs : </label>
          <select v-model="playerFilter" name="players" id="playersSelect">
            <option value="all">Tous</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </fieldset>
      <section class="section">
        <h2>Partie(s) en attente de joueur(s)</h2>
        <div v-for="(player, index) in rooms" :key="player" class="room">
          <a
            class="shadow-green"
            v-if="
              player &&
              player != initMaxPlayer(index) &&
              (playerFilter === 'all' ||
                initMaxPlayer(index) == playerFilter) &&
              (scoreFilter === 'all' || getMaxPoints(index) == scoreFilter)
            "
            :href="this.url + `/game/${parseInt(index) + 1}`"
            >Salon n°{{ parseInt(index) + 1 }} -
            <span
              :class="`color--${
                getMaxPoints(index) == 5 ? 'orangered' : 'orange'
              }`"
              >{{ getMaxPoints(index) }}K</span
            ><br />Joueurs {{ player !== null ? player : 0 }}/{{
              initMaxPlayer(index)
            }}</a
          >
        </div>
      </section>
      <section class="section">
        <h2>Partie(s) en cours</h2>
        <div v-for="(player, index) in rooms" :key="player" class="room">
          <a
            class="shadow-red"
            v-if="
              player &&
              player == initMaxPlayer(index) &&
              (playerFilter === 'all' ||
                initMaxPlayer(index) == playerFilter) &&
              (scoreFilter === 'all' || getMaxPoints(index) == scoreFilter)
            "
            :href="this.url + `/game/${parseInt(index) + 1}`"
            >Salon n°{{ parseInt(index) + 1 }} -
            <span
              :class="`color--${
                getMaxPoints(index) == 5 ? 'orangered' : 'orange'
              }`"
              >{{ getMaxPoints(index) }}K</span
            ><br />Joueurs {{ player !== null ? player : 0 }}/{{
              initMaxPlayer(index)
            }}</a
          >
        </div>
      </section>
      <section class="section">
        <h2>Salons</h2>
        <div v-for="(player, index) in rooms" :key="player" class="room">
          <a
            :class="`shadow-${
              player && player == initMaxPlayer(index) ? 'red' : 'green'
            }`"
            v-if="
              (playerFilter === 'all' ||
                initMaxPlayer(index) == playerFilter) &&
              (scoreFilter === 'all' || getMaxPoints(index) == scoreFilter)
            "
            :href="this.url + `/game/${parseInt(index) + 1}`"
            >Salon n°{{ parseInt(index) + 1 }} -
            <span
              :class="`color--${
                getMaxPoints(index) == 5 ? 'orangered' : 'orange'
              }`"
              >{{ getMaxPoints(index) }}K</span
            ><br />Joueurs {{ player !== null ? player : 0 }}/{{
              initMaxPlayer(index)
            }}</a
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rooms",
  props: {
    socket: Object,
  },
  data() {
    return {
      username: localStorage.getItem("username")
        ? JSON.parse(localStorage.getItem("username")).username
        : "",
      playerFilter: "all",
      scoreFilter: "all",
      maxPlayer: 10,
      url: window.location.origin,
      rooms: [],
    };
  },
  mounted() {
    this.socket.on("home", (list) => {
      this.rooms = list;
    });
    this.socket.emit("home", {
      username: this.username,
    });
  },
  computed: {},
  methods: {
    initMaxPlayer: function (room) {
      let maxPlayer = Math.floor(parseInt((room - 1) / 5) + 1);
      return maxPlayer < 2 ? 2 : maxPlayer;
    },
    getMaxPoints: function (room) {
      return room % 5 < 3 ? 5 : 10;
    },
  },
};
</script>

<style lang="scss">
@import "../scss/main";
.color {
  &--orangered {
    color: orangered;
  }
  &--orange {
    color: orange;
  }
}

.shadow-green {
  box-shadow: inset 5px 5px 10px #002aff4c, inset -5px -5px 10px #002aff4c;
}
.shadow-red {
  box-shadow: inset 5px 5px 10px #ff000053, inset -5px -5px 10px #ff000053;
}
#rooms {
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  #list-rooms {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    .filter {
      padding: 10px 0;
      border: #00a6ffb0 1px solid;
      border-right: none;
      border-left: none;
      text-align: center;
      font-size: 0.7rem;
      color: white;
      display: flex;
      justify-content: center;
      margin: 0 0 10px 0;
      max-width: 900px;
      width: 100%;
      &__part {
        padding: 0 5px;
        display: flex;
        align-items: center;
        input {
          margin: 0 5px;
        }
      }
    }
    .section {
      background-color: rgba(0, 0, 0, 0.277);
      border-bottom: #00a6ffb0 1px solid;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: auto;
      margin-bottom: 15px;
      padding-bottom: 10px;
      width: 80vw;
      max-width: 900px;
      @include mobile-only {
        width: 100%;
      }
      .room {
        display: flex;
        justify-content: center;
        a {
          display: inline-block;
          padding: 5px;
          margin: 5px;
          font-size: 0.8rem;
          text-align: center;
          border: #848484 1px solid;
          width: 120px;
          text-decoration: none;
          font-weight: 100;
          color: white;
          &:hover {
            border: orange 1px solid;
          }
        }
      }
    }
  }
}
</style>
