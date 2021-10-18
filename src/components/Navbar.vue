<template>
  <nav id="nav">
    <a v-if="inGamePage" class="link" href="/rooms">Quitter</a>
    <span v-else>
      <router-link class="router-link link" to="/">Accueil</router-link>
      <router-link class="router-link link" to="/rooms">Salons</router-link>
      <router-link class="router-link link" to="/profil"
        >Profil</router-link
      ></span
    >
    <button @click="this.$store.state.rulesVisible = true" type="button" class="link">Règles</button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      inGamePage: /^(\/game\/)+[0-9]+[0-9]*$/.test(window.location.pathname),
    };
  },
};
</script>

<style lang="scss" scoped>
#nav {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  .link {
    position: relative;
    text-decoration: none;
    padding: 5px;
    color: #e6e6e6;
    border: none;
    background: unset;
    font-size: 0.9rem;
    cursor: pointer;
    transition-duration: 200ms;

    &:hover {
      color: #ffa600;
    }
  }
  .router-link-exact-active {
    color: #ffa600;
    &::after {
      margin-right: -10%;
      content: "";
      bottom: 0;
      left: 7px;
      position: absolute;
      width: 60%;
      border-bottom: #ffa600 2px solid;
    }
  }
}
</style>