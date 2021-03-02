<template>
  <div class="main">

    <div class="links-wrap">
      <div class="links-add-unit">
        <div class="links-add-unit-label">标题</div>
        <input class="links-add-unit-input" v-model="title"/>
      </div>
      <div class="links-add-unit">
        <div class="links-add-unit-label">提示</div>
        <textarea class="links-add-unit-input" v-model="tips"/>
      </div>

      <div class="links-add-unit">
        <div class="links-add-unit-label">主题</div>
        <input class="links-add-unit-input" v-model="theme"/>
      </div>
      <div class="links-add-unit">
        <div class="links-add-unit-label">背诵类型</div>
        <input class="links-add-unit-input" v-model="reciteType"/>
      </div>
      <div class="links-add-unit">
        <div class="links-add-unit-label">类型</div>
        <div class="links-add-unit-button-wrap">
          <div :class="type==='recall'?'links-add-unit-button button-active':'links-add-unit-button'" @click="typeChange('recall')">记忆</div>
          <div :class="type==='daily'?'links-add-unit-button button-active':'links-add-unit-button'" @click="typeChange('daily')">日常</div>
          <div :class="type==='prior'?'links-add-unit-button button-active':'links-add-unit-button'" @click="typeChange('prior')">优先</div>
        </div>
      </div>
      <div class="links-add-unit" v-show="type==='daily'">
        <div class="links-add-unit-label">周期</div>
        <div class="links-add-unit-button-wrap">
          <div :class="recall==='day'?'links-add-unit-button button-active':'links-add-unit-button'" @click="recallInputClick('day')">日</div>
          <div :class="recall==='week'?'links-add-unit-button button-active':'links-add-unit-button'" @click="recallInputClick('week')">周</div>
          <div :class="recall==='month'?'links-add-unit-button button-active':'links-add-unit-button'" @click="recallInputClick('month')">月</div>
        </div>
      </div>
      <div class="links-add-button">
        <div class="links-add-button-unit" @click="submit">提交</div>
      </div>
    </div>
    <div class="links-wrap-recite">
      <div :class="moreInput?'links-add-unit-button button-active':'links-add-unit-button'" @click="moreInputChange">继续新增</div>
      <div v-for="(item,index) in reciteTypeList" :key="index" :class="reciteType===item?'links-add-unit-button button-active':'links-add-unit-button'" @click="reciteTypeChange(item)">{{item}}</div>
      <div v-show="themeList.length>0" class="themeHr"></div>
      <div v-for="(item,index) in themeList" :key="index" :class="theme===item?'links-add-unit-button button-active':'links-add-unit-button'" @click="themeChange(item)">{{item}}</div>
    </div>
    <NavBottom/>
  </div>
</template>

<script>
  import {issueAllReciteType, issueAdd,issueAllTheme} from "../../api";
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {NavBottom},
    data() {
      return {
        title:"",
        tips:"",
        theme:"",
        reciteType:"none",
          type:"recall",
        moreInput:false,
        reciteTypeList:[],
        themeList:[],
        recall: "day",
        clickFlag: true,
      }
    },
    created() {

    },
    mounted(){
      this.getReciteTypes()
      this.getTheme()
    },
    methods: {
      getReciteTypes(){
        let data={};
        data.type=this.type;
        issueAllReciteType(data).then(res=>{
         this.reciteTypeList=res.data;
        });
      },
      getTheme(){
        let data={};
        data.type=this.type;
        data.reciteType=this.reciteType
        issueAllTheme(data).then(res=>{
          this.themeList=res.data;
        })
      },
      moreInputChange(){
        this.moreInput=!this.moreInput;
      },
      typeChange(type){
        if(type!==this.type){
          this.type=type;
        }
      },
      recallInputClick(type){
        if(type!==this.recall){
          this.recall=type;
        }
      },
      reciteTypeChange(type){
        if(type!==this.reciteType){
          this.reciteType=type;
          this.theme=""
          this.getTheme()
        }
      },
      themeChange(type){
        if(type!==this.theme){
          this.theme=type;
        }
      },
      getNewInfo(){
        if(this.reciteTypeList.indexOf(this.reciteType)===-1){
          this.getReciteTypes()
        }
        if(this.themeList.indexOf(this.theme)===-1){
          this.getTheme()
        }
      },
      inputData() {
        let data = {};
        data.title = this.title;
        data.theme = this.theme;
        data.type = this.type;
        data.reciteType=this.reciteType;
        if (this.tips) {
          data.tips = this.tips;
        }
        if (this.type === "daily") {
          data.recall = this.recall
        } else {
          data.recall = "none"
        }
        return data
      },
      reset() {
        this.title="";
        this.tips="";
      },
      resetAll() {
        this.title="";
        this.tips="";
        this.theme="";
        this.type="recall";
        this.recall="day";
        this.reciteType="none";
      },
      submit(){
        if (this.clickFlag) {
            this.clickFlag=false;
            let data = this.inputData();
            issueAdd(data).then(res => {
              this.clickFlag=true;
              if(!res.error){
                this.getNewInfo();
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  duration:800
                });
                if (this.moreInput) {
                  this.reset()
                } else {
                  this.resetAll()
                }
              }

            })
        } else {
          // Toast.info("请不要重复点击",1)
        }

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



  .links-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }



  .links-wrap-unit-logo-img img {
    width: 35px;
    height: 35px;
    /*border-radius: 50%;*/
  }

  .links-wrap-unit a {
    text-decoration: none;
    color: black;
  }
  .links-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .links-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .links-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
    width: 500px;
  }
  .links-add-unit-button-wrap{
    display: flex;
  }
  .links-add-unit-button{
    border-radius: 5px;
    border: 2px solid #ffffff;
    background: transparent;
    color: white;
    margin-right: 15px;
    font-size: 15px;
    padding: 2px 5px;
    cursor: pointer;
  }
  .button-active{
    border: 2px solid transparent;
    background: #7393a7;

    /*color: white;*/
  }
  .links-add-button{
    margin: 0 auto;
    width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .links-add-button-unit{
    cursor: pointer;
    margin: 20px 20px;
    background: #7393a7;
    color: white;
    padding: 10px;
    border-radius: 10px;
  }
  .links-wrap-recite{
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: start;
    flex-wrap: wrap;
    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }
  .links-wrap-recite .links-add-unit-button{
    margin-bottom: 10px;
  }
.themeHr{
  width: 100%;
  height: 2px;
  background: white;
  margin-bottom: 15px;
}
</style>
