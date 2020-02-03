<template>
  <div class="main">
    <div class="search-area">
      <input class="search-input" placeholder="something" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>
      <div class="search-button" @click="searchBaidu">搜索</div>
      <div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">主题</div>
    </div>
    <div class="links-name">{{tempName}}</div>
    <div class="links-wrap">
      <div class="links-tabs">
        <div :class="type==='常用'?'links-tabs-unit-active':'links-tabs-unit'" @click="typeChange('常用')">常用</div>
        <div :class="type==='收藏'?'links-tabs-unit-active':'links-tabs-unit'" @click="typeChange('收藏')">收藏</div>
        <div :class="type==='文章'?'links-tabs-unit-active':'links-tabs-unit'" @click="typeChange('文章')">文章</div>
        <div :class="linksAddShow?'links-tabs-unit-active':'links-tabs-unit'" @click="tapLink">新增</div>
        <div :class="edit?'links-tabs-unit-active':'links-tabs-unit'" @click="changeState">{{edit?'关闭':'编辑'}}</div>
      </div>
      <div class="links-main">
        <div class="links-wrap-unit" v-for="(item,index) in urls" :key="index" @click="linksClick(item)"
             @mouseover="linksHover(item)" @mouseout="linksHoverOut">
          <div v-if="item.img!=='none'" class="links-wrap-unit-logo links-wrap-unit-logo-img">
            <img :src="item.img" alt=""/>
          </div>
          <div v-else class="links-wrap-unit-logo">{{item.name.charAt(0)}}</div>
        </div>
      </div>
    </div>
    <LinksAdd v-if="linksAddShow" @close="tapLink" @finish="getLinks"/>
    <LinksEdit v-if="linksEditShow" @close="tapLinkEdit" @finish="getLinks" :info="linksEditItem"/>
    <!--以上是链接部分-->
    <TipsArea />
    <NavBottom/>
  </div>
</template>

<script>
  import {linksList, useLink} from "../../api";
  import LinksAdd from "./linksAdd"
  import LinksEdit from "./linksEdit"
  import NavBottom from "../../components/navBottom"
  import TipsArea from "../../components/tipsArea"

  export default {
    name: 'Main',
    components: {LinksAdd, LinksEdit,NavBottom,TipsArea},
    data() {
      return {
        urls: [],
        linksAddShow: false,
        linksEditShow: false,
        linksEditItem: {},
        searchInfo: "",
        tempName: "",
        type: "常用",
        edit: false,
        local: false
      }
    },
    created() {
      this.getLinks()
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
          this.getLinks()
        }
      },
      searchLinks() {
        let data = {};
        data.size = 100;
        data.theme = this.searchInfo;
        // data.type=this.type;
        linksList(data).then(res => {
          this.urls = res.data.list
        })
      },
      getLinks() {
        if (this.local) {
          this.searchLinks()
        } else {
          let data = {};
          data.size = 40;
          data.type = this.type;
          linksList(data).then(res => {
            this.urls = res.data.list
          })
        }

      },
      linksClick: function (item) {
        if (!this.edit) {
          window.open(item.url)
          useLink({id: item._id}).then(res => {
            console.log(res)
          })
        } else {
          this.linksEditShow = true;
          this.linksEditItem = item;
        }

      },
      linksHover(item) {
        this.tempName = item.name;
      },
      linksHoverOut() {
        this.tempName = ""
      },
      tapLink() {
        this.linksAddShow = !this.linksAddShow;
      },
      tapLinkEdit() {
        this.linksEditShow = false;
        this.linksEditItem = {}
      },
      searchBaidu() {
        if (!this.local) {
          window.open('https://www.baidu.com/s?wd=' + this.searchInfo)
        } else {
          this.searchLinks()
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

  .links-tabs {
    padding-top: 30px;
    margin-right: 20px;
    width: 40px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .links-tabs-unit {
    margin-bottom: 20px;
    color: white;
    cursor: pointer;
  }

  .links-tabs-unit-active {
    margin-bottom: 20px;
    color: #7393a7;
    cursor: pointer;
  }

  .links-main {
    display: flex;
    flex-wrap: wrap;
  }

  .links-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .links-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }

  .links-wrap-unit {
    cursor: pointer;
    flex: 10%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }

  .links-wrap-unit-logo {
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

  .links-wrap-unit-logo-img {

    background: white;

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
