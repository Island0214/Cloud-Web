<template>
  <!--<div>-->
    <button class="nav-button-wrapper">{{ content }}</button>
  <!--</div>-->
</template>

<script>
  export default {
    props: ['content'],
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .nav-button-wrapper {
    position: relative;
    display: inline-block;
    color: #76B6C2;
    background-color: #ffffff00;
    border: 2px solid #76B6C2;
    border-radius: 4px;
    padding: 4px 10px 4px 10px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 20px;
    font-weight: 600;
    font-family: "Songti SC";
  }

  .nav-button-wrapper:hover {
    border-color: white;
  }
</style>
