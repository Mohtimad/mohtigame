<template>
  <footer class="footer">
    <p>
      © Mohtigame 2021 -
      <a class="contact" href="#">Contact</a> 
      <a class="linkedin" target="blank" href="https://www.linkedin.com/in/dthomas00/"
        >LinkedIn</a
      >
    </p>
  </footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: center;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 40px;
  background-color: black;
  box-shadow: black -5px 0 15px;
  color: white;
  font-size: 0.7rem;
  a {
    text-decoration: none;
    padding: 2px 4px;
    border-radius: 3px;
    margin: 0 2px;
    &:hover {
      text-decoration: underline;
    }
  }
  .linkedin {
    color: white ;
    background-color: #0a66c2;
  }
  .contact {
    color: black;
    background-color: orange;
  }
}
</style>