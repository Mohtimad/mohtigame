<template>
  <div id="chat">{{ updateChat }}</div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    content: String,
  },
  computed: {
    updateChat: function () {
      return this.content
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#chat {
  border: #00a6ff 1px solid;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  height: 100px;
  overflow-y: auto;
  background-color: #00000095;
  white-space:pre-wrap;
  box-shadow: #ffffff82 2px 2px 10px;
}
</style>
