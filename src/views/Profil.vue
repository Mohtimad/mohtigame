<template>
  <div id="profil">
    <h1>Profil</h1>
    <br />
    <h2>Choisir un pseudo !</h2>
    <p class="intro-text">
      Un pseudo est nécessaire pour accéder à l'intégralité de l'application.
    </p>
    <p v-if="!usernamAvailable" class="intro-text">
      En confirmant vous serez redirigé vers l'écran d'accueil.
    </p>
    <form v-on:submit.prevent="onSubmit" id="form">
      <label for="username">Pseudo</label>
      <input @keyup="usernameWasEdited = false" @keyup.enter="this.updateUsername()" v-model="this.username" id="username" type="text" />
      <Button
        :text="!usernamAvailable ? 'Confirmer' : 'Modifier'"
        @click="this.updateUsername()"
        type="button"
      />
      <p class="info">* max 8 caractères alphanumériques</p>
      <p
        v-if="!this.checkValidateUsername() && this.username"
        class="alert alert--red"
      >
        Syntaxe incorrect !
      </p>
      <p v-if="usernameWasEdited" class="alert alert--green">
        Pseudo enregistré !
      </p>
    </form>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
const regexUsername =
  /^[a-zA-Z0-9.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{3,8}$/;
export default {
  components: {
    Button,
  },
  data() {
    return {
      alert: "",
      username: "",
      usernamAvailableOnMount: false,
      usernameWasEdited: false,
    };
  },

  beforeMount() {
    const username = localStorage.getItem("username");
    if (username) {
      this.username = JSON.parse(localStorage.getItem("username")).username;
      this.usernamAvailable = true;
    }
  },

  methods: {
    checkValidateUsername() {
      return regexUsername.test(this.username);
    },
    updateUsername() {
      if (this.checkValidateUsername()) {
        localStorage.setItem(
          "username",
          JSON.stringify({ username: this.username })
        );
        if (!this.usernamAvailable) {
          document.location.href = window.location.origin;
        } else {
          this.usernameWasEdited = true;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.intro-text {
  margin: 20px auto;
  font-size: 0.7rem;
  text-align: center;
  max-width: 300px;
  color: #ffa600;
}
#form {
  text-align: center;
  color: white;
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  label {
    font-size: .7rem;
  }
  #username {
    padding: 5px;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 10px;
  }
}
.info {
  font-size: 0.7rem;
}
.alert {
  text-align: center;
  &--red {
    color: red;
  }
  &--green {
    color: green;
  }
}
</style>