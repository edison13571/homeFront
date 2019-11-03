<template>
  <div class="main">
    <div class="recite-wrap-top">
      <div class="recite-wrap-top-unit" @click="changeShow">题案交换</div>
      <div class="recite-wrap-top-unit">全部({{allAverage}})</div>
      <div v-for="(item,index) in reciteList" :key="index" @click="changeReciteType(item)" class="recite-wrap-top-unit">{{item}}{{reciteType===item?"("+subAverage+")":""}}</div>
      <div class="recite-wrap-top-unit" @click="changeNav">{{nav?"关闭":"打开"}}导航</div>
    </div>
    <div class="recite-name">{{titleTips?info.title:info.tips}}</div>
    <div class="recite-wrap">
      <div class="recite-tabs">
        <div :class="type==='issue'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('issue')">题目</div>
        <div :class="type==='tips20'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('tips20')">提示20%</div>
        <div :class="type==='tips50'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('tips50')">提示50%</div>
      </div>
      <div v-if="type==='issue'" class="recite-main">
<!--        <div class="recite-main-title">{{titleTips?info.title:info.tips}}</div>-->
      </div>
      <div v-if="type==='tips20'" class="recite-main">
        <div class="recite-main-detail">{{showInfo(20)}}</div>
      </div>
      <div v-if="type==='tips50'" class="recite-main">
        <div class="recite-main-detail">{{showInfo(50)}}</div>
      </div>
    </div>
    <div class="search-area">
      <input class="search-input" placeholder="输入答案" v-model="answer" v-on:keyup="checkAnswer"/>
      <div class="search-button" @click="getIssue">跳过</div>
      <div v-if="answerRight" class="search-button"  @click="getRight">下一题</div>
      <div v-else class="search-button" ></div>
    </div>
    <div v-show="answerRight" class="recite-name">{{titleTips?info.tips:info.title}}</div>
    <!--以上是链接部分-->
    <NavBottom v-show="nav"/>
  </div>
</template>

<script>
  import {countByReciteType,queryByReciteType,reciteAdd} from "../../api";
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {NavBottom},
    data() {
      return {
        answer: "",
        type: "issue",
        reciteList:["英文短语"],
        reciteType:"英文短语",
        allAverage:0,
        subAverage:0,
        nav:false,
        info:{},
        titleTips:false,
        answerRight:false

      }
    },
    created() {
      this.getAllAverage()
    },
    methods: {
      getRight(){
        reciteAdd({id:this.info._id}).then(()=>{
          this.answer="";
          this.getAllAverage()
        })
      },
      getAllAverage(){
        countByReciteType().then(res=>{
          this.allAverage=res.data.average;
        });
        countByReciteType({reciteType:this.reciteType}).then(res=>{
          this.subAverage=res.data.average;
        });
        this.getIssue()
      },
      getIssue(){
        queryByReciteType({reciteType:this.reciteType}).then(res=>{
          this.info=res.data.unit;
          this.answerRight=false
        })
      },
      changeReciteType(type){
        this.reciteType=type
      },
      changeNav(){
        this.nav=!this.nav;
      },changeShow(){
        this.titleTips=!this.titleTips;
      },
      typeChange(type) {
        if (type !== this.type) {
          this.type = type;
        }
      },
      showInfo(number){
        let init=this.titleTips?this.info.tips:this.info.title;
        init=init?init:""
        let str="";
        let index=0;
        for (let i = 0; i < init.length; i++) {
          if(init[i]===" "){
            str+=" "
          }else {
            str+=index%parseInt(Math.floor(100/number))===0?init[i]:"_";
            index++
          }
        }
        return str
      },
      checkAnswer(){
        let answer=this.answer;
        let test=this.titleTips?this.info.tips:this.info.title;
        function strHandle(str){
          function shouldOut(unit){
            let reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
            let reg2= /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/;
           return unit===" "||reg.test(unit)||reg2.test(unit)
          }
          let res="";
          for (let i = 0; i < str.length; i++) {
            if(!shouldOut(str[i])){
              res+=str[i]
            }
          }
          return res;
        }
        this.answerRight=strHandle(answer)===strHandle(test)
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    text-align: center;
    padding-top: 80px;
  }
  .recite-main-title{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .recite-wrap-top{
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: center;
    align-items: start;
    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }
  .recite-wrap-top-unit{
    margin: 0 10px;
    color: #b5cfd8;
    cursor: pointer;
    text-decoration: none;
  }

  .recite-tabs {
    padding-top: 30px;
    margin-right: 20px;
    width: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: right;
  }

  .recite-tabs-unit {
    margin-bottom: 20px;
    color: white;
    cursor: pointer;
  }

  .recite-tabs-unit-active {
    margin-bottom: 20px;
    color: #7393a7;
    cursor: pointer;
  }

  .recite-main {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .recite-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .recite-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }



  .recite-wrap-unit a {
    text-decoration: none;
    color: black;
  }

  .search-area {
    display: flex;
    width: 600px;
    margin: 0 auto 10px auto;
    justify-content: space-between;
    align-items: center;
  }

  .search-input {
    flex: 1;
    margin: 20px;
    height: 30px;
    background: white;
    padding: 0 20px;
    border-radius: 5px;
  }

  .search-button {
    cursor: pointer;
    margin-right: 10px;
  }

</style>
