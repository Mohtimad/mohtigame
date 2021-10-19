<template>
  <div class="home">
    <h1>Accueil - Mohtigame</h1>
    <div class="hero">
      <img src="../assets/intro_dices.png" alt="" />
      <div class="intro">
        <h2 class="h2">Jeu de dés en ligne</h2>
        <p>
          Mothigame est une variante du jeu des 5000.<br /><br />
          De deux à dix joueurs, vous devez enchaîner les combinaisons à l'aide
          de cinq ou huit dés pour être le premier à atteindre exactement le
          nombre de point requis, ni plus, ni moins.
        </p>
        <br />
        <Button
          @click="this.$store.state.rulesVisible = true"
          text="Lire les règles"
          type="button"
        />
        <router-link class="router-link link" to="/rooms"
          ><Button text="Rejoindre un salon" type="button"
        /></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  name: "Home",
  components: {
    Button,
  },
};
</script>

<style lang="scss">
@import "../scss/main";
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .hero {
    margin-top: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    width: 100%;
    @include desktop-tablet-only {
      margin-top: 10vh;
    }
    img {
      z-index: -1;
      width: 40%;
      height: auto;
      -webkit-animation: 10s ease-in-out 0s infinite alternate levitation;
      animation: 10s ease-in-out 0s infinite alternate levitation;
      filter: drop-shadow( 4px 4px 10px #FFF);
      @include mobile-only {
        width: 80%;
        position: absolute;
        top: 40px;
        opacity: 0.3;
      }
    }
    .intro {
      padding: 10px;
      z-index: 1;
      width: 80%;
      text-align: center;
      @include mobile-only {
        width: 100%;
        padding-bottom: 50px;
      }
      .h2 {
        color: orange;
      }
      p {
        padding: 20px 10%;
        widows: 80%;
        color: white;
        font-size: 0.8rem;
      }
    }
  }
}

@keyframes levitation {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-20px) rotate(20deg);
  }
}
</style>
