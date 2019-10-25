<template>
  <div class="main">
      <div v-for="(item,index) in list" :key="index">
        <div class="action-button">
          <div>听</div>
          <div>看题目</div>
          <div>答案</div>
        </div>
        <!--<div class="test">123</div>-->

        <!--<div @click="seeAnswer(item.id)">{{item.title}}</div>-->
        <!--<div v-show="item.see">{{item.answer}}</div>-->
        <!--<div v-show="checkRight(item.answer)">yes</div>-->
      </div>
      <input v-model="str"/>

  </div>
</template>

<script>
  import {dataArr} from "./data"
  export default {
    name: 'Main',
    components: {},
    data() {
      return {
        list:[],
        str:""
      }
    },
    created() {
      this.list=dataArr
      // console.log(dataArr)
    },
    methods: {
      checkRight(str){
        return str===this.str
      },
      seeAnswer(id){
        this.list=this.list.map(item=>{
          if(item.id===id){
            item.see=!item.see;
          }
          return item
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .test{
    /*background: white;*/
    /*color: transparent;*/
  }
  .main {
    text-align: center;
    padding-top: 80px;
  }
  .action-button{
    margin: 0 auto;
    width: 200px;
    display: flex;
    justify-content: space-between;
  }

</style>
