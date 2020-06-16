<template>
  <div class="main">
    <!--<div class="search-area">-->
      <!--<input class="search-input" :placeholder="local?'搜索主题':'搜索名称'" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>-->
      <!--<div class="search-button" @click="searchBaidu">搜索</div>-->
      <!--<div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">主题</div>-->
    <!--</div>-->
    <div class="habits-name">{{tempName}}</div>
    <div class="habits-wrap">
      <div class="habits-tabs">
        <div :class="state===2?'habits-tabs-unit-active':'habits-tabs-unit'" @click="typeChange(2)">养成中</div>
        <div :class="state===1?'habits-tabs-unit-active':'habits-tabs-unit'" @click="typeChange(1)">未激活</div>
        <div :class="habitsAddShow?'habits-tabs-unit-active':'habits-tabs-unit'" @click="tapLink">新增</div>
        <div :class="edit?'habits-tabs-unit-active':'habits-tabs-unit'" @click="changeState">{{edit?'关闭':'编辑'}}</div>
      </div>
      <div class="habits-main">
        <div class="habits-wrap-unit" v-for="(item,index) in urls" :key="index" @click="habitsClick(item)"
             @mouseover="habitsHover(item)" @mouseout="habitsHoverOut">
          <div class="habits-wrap-unit-logo">{{item.title.charAt(0)}}</div>
        </div>
      </div>
    </div>
    <habitsAdd v-if="habitsAddShow" @close="tapLink" @finish="gethabits"/>
    <habitsEdit v-if="habitsEditShow" @close="tapLinkEdit" @finish="gethabits" :info="habitsEditItem"/>
    <el-dialog
      title="添加记录"
      :visible.sync="recordsShow"
      width="50%">
      <div>
        <div class="habits-add-unit">
          <div class="habits-add-unit-label">数量（分钟）</div>
          <input type="number" class="habits-add-unit-input" v-model="finish"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
  </span>
    </el-dialog>
    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  import {practiceList,practiceAddRecord} from "../../api";
  import habitsAdd from "./habitsAdd"
  import habitsEdit from "./habitsEdit"
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {habitsAdd, habitsEdit,NavBottom},
    data() {
      return {
        urls: [],
        habitsAddShow: false,
        habitsEditShow: false,
        recordsShow:false,
        habitsEditItem: {},
        searchInfo: "",
        tempName: "",
        state: 2,
        edit: false,
        local: false,
        stats:false,
        finishDate:new Date().valueOf(),
        finish:0,
        pickerOptions: {
          disabledDate(time){
            return time.getTime()>Date.now()
          }
        },
      }
    },
    created() {
      this.gethabits()
    },
    methods: {
      searchLocal() {
        this.local = !this.local
      },
      changeState() {
        this.edit = !this.edit;
        this.stats=false;
      },
      typeChange(state) {
        if (state !== this.state) {
          this.state = state;
          this.gethabits()
        }
      },
      searchhabitsByTheme() {
        let data = {};
        data.size = 100;
        data.theme = this.searchInfo;
        practiceList(data).then(res => {
          this.urls = res.data.list
        })
      },
      searchhabits() {
        let data = {};
        data.size = 100;
        data.search = this.searchInfo;
        practiceList(data).then(res => {
          this.urls = res.data.list
        })
      },
      gethabits() {
        if (this.local) {
          this.searchhabits()
        } else {
          let data = {};
          data.size = 40;
          data.state=this.state;
          practiceList(data).then(res => {
            this.urls = res.data.list
          })
        }

      },
      habitsClick: function (item) {
        this.habitsEditItem = item;
        if(this.edit){
          this.habitsEditShow = true;
        } else if(this.stats){
          this.statsShow = true;
        }else{
          this.recordsShow = true;
        }

      },
      addSubmit(){
        if(this.finish<=0){
          this.$message({message:"数量不能为0",duration:800});
          return;
        }
        let data={};
        data.id=this.habitsEditItem._id;
        data.finish= this.finish;
        data.finishDate=this.finishDate;
        practiceAddRecord(data).then(res=>{
          this.gethabits();
          this.cancelSubmit();
        })
      },
      cancelSubmit(){
        this.habitsEditItem = {};
        this.finishDate =new Date().valueOf();
        this.finish = 0;
        this.recordsShow = false;
      },
      habitsHover(item) {
        let str=item.title;
        str+="／已练习："+item.schedule;
        str+='分钟';
        this.tempName = str;
      },
      habitsHoverOut() {
        this.tempName = ""
      },
      tapLink() {
        this.habitsAddShow = !this.habitsAddShow;
      },
      tapLinkEdit() {
        this.habitsEditShow = false;
        this.statsShow = false;
        this.habitsEditItem = {}
      },
      searchBaidu() {
        if (!this.local) {
          this.searchhabits()
        } else {
          this.searchhabitsByTheme()
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

  .habits-tabs {
    padding-top: 30px;
    margin-right: 20px;
    width: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: right;
  }

  .habits-tabs-unit {
    margin-bottom: 20px;
    color: white;
    cursor: pointer;
  }

  .habits-tabs-unit-active {
    margin-bottom: 20px;
    color: #7393a7;
    cursor: pointer;
  }

  .habits-main {
    display: flex;
    flex-wrap: wrap;
  }

  .habits-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .habits-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }

  .habits-wrap-unit {
    cursor: pointer;
    flex: 10%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }

  .habits-wrap-unit-logo {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #7393a7;
    color: white;
    font-size: 20px;
    overflow: hidden;
  }


  .habits-wrap-unit a {
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
  }

  .search-button-local {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.2);
    margin-left: 10px;
  }

  .search-button-local-active {
    cursor: pointer;
    color: black;
    margin-left: 10px;
  }

  .habits-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .habits-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .habits-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #b5cfd8;
    width: 300px;
  }
</style>
