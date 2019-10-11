<template>
  <div class="main">
    <div class="search-area">
      <input class="search-input" :placeholder="local?'搜索主题':'搜索名称'" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>
      <div class="search-button" @click="searchBaidu">搜索</div>
      <div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">主题</div>
    </div>
    <div class="memoryDate-name">{{tempShow()}}</div>
    <div class="memoryDate-wrap">
      <div class="memoryDate-tabs">
        <div :class="type==='year'?'memoryDate-tabs-unit-active':'memoryDate-tabs-unit'" @click="typeChange('year')">year</div>
        <div :class="memoryDateAddShow?'memoryDate-tabs-unit-active':'memoryDate-tabs-unit'" @click="tapLink">新增</div>
        <div :class="edit?'memoryDate-tabs-unit-active':'memoryDate-tabs-unit'" @click="changeState">{{edit?'关闭':'编辑'}}</div>
      </div>
      <div class="memoryDate-main">
        <div class="memoryDate-wrap-unit" v-for="(item,index) in urls" :key="index" @click="memoryDateClick(item)"
             @mouseover="memoryDateHover(item)" @mouseout="memoryDateHoverOut">
          <div class="memoryDate-wrap-unit-logo">{{item.name.charAt(0)}}</div>
        </div>
      </div>
    </div>
    <memoryDateAdd v-if="memoryDateAddShow" @close="tapLink" @finish="getmemoryDate"/>
    <memoryDateEdit v-if="memoryDateEditShow" @close="tapLinkEdit" @finish="getmemoryDate" :info="memoryDateEditItem"/>
    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  import {memoryDateList} from "../../api";
  import memoryDateAdd from "./memoryDateAdd"
  import memoryDateEdit from "./memoryDateEdit"
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {memoryDateAdd, memoryDateEdit,NavBottom},
    data() {
      return {
        urls: [],
        memoryDateAddShow: false,
        memoryDateEditShow: false,
        memoryDateEditItem: {},
        searchInfo: "",
        tempName: "",
        tempItem:{},
        type: "year",
        edit: false,
        local: false
      }
    },
    created() {
      this.getmemoryDate()
    },
    methods: {
      tempShow:function () {
        if(this.tempName){
          let item=this.tempItem;
          return `${item.name} ${item.recallYear}/${item.recallMonth}/${item.recallDate}`
        }
        return ""
      },
      searchLocal() {
        this.local = !this.local
      },
      changeState() {
        this.edit = !this.edit
      },
      typeChange(type) {
        if (type !== this.type) {
          this.type = type;
          this.getmemoryDate()
        }
      },
      searchmemoryDateByTheme() {
        let data = {};
        data.size = 100;
        data.theme = this.searchInfo;
        memoryDateList(data).then(res => {
          this.urls = res.data.list
        })
      },
      searchmemoryDate() {
        let data = {};
        data.size = 100;
        data.search = this.searchInfo;
        memoryDateList(data).then(res => {
          this.urls = res.data.list
        })
      },
      getmemoryDate() {
        if (this.local) {
          this.searchmemoryDate()
        } else {
          let data = {};
          data.size = 40;
          data.type = this.type;
          memoryDateList(data).then(res => {
            this.urls = res.data.list
          })
        }

      },
      memoryDateClick: function (item) {
        if(this.edit){
          this.memoryDateEditShow = true;
          this.memoryDateEditItem = item;
        } else {
          if(item.url&&item.url!=="none"){
            window.open(item.url)
          }
        }

      },
      memoryDateHover(item) {
        this.tempName = item.name;
        this.tempItem=item;
      },
      memoryDateHoverOut() {
        this.tempName = ""
        this.tempItem={};
      },
      tapLink() {
        this.memoryDateAddShow = !this.memoryDateAddShow;
      },
      tapLinkEdit() {
        this.memoryDateEditShow = false;
        this.memoryDateEditItem = {}
      },
      searchBaidu() {
        if (!this.local) {
          this.searchmemoryDate()
        } else {
          this.searchmemoryDateByTheme()
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

  .memoryDate-tabs {
    padding-top: 30px;
    margin-right: 20px;
    width: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: right;
  }

  .memoryDate-tabs-unit {
    margin-bottom: 20px;
    color: white;
    cursor: pointer;
  }

  .memoryDate-tabs-unit-active {
    margin-bottom: 20px;
    color: #7393a7;
    cursor: pointer;
  }

  .memoryDate-main {
    display: flex;
    flex-wrap: wrap;
  }

  .memoryDate-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .memoryDate-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }

  .memoryDate-wrap-unit {
    cursor: pointer;
    flex: 10%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }

  .memoryDate-wrap-unit-logo {
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


  .memoryDate-wrap-unit a {
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
