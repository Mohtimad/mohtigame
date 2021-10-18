<template>
  <button class="button">
    {{ this.text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
  },
};
</script>

<style lang="scss">
.button {
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 5px;
  font-size: 1rem;
  cursor: pointer;
  background-color: unset;
  border: white 1px solid;
  color: white;
  &:hover {
    transform: scale(1.02);
    color: orange;
    border: orange 1px solid;
    text-decoration: underline;
  }
  &:disabled {
    color: #b5b5b5;
    border-color: #b5b5b5;
    cursor: auto;
    &:hover {
      text-decoration: unset;
      transform: scale(1);
    }
  }
}
</style>