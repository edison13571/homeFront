<template>
  <div class="main">
    <div class="search-area">
      <input class="search-input" :placeholder="local?'搜索主题':'搜索名称'" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>
      <div class="search-button" @click="searchBaidu">搜索</div>
      <div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">主题</div>
    </div>
    <div class="books-name">{{tempName?"《"+tempName+"》":""}}</div>
    <div class="books-wrap">
      <div class="books-tabs">
        <div :class="type==='在看'?'books-tabs-unit-active':'books-tabs-unit'" @click="typeChange('在看')">在看</div>
        <div :class="type==='看过'?'books-tabs-unit-active':'books-tabs-unit'" @click="typeChange('看过')">看过</div>
        <div :class="type==='想看'?'books-tabs-unit-active':'books-tabs-unit'" @click="typeChange('想看')">想看</div>
        <div :class="booksAddShow?'books-tabs-unit-active':'books-tabs-unit'" @click="tapLink">新增</div>
        <div :class="edit?'books-tabs-unit-active':'books-tabs-unit'" @click="changeState">编辑</div>
        <div :class="addRecord?'books-tabs-unit-active':'books-tabs-unit'" @click="changeStateRecord">记录</div>
      </div>
      <div class="books-main">
        <div class="books-wrap-unit" v-for="(item,index) in urls" :key="index" @click="booksClick(item)"
             @mouseover="booksHover(item)" @mouseout="booksHoverOut">
          <div class="books-wrap-unit-logo">{{item.name.charAt(0)}}</div>
        </div>
      </div>
    </div>
    <booksAdd v-if="booksAddShow" @close="tapLink" @finish="getbooks"/>
    <booksEdit v-if="booksEditShow" @close="tapLinkEdit" @finish="getbooks" :info="booksEditItem"/>
    <booksRecord v-if="booksRecordShow" @close="tapLinkEdit" @finish="getbooks" :info="booksEditItem"/>
    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  import {booksList} from "../../api";
  import booksAdd from "./booksAdd"
  import booksEdit from "./booksEdit"
  import booksRecord from "./booksRecord"
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {booksAdd, booksEdit,booksRecord,NavBottom},
    data() {
      return {
        urls: [],
        booksAddShow: false,
        booksEditShow: false,
        booksRecordShow: false,
        booksEditItem: {},
        searchInfo: "",
        tempName: "",
        type: "在看",
        edit: false,
        local: false,
        addRecord: false
      }
    },
    created() {
      this.getbooks()
    },
    methods: {
      searchLocal() {
        this.local = !this.local
      },
      changeState() {
        this.edit = !this.edit
        this.addRecord = false;
      },
      changeStateRecord(){
        this.addRecord=!this.addRecord;
        this.edit=false;
      },
      typeChange(type) {
        if (type !== this.type) {
          this.type = type;
          this.getbooks()
        }
      },
      searchbooksByTheme() {
        let data = {};
        data.size = 100;
        data.theme = this.searchInfo;
        booksList(data).then(res => {
          this.urls = res.data.list
        })
      },
      searchbooks() {
        let data = {};
        data.size = 100;
        data.search = this.searchInfo;
        booksList(data).then(res => {
          this.urls = res.data.list
        })
      },
      getbooks() {
        if (this.local) {
          this.searchbooks()
        } else {
          let data = {};
          data.size = 40;
          data.type = this.type;
          booksList(data).then(res => {
            this.urls = res.data.list
          })
        }

      },
      booksClick: function (item) {
        if(this.edit){
          this.booksEditShow = true;
          this.booksEditItem = item;
        } else if(this.addRecord){
          this.booksRecordShow = true;
          this.booksEditItem = item;
        }else {
          if(item.url&&item.url!=="none"){
            window.open(item.url)
          }
        }

      },
      booksHover(item) {
        this.tempName = item.name;
      },
      booksHoverOut() {
        this.tempName = ""
      },
      tapLink() {
        this.booksAddShow = !this.booksAddShow;
      },
      tapLinkEdit() {
        this.booksEditShow = false;
        this.booksRecordShow = false;
        this.booksEditItem = {}
      },
      searchBaidu() {
        if (!this.local) {
          this.searchbooks()
        } else {
          this.searchbooksByTheme()
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

  .books-tabs {
    padding-top: 30px;
    margin-right: 20px;
    width: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: right;
  }

  .books-tabs-unit {
    margin-bottom: 20px;
    color: white;
    cursor: pointer;
  }

  .books-tabs-unit-active {
    margin-bottom: 20px;
    color: #7393a7;
    cursor: pointer;
  }

  .books-main {
    display: flex;
    flex-wrap: wrap;
  }

  .books-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .books-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }

  .books-wrap-unit {
    cursor: pointer;
    flex: 10%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }

  .books-wrap-unit-logo {
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


  .books-wrap-unit a {
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
