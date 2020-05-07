<template>
  <div class="nav-wrap">
    <router-link to="main" class="nav-wrap-unit">桌面</router-link>
    <router-link to="articles" class="nav-wrap-unit">文章</router-link>
    <router-link to="note" class="nav-wrap-unit">便签</router-link>
    <router-link to="habits" class="nav-wrap-unit">习惯</router-link>
    <router-link to="recite" class="nav-wrap-unit">背诵</router-link>
    <router-link to="ticket" class="nav-wrap-unit">票根</router-link>
    <router-link to="book" class="nav-wrap-unit">书柜</router-link>
    <router-link to="memoryDate" class="nav-wrap-unit">纪念</router-link>
    <router-link to="issueAddPage" class="nav-wrap-unit">填鸭</router-link>
    <router-link to="stats" class="nav-wrap-unit">统计</router-link>
    <router-link to="upload" class="nav-wrap-unit">上传</router-link>
  </div>
</template>

<script>
  export default {
    name: 'NavBottom',
    data() {
      return {
          tabs:["main","ticket"]
      }
    },
    created() {
    },
    methods:{

    }
  }
</script>

<style scoped>
  .nav-wrap{
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: center;
    align-items: start;
    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }
  .nav-wrap-unit{
    margin: 0 10px;
    color: #b5cfd8;
    cursor: pointer;
    text-decoration: none;
  }
</style>
