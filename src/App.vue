<template>
  <header>
    <Navbar v-if="this.haveUsernameValid()" />
  </header>
  <main>
    <router-view :socket="socket" />
    <Rules v-if="this.$store.state.rulesVisible" />
  </main>
  <Footer />
</template>

<script>
import io from "socket.io-client";
import Navbar from "@/components/Navbar.vue";
import Rules from "@/components/Rules.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Rules,
    Footer,
  },
  data() {
    return {
      //socket: io("localhost:3000"),
      socket: io(window.location.origin),
    };
  },
  methods: {
    haveUsernameValid() {
      const regexUsername =
        /^[a-zA-Z0-9.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{3,8}$/;
      const dataStorage = JSON.parse(localStorage.getItem("username"));
      if (dataStorage) {
        return regexUsername.test(dataStorage.username);
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap');
body {
  margin: 0;
  padding: 0;
  background-attachment: fixed;
  background-color: black;
  background-image: url("./assets/ground.png");
  animation: defile linear 10s infinite;
}

#app {
  min-height: 100vh;
  position: relative;
}

* {
  font-family: 'Ubuntu', sans-serif;
}

main {
  padding-bottom: 70px;
  overflow: hidden;
  height: 100%;
}

h1 {
  font-size: 1.4rem;
  text-transform: uppercase;
  width: 80%;
  padding: 10px 0;
  margin: 20px 10%;
  text-align: center;
  color: #ffffff;
  border-radius: 20px;
  border-top: #00a6ffb0 5px solid;
  border-bottom: #00a6ffb0 5px solid;
}

h2 {
  position: relative;
  text-align: center;
  font-size: 1rem;
  text-transform: uppercase;
  width: 60%;
  padding: 10px 0;
  margin: 10px 20%;
  text-align: center;
  color: white;
  border-radius: 20px;
}

@keyframes defile {
  from {
    background-position: 0px 0px;
  }
  to {
    background-position: 256px 256px;
  }
}
</style>
