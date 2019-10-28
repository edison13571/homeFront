<template>
  <div class="main">
    <div class="search-area">
      <input class="search-input" :placeholder="local?'搜索主题':'搜索名称'" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>
      <div class="search-button" @click="searchBaidu">搜索</div>
      <div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">主题</div>
    </div>
    <div class="note-name">{{tempName?"《"+tempName+"》":""}}</div>
    <div class="note-wrap">
      <div class="note-tabs">
        <div :class="type==='在看'?'note-tabs-unit-active':'note-tabs-unit'" @click="typeChange('在看')">在看</div>
        <div :class="type==='看过'?'note-tabs-unit-active':'note-tabs-unit'" @click="typeChange('看过')">看过</div>
        <div :class="type==='想看'?'note-tabs-unit-active':'note-tabs-unit'" @click="typeChange('想看')">想看</div>
        <div :class="noteAddShow?'note-tabs-unit-active':'note-tabs-unit'" @click="tapLink">新增</div>
        <div :class="edit?'note-tabs-unit-active':'note-tabs-unit'" @click="changeState">{{edit?'关闭':'编辑'}}</div>
      </div>
      <div class="note-main">
        <div class="note-wrap-unit" v-for="(item,index) in urls" :key="index" @click="noteClick(item)"
             @mouseover="noteHover(item)" @mouseout="noteHoverOut">
          <div class="note-wrap-unit-logo">{{item.name.charAt(0)}}</div>
        </div>
      </div>
    </div>
    <noteAdd v-if="noteAddShow" @close="tapLink" @finish="getnote"/>
    <noteEdit v-if="noteEditShow" @close="tapLinkEdit" @finish="getnote" :info="noteEditItem"/>
    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  import {noteList} from "../../api";
  import noteAdd from "./noteAdd"
  import noteEdit from "./noteEdit"
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {noteAdd, noteEdit,NavBottom},
    data() {
      return {
        urls: [],
        noteAddShow: false,
        noteEditShow: false,
        noteEditItem: {},
        searchInfo: "",
        tempName: "",
        type: "在看",
        edit: false,
        local: false
      }
    },
    created() {
      this.getnote()
    },
    methods: {
      searchLocal() {
        this.local = !this.local
      },
      changeState() {
        this.edit = !this.edit
      },
      typeChange(type) {
        if (type !== this.type) {
          this.type = type;
          this.getnote()
        }
      },
      searchnoteByTheme() {
        let data = {};
        data.size = 100;
        data.theme = this.searchInfo;
        noteList(data).then(res => {
          this.urls = res.data.list
        })
      },
      searchnote() {
        let data = {};
        data.size = 100;
        data.search = this.searchInfo;
        noteList(data).then(res => {
          this.urls = res.data.list
        })
      },
      getnote() {
        if (this.local) {
          this.searchnote()
        } else {
          let data = {};
          data.size = 40;
          data.type = this.type;
          noteList(data).then(res => {
            this.urls = res.data.list
          })
        }

      },
      noteClick: function (item) {
        if(this.edit){
          this.noteEditShow = true;
          this.noteEditItem = item;
        } else {
          if(item.url&&item.url!=="none"){
            window.open(item.url)
          }
        }

      },
      noteHover(item) {
        this.tempName = item.name;
      },
      noteHoverOut() {
        this.tempName = ""
      },
      tapLink() {
        this.noteAddShow = !this.noteAddShow;
      },
      tapLinkEdit() {
        this.noteEditShow = false;
        this.noteEditItem = {}
      },
      searchBaidu() {
        if (!this.local) {
          this.searchnote()
        } else {
          this.searchnoteByTheme()
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

  .note-tabs {
    padding-top: 30px;
    margin-right: 20px;
    width: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: right;
  }

  .note-tabs-unit {
    margin-bottom: 20px;
    color: white;
    cursor: pointer;
  }

  .note-tabs-unit-active {
    margin-bottom: 20px;
    color: #7393a7;
    cursor: pointer;
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
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }

  .note-wrap-unit {
    cursor: pointer;
    flex: 10%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }

  .note-wrap-unit-logo {
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


  .note-wrap-unit a {
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
