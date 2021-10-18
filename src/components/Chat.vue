<template>
  <div id="chat">
    <div class="buttons">
      <div v-if="disableButtonMsg" class="spinner"></div>
      <Button
        :disabled="disableButtonMsg"
        class="button"
        v-for="(comment, index) in comments"
        :key="comment"
        :text="comment"
        :value="index"
        @click="this.sendMsg(index)"
      />
    </div>
    <div class="box">{{ this.$store.state.chat }}</div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "Chat",
  components: {
    Button,
  },
  props: {
    socket: Object,
  },
  computed: {},
  data() {
    return {
      //chat: this.$store.
      id: this.$route.params.id, //this is the id from the browser
      disableButtonMsg: false,
      comments: [
        "Bonjour",
        "Bonne chance",
        "Bien joué !",
        "Pas d'bol..",
        "Merci !",
        "@%*!&$£",
        "Haha !",
        "Prenez !",
        "Relancez !",
      ],
    };
  },
  mounted() {
    this.socket.on(`room_${this.id}`, (text) => {
      this.$store.commit("incrementChat", text);
    });
  },
  methods: {
    sendMsg: function (value) {
      this.disableButtonMsg = true;
      this.socket.emit(`chat`, {
        username: this.$store.state.username,
        value: value,
        room: this.id,
      });
      setTimeout(() => {
        this.disableButtonMsg = false;
      }, 2000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/main";
#chat {
  width: 80%;
  @include mobile-only {
    width: 100%;
  }
  .buttons {
    position: relative;
    margin: 20px auto 10px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
    .spinner {
      top: 35px;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 5px rgb(255, 0, 255) solid;
      border-top: 5px rgb(255, 68, 0) solid;
      border-right: 5px rgb(0, 255, 0) solid;
      border-bottom: 5px rgb(0, 0, 255) solid;
      animation: ease-in-out 2s loadingSpinner forwards;
    }
    .button {
      height: 25px;
      width: 30%;
      font-size: 0.6rem;
      margin-bottom: 10px;
    }
  }
  .box {
    @include desktop-tablet-only {
      font-size: 0.8rem;
    }
    @include mobile-only {
      border-left: none;
      border-right: none;
    }
    font-size: 0.7rem;
    margin: 0 auto 30px auto;
    border: #00a6ff 1px solid;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-width: 800px;
    height: 100px;
    overflow-y: auto;
    background-color: #00000095;
    white-space: pre-wrap;
    box-shadow: #41272782 2px 2px 10px;
  }
}

@keyframes loadingSpinner {
  0% {
    transform: rotate(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(5turn);
  }
}
</style>
