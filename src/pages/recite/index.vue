<template>
  <div class="main">
    <div class="recite-wrap-top">
      <div class="recite-wrap-top-unit" @click="changeShow">题案交换</div>
      <div class="recite-wrap-top-unit" @click="changeThemeShow">主题检索</div>
      <div class="recite-wrap-top-unit" @click="changeInputType">输入框</div>
      <div class="recite-wrap-top-unit">全部({{allAverage}})</div>
      <div v-for="(item,index) in reciteList" :key="index" @click="changeReciteType(item)" class="recite-wrap-top-unit">{{item}}{{reciteType===item?"("+subAverage+")":""}}</div>
      <div class="recite-wrap-top-unit" @click="changeNav">{{nav?"关闭":"打开"}}导航</div>
    </div>
    <div class="recite-name"><span>{{info.theme}}</span>{{titleTips?info.title:info.tips}}</div>
    <div class="recite-wrap">
      <div class="recite-tabs">
        <div :class="type==='issue'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('issue')">默认</div>
        <div :class="type==='tips20'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('tips20')">提示20%</div>
        <div :class="type==='tips50'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('tips50')">提示50%</div>
        <div :class="type==='tips100'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('tips100')">全部</div>
        <!--<div :class="type==='voice'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('voice')">语音</div>-->
      </div>
      <div  class="recite-main">
        <div class="recite-main-detail" v-if="type==='issue'">
          {{showInfoByTimes()}}
        </div>
        <div class="recite-main-detail" v-if="type==='tips20'">{{showInfo(20)}}</div>
        <div class="recite-main-detail" v-if="type==='tips50'">{{showInfo(50)}}</div>
        <div class="recite-main-detail" v-if="type==='tips100'">{{showInfo(100)}}</div>
          <audio :src="audio" controls id="main-audio"></audio>
          <div class="recite-main-detail-spd">
            <div class="recite-main-detail-spd-label">速度</div>
            <input type="number" min="0" max="15" v-model="spd"/>
            <div class="recite-main-detail-spd-button" @click="getVoice">确定</div>
          </div>
      </div>

    </div>
    <div class="search-area">
      <input v-if="inputType==='input'" class="search-input" placeholder="输入答案" v-model="answer" v-on:keyup="checkAnswer"/>
      <textarea v-else class="search-input-textarea" placeholder="输入答案" v-model="answer" v-on:keyup="checkAnswer"/>
      <div class="search-button" @click="getIssue">跳过</div>
      <div v-if="answerRight" class="search-button"  @click="getRight">下一题</div>
      <div v-else class="search-button" ></div>
    </div>
    <div class="search-area"  v-show="themeShow">
      <input class="search-input" placeholder="主题检索" v-model="searchTheme"/>
    </div>
    <div v-show="answerRight" class="recite-name">{{titleTips?info.tips:info.title}}</div>
    <!--以上是链接部分-->
    <NavBottom v-show="nav"/>
  </div>
</template>

<script>
  import {countByReciteType,queryByReciteType,reciteAdd,vioceGet,youdaoVoice,baseURL,issueAllReciteType} from "../../api";
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {NavBottom},
    data() {
      return {
        answer: "",
        type: "issue",
        reciteList:["英文短语","英文单词","中文语句","名词中文解释","数字","日文单词","日语五十音"],
        reciteType:"英文短语",
        searchTheme:'',
        allAverage:0,
        subAverage:0,
        nav:false,
        info:{},
        titleTips:false,
        answerRight:false,
        audio:"",
        spd:4,
        cache:[],
        themeShow:false,
        inputType: 'input'
      }
    },
    created() {
      this.getAllAverage();
      this.getReciteType()

    },
    mounted:function () {
      document.onkeydown  =cdk.bind(this);
      let self = this;
      function cdk() {
        let e1 =  event || window.event || arguments.callee.caller.arguments[0]
        let ctrlKey = e1.ctrlKey ;
        if(e1.keyCode===37){
          self.playAudio()
        } else if(e1.keyCode===39){
          if (self.answerRight || ctrlKey ) {
            // console.log(6)
            self.getRight()
          }
        } else if(e1.keyCode===38){
          self.changeShow()
        }else if(e1.keyCode===40){
          self.getIssue()
        }
      }
    },
    methods: {
      changeInputType() {
        this.inputType = this.inputType==='input'?'textarea':'input'
      },
      changeThemeShow(){
        this.themeShow=!this.themeShow
      },
      playAudio(){
        let player = document.getElementById('main-audio')
        player.play()
      },
      getReciteType(){
        issueAllReciteType({type:"recall"}).then(res=>{
          let arr=res.data;
          arr=arr.filter(item=>item!=="none")
          this.reciteList=arr
        })
      },
      getRight(){
        reciteAdd({id:this.info._id}).then(()=>{
          this.answer="";
          this.type="issue";
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
        let data = {};
        data.reciteType = this.reciteType;
        if (this.searchTheme) {
          data.theme =this.searchTheme
        }

        // console.log(data)
        queryByReciteType(data).then(res=>{
          this.info=res.data.unit?res.data.unit:{};
          this.answerRight=false;
          this.type="issue";
          this.getVoice()
        })
      },
      getVoice(){
        let text=this.titleTips?this.info.tips:this.info.title;
        let arr=this.cache;
        arr=arr.filter(item=>item.text===text);
        if(arr.length>0){
          this.audio=arr[0].audio;
        } else {
          let flag=!this.titleTips&&(this.reciteType.indexOf("日语")>-1||this.reciteType.indexOf("日文")>-1)
          if(flag){
            this.getVoiceYouDao(text)
          }else {
            this.getVoiceBaidu(text)
          }

        }
      },
      getVoiceYouDao(text){
        youdaoVoice({text:text,langType:"ja"}).then(res=>{
          let location=baseURL+res.data;
          this.audio=location;
          this.cache.push({text:text,audio:location})
        })
      },
      getVoiceBaidu(text){
        vioceGet({tex:text,spd:this.spd}).then(res=>{
          this.audio=res;
          this.cache.push({text:text,audio:res})
        })
      },
      changeReciteType(type){
        this.reciteType=type;
        this.getAllAverage()
      },
      changeNav(){
        this.nav=!this.nav;
      },changeShow(){
        this.titleTips=!this.titleTips;
        this.getVoice()
      },
      typeChange(type) {
        if (type !== this.type) {
          this.type = type;
        }
      },
      showInfo(number){
        let init=this.titleTips?this.info.tips:this.info.title;
        init=init?init:"";
        let str="";
        let index=0;
        if(init.length<2){
          return ""
        }
        for (let i = 0; i < init.length; i++) {
          if(this.shouldOut(init[i])){
            str+=init[i]
          }else {
            str+=index%parseInt(Math.floor(100/number))===0?init[i]:"_";
            index++
          }
        }
        return str
      },
      showInfoByTimes(){
        let times=this.info.finishTimes;
        let init=this.titleTips?this.info.tips:this.info.title;
        if(times<2){
          return init;
        } else if(times<6){
          return this.showInfo(50)
        } else if(times<9){
          return this.showInfo(20)
        }
        return ""

      },
      shouldOut(unit){
        let reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        let reg2= /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/;
        return unit===" "||reg.test(unit)||reg2.test(unit)
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
          res = res.replace(/^\s*|\s*$/g,"")
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
    flex-wrap: wrap;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .recite-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }
  .recite-name span{
    color:rgba(255,255,255,0.45);
    margin-right: 30px;
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

  .search-input-textarea{
    flex: 1;
    margin: 20px;
    height: 100px;
    background: white;
    padding: 10px 20px;
    border-radius: 5px;
  }
  .search-button {
    cursor: pointer;
    margin-right: 10px;
  }
  .recite-main-detail{
    margin-bottom: 30px;
  }

  audio{
    outline: none;
    margin-bottom: 10px;
  }
  .recite-main-detail-spd{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b5cfd8;
    font-size: 16px;

  }
  .recite-main-detail-spd input{
    width: 40px;
    font-size: 16px;
    text-align: center;
    color: #b5cfd8;
  }
  .recite-main-detail-spd-button{
    cursor: pointer;
  }
</style>
