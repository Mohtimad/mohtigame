<template>
  <nav id="nav">
    <router-link to="/">Accueil</router-link>
  </nav>
</template>

<style lang="scss">
    #nav {
      border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 100%;
        a {
            color: #e6e6e6;
            padding: 5px;
            text-decoration: none;
        }
        .router-link-active {
            color: #ffffff;
            font-weight: bold;
        }
    }
</style>