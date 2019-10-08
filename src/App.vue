<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    background: #b5cfd8;

  }
  *{
    box-sizing: border-box;
  }
  input{
    border: 0;
    outline: none;
    background: transparent;
  }
</style>
