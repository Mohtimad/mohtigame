<template>
  <div id="chat">
    <div class="buttons">
      <div v-if="disableButtonMsg" class="spinner"></div>
      <div v-if="this.emotesVisible" class="emotesBlock">
        <button
          :disabled="disableButtonMsg"
          class="button button__emote"
          v-for="(emote, index) in emotes"
          :key="emote"
          @click="this.sendMsg(index + 9)"
        >
          {{ emote }}
        </button>
      </div>
      <Button
        :disabled="disableButtonMsg"
        class="button button__emotes"
        text="Emojis 😉"
        @click="this.emotesVisible = this.emotesVisible ? false : true"
      />
      <Button
        :disabled="disableButtonMsg"
        class="button button__comment"
        v-for="(comment, index) in comments"
        :key="comment"
        :text="comment"
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
      emotesVisible: false,
      id: this.$route.params.id, //this is the id from the browser
      disableButtonMsg: false,
      comments: [
        "Bonjour !",
        "Bonne chance..",
        "Bien joué !",
        "Pas d'bol..",
        "Merci !",
        "Non...",
        "Ok !",
        "Prends !",
        "Relances !",
      ],
      emotes: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "🤣",
        "😂",
        "🙂",
        "🙃",
        "😉",
        "😊",
        "😇",
        "😍",
        "🤩",
        "😘",
        "😗",
        "☺",
        "😚",
        "😙",
        "😋",
        "😛",
        "😜",
        "🤪",
        "😝",
        "🤑",
        "🤗",
        "🤭",
        "🤫",
        "🤔",
        "🤐",
        "🤨",
        "😐",
        "😑",
        "😶",
        "😏",
        "😒",
        "🙄",
        "😬",
        "🤥",
        "😌",
        "😔",
        "😪",
        "🤤",
        "😴",
        "😷",
        "🤒",
        "🤕",
        "🤢",
        "🤮",
        "🤧",
        "😵",
        "🤯",
        "🤠",
        "😎",
        "🤓",
        "🧐",
        "😕",
        "😟",
        "🙁",
        "😮",
        "😯",
        "😲",
        "😳",
        "😦",
        "😧",
        "😨",
        "😰",
        "😥",
        "😢",
        "😭",
        "😱",
        "😖",
        "😣",
        "😞",
        "😓",
        "😩",
        "😫",
        "😤",
        "😡",
        "😠",
        "🤬",
        "👋",
        "🤚",
        "🖐",
        "✋",
        "🖖",
        "👌",
        "✌",
        "🤞",
        "🤟",
        "🤘",
        "🤙",
        "👈",
        "👉",
        "👆",
        "🖕",
        "👇",
        "☝",
        "👍",
        "👎",
        "✊",
        "👊",
        "🤛",
        "🤜",
        "👏",
        "🙌",
        "👐",
        "🤲",
        "🤝",
        "🙏",
        "🏆",
        "🧡",
        "⏳",
        "🎲",
        "🎁",
        "💰",
        "🎰",
        "🔞",
        "⛔",
        "🆗",
        "0️⃣",
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
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
      this.emotesVisible = false
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
  position: relative;
  width: 80%;
  @include mobile-only {
    width: 100%;
  }
  .emotesBlock {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    height: 200px;
    width: 90%;
    background-color: #000000d4;
    border: white 1px solid;
    border-bottom: none;
    border-radius: 10px 0 0 0;
    bottom: 100%;
    overflow-y: scroll;
    overflow-x: none;
    &::-webkit-scrollbar {
      width: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .buttons {
    position: relative;
    margin: 20px auto 10px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
    .spinner {
      top: 20px;
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border-top: 5px #ff4400 solid;
      border-right: 5px #00ff00 solid;
      border-bottom: 5px #0000ff solid;
      border-left: 5px #ff00ff solid;
      animation: ease-in-out 2s loadingSpinner forwards;
    }
    .button {
      height: 25px;
      font-size: 0.6rem;
      margin-bottom: 10px;
      width: 30%;
      &__emotes {
        width: 95%;
      }
      &__emote {
        background-color: #000000d6;
        color: white;
        width: 10%;
        margin: 0;
        border: none;
        font-size: 1rem;
        border: none;
        &:hover {
          text-decoration: none;
          border: none;
          cursor: pointer;
        }
      }
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
