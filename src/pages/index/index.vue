<template>
  <div class="hello">
    <div></div>
  </div>
</template>

<script>
  import {test} from "../../api";

  export default {
    name: 'Index',
    data() {
      return {

      }
    },
    created() {
      if(window.localStorage.token){
        this.$router.push('main')
      } else {
        this.$router.push('login')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }



</style>
