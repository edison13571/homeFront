<template>
  <div class="main">
    <div class="search-area">
      <input class="search-input" :placeholder="local?'搜索主题':'搜索名称'" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>
      <div class="search-button" @click="searchBaidu">搜索</div>
      <div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">主题</div>
    </div>
    <div class="tickets-name">{{tempName?"《"+tempName+"》":""}}</div>
    <div class="tickets-wrap">
      <div class="tickets-tabs">
        <div :class="type==='电影'?'tickets-tabs-unit-active':'tickets-tabs-unit'" @click="typeChange('电影')">电影</div>
        <div :class="type==='电视'?'tickets-tabs-unit-active':'tickets-tabs-unit'" @click="typeChange('电视')">电视</div>
        <div :class="type==='其他'?'tickets-tabs-unit-active':'tickets-tabs-unit'" @click="typeChange('其他')">其他</div>
        <div :class="ticketsAddShow?'tickets-tabs-unit-active':'tickets-tabs-unit'" @click="tapLink">新增</div>
        <div :class="edit?'tickets-tabs-unit-active':'tickets-tabs-unit'" @click="changeState">{{edit?'关闭':'编辑'}}</div>
        <div :class="addRecord?'tickets-tabs-unit-active':'tickets-tabs-unit'" @click="changeStateRecord">记录</div>
      </div>
      <div class="tickets-main">
        <div class="tickets-wrap-unit" v-for="(item,index) in urls" :key="index" @click="ticketsClick(item)"
             @mouseover="ticketsHover(item)" @mouseout="ticketsHoverOut">
          <div class="tickets-wrap-unit-logo">{{item.name.charAt(0)}}</div>
        </div>
      </div>
    </div>
    <ticketsAdd v-if="ticketsAddShow" @close="tapLink" @finish="gettickets"/>
    <ticketsEdit v-if="ticketsEditShow" @close="tapLinkEdit" @finish="gettickets" :info="ticketsEditItem"/>
    <ticketsRecord v-if="ticketsRecordShow" @close="tapLinkEdit" @finish="gettickets" :info="ticketsEditItem"/>
    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  import {ticketsList} from "../../api";
  import ticketsAdd from "./ticketsAdd"
  import ticketsEdit from "./ticketsEdit"
  import ticketsRecord from "./ticketsRecord"
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {ticketsAdd, ticketsEdit,ticketsRecord,NavBottom},
    data() {
      return {
        urls: [],
        ticketsAddShow: false,
        ticketsEditShow: false,
        ticketsRecordShow: false,
        ticketsEditItem: {},
        searchInfo: "",
        tempName: "",
        type: "电影",
        edit: false,
        addRecord: false,
        local: false
      }
    },
    created() {
      this.gettickets()
    },
    methods: {
      searchLocal() {
        this.local = !this.local
      },
      changeState() {
        this.edit = !this.edit
      },
      changeStateRecord(){
        this.addRecord=!this.addRecord;
      },
      typeChange(type) {
        if (type !== this.type) {
          this.type = type;
          this.gettickets()
        }
      },
      searchticketsByTheme() {
        let data = {};
        data.size = 100;
        data.theme = this.searchInfo;
        ticketsList(data).then(res => {
          this.urls = res.data.list
        })
      },
      searchtickets() {
        let data = {};
        data.size = 100;
        data.search = this.searchInfo;
        ticketsList(data).then(res => {
          this.urls = res.data.list
        })
      },
      gettickets() {
        if (this.local) {
          this.searchtickets()
        } else {
          let data = {};
          data.size = 40;
          data.type = this.type;
          ticketsList(data).then(res => {
            this.urls = res.data.list
          })
        }

      },
      ticketsClick: function (item) {
        if(this.edit){
          this.ticketsEditShow = true;
          this.ticketsEditItem = item;
        } else if(this.addRecord){
          this.ticketsRecordShow = true;
          this.ticketsEditItem = item;
        } else {
          if(item.url&&item.url!=="none"){
            window.open(item.url)
          }
        }

      },
      ticketsHover(item) {
        this.tempName = item.name;
      },
      ticketsHoverOut() {
        this.tempName = ""
      },
      tapLink() {
        this.ticketsAddShow = !this.ticketsAddShow;
      },
      tapLinkEdit() {
        this.ticketsEditShow = false;
        this.ticketsRecordShow = false;
        this.ticketsEditItem = {}
      },
      searchBaidu() {
        if (!this.local) {
          this.searchtickets()
        } else {
          this.searchticketsByTheme()
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

  .tickets-tabs {
    padding-top: 30px;
    margin-right: 20px;
    width: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: right;
  }

  .tickets-tabs-unit {
    margin-bottom: 20px;
    color: white;
    cursor: pointer;
  }

  .tickets-tabs-unit-active {
    margin-bottom: 20px;
    color: #7393a7;
    cursor: pointer;
  }

  .tickets-main {
    display: flex;
    flex-wrap: wrap;
  }

  .tickets-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .tickets-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }

  .tickets-wrap-unit {
    cursor: pointer;
    flex: 10%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }

  .tickets-wrap-unit-logo {
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


  .tickets-wrap-unit a {
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
</style>
