<template>
  <div class="main">
    <div class="note-name">{{tempName}}</div>
    <div class="note-wrap">
      <div class="between-line-left">
      <div v-for="(item,index) in reciteTypeList" :key="index" :class="reciteType===item?'links-add-unit-button button-active':'links-add-unit-button'" @click="reciteTypeChange(item)">{{item}}</div>
      </div>
      <div class="between-line-right">
        <div v-for="(item,index) in themeList" :key="index" :class="theme===item?'links-add-unit-button button-active':'links-add-unit-button'" @click="themeChange(item)">{{item}}</div>
      </div>
    </div>
    <div class="note-wrap" v-if="issueList.length>0">
      <div v-for="(item,index) in issueList" :key="index" class="title-list" @click="linksHover(item)">{{item.title}}<span class="title-list-span">{{item.recallTimes}}</span></div>
    </div>
    <div class="note-wrap" style="color: #7393a7">
      <div>
        <div style="margin-bottom: 15px">
          {{tips}}
        </div>
        <div v-show="tips" style="display: flex">
          <div class="links-add-unit-button" @click="linksHoverOut">关闭</div>
          <div class="links-add-unit-button" @click="changeTime('now')">立刻</div>
          <div class="links-add-unit-button" @click="changeTime('next')">推迟</div>
          <div>下次复习时间：{{recallDate}}</div>
        </div>
      </div>
    </div>
    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  import {issueAllTheme,issueAllReciteType,issuesStats,issueEdit} from "../../api";
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {NavBottom},
    data() {
      return {
        theme:"",
        tips:"",
        reciteType:"中文语句",
        type:"recall",
        reciteTypeList:[],
        themeList:[],
        issueList:[],
        recallDate:'',
        activeIssue: null
      }
    },
    created() {

    },
    mounted(){
      this.getReciteTypes()
      this.getTheme()
      // this.getIssues()
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
      getIssues(){
        let data={};
        data.type=this.type;
        data.reciteType=this.reciteType
        data.theme=this.theme
        issuesStats(data).then(res=>{
          this.issueList=res.data.list;
        })
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
          this.getIssues()
        }
      },
      linksHover(item) {
        this.activeIssue = item;
        this.tips = item.tips||item.title;
        this.recallDate=this.$moment(item.recallDate).format('YYYY-MM-DD HH:mm:ss')
      },
      linksHoverOut() {
        this.activeIssue=null;
        this.tips = ""
        this.recallDate=""
      },
      changeTime(type){
        console.log(type)
        if(this.activeIssue){
          let item = this.activeIssue;
          if (type==='now'){
            item.recallDate = this.$moment().valueOf()
            item.recall = 'none'
          } else if (type==='next'){
            let time = item.recallDate
            item.recallDate = this.$moment(time).add(1, 'months').valueOf()
          }
          this.editItem(item)
        }

      },
      editItem(item){
        item.id=item._id
        issueEdit(item).then(res=>{
          this.recallDate=this.$moment(item.recallDate).format('YYYY-MM-DD HH:mm:ss')
          this.$message({
            message: '修改成功',
            type: 'success',
            duration:800
          });
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    text-align: center;
    /*padding-top: 80px;*/
  }

  .note-main {
    display: flex;
    flex-wrap: wrap;
  }

  .note-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .note-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    /*justify-content: space-between;*/
    align-items: start;
    flex-wrap: wrap;
    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
    max-height: 200px;
    overflow: scroll;
  }

  .note-wrap .between-line-left,.note-wrap .between-line-right{
    display: flex;
    justify-content: flex-start;
    align-items: start;
    flex-wrap: wrap;
  }
  .note-wrap .between-line-left{
    width: 280px;
    margin-right: 20px;
  }
  .note-wrap .between-line-right{
    flex: 1;
  }


.upload-main{
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
  .links-add-unit-button{
    border-radius: 5px;
    border: 2px solid #7393a7;
    background: transparent;
    color: #7393a7;
    margin-right: 15px;
    font-size: 15px;
    padding: 2px 5px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .button-active{
    border: 2px solid transparent;
    background: #7393a7;
    color: white;

    /*color: white;*/
  }
  .title-list{
    color: #7393a7;
    margin:5px 10px;
    cursor: pointer;
  }
  .title-list-span{
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    margin-left: 5px;
    /*visibility: hidden;*/
  }
  .title-list:hover .title-list-span{
    color: rgba(255,255,255,1);
    /*visibility: visible;*/
  }
</style>
