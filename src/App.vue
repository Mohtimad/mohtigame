<template>
  <Navbar />
  <router-view/>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
body {
  background-image: url('./assets/ground.png');
}
* {
  font-family: 'Russo One', sans-serif;
}
  h1 {
    font-weight: 200;
    text-transform: uppercase;
    width: auto;
    padding: 10px 30px;
    text-align: center;
    color: #00a6ff;
    border-radius: 20px;
    border-top:#00a6ffb0 5px solid ;
    border-bottom:#00a6ffb0 5px solid ;
  }
</style>
