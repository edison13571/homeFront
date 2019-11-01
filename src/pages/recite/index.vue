<template>
  <div class="main">
    <NavBottom/>
    <!--<div class="search-area">-->
      <!--<input class="search-input" :placeholder="local?'搜索主题':'搜索名称'" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>-->
      <!--<div class="search-button" @click="searchBaidu">搜索</div>-->
      <!--<div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">主题</div>-->
    <!--</div>-->
    <div class="recite-name">{{tempName}}</div>
    <div class="recite-wrap">
      <div class="recite-tabs">
        <div :class="type==='issue'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('issue')">题目</div>
        <div :class="type==='tips'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('tips')">提示</div>
        <!--<div :class="type==='sound'?'recite-tabs-unit-active':'recite-tabs-unit'" @click="typeChange('sound')">语音</div>-->
      </div>
      <div v-if="type==='issue'" class="recite-main">
        <div>123</div>
      </div>
      <div v-if="type==='tips'" class="recite-main">
        <div>222</div>
      </div>
      <!--<div v-if="type==='sound'" class="recite-main">-->
        <!--<div>123</div>-->
      <!--</div>-->
    </div>
    <div class="search-area">
      <input class="search-input" placeholder="输入答案" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>
      <div class="search-button" @click="searchBaidu">跳过</div>
      <div :class="local?'search-button-local-active':'search-button-local'" @click="searchLocal">下一题</div>
    </div>
    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  // import {reciteList,reciteEditInfo} from "../../api";
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {NavBottom},
    data() {
      return {
        urls: [],
        reciteAddShow: false,
        reciteEditShow: false,
        reciteEditItem: {},
        searchInfo: "",
        tempName: "",
        type: "issue",
        edit: false,
        local: false
      }
    },
    created() {
      // this.getrecite()
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
          // this.getrecite()
        }
      },
      searchreciteByTheme() {
        let data = {};
        data.size = 100;
        data.theme = this.searchInfo;
        reciteList(data).then(res => {
          this.urls = res.data.list
        })
      },
      searchrecite() {
        let data = {};
        data.size = 100;
        data.search = this.searchInfo;
        reciteList(data).then(res => {
          this.urls = res.data.list
        })
      },
      getrecite() {
        if (this.local) {
          this.searchrecite()
        } else {
          let data = {};
          data.size = 40;
          data.state=this.state;
          reciteList(data).then(res => {
            this.urls = res.data.list
          })
        }

      },
      reciteClick: function (item) {
        if(this.edit){
          this.reciteEditShow = true;
          this.reciteEditItem = item;
        } else {
          if(this.state==="todo"){
            console.log(item)
            this.$confirm('撕掉便签'+item.name+'?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              let data={};
              data.id=item._id;
              data.finishDate=new Date().valueOf()
              reciteEditInfo(data).then(res=>{
                this.getrecite()
              })
            }).catch(() => {

            });
          }
        }

      },
      reciteHover(item) {
        let str=item.name;
        if(item.finishDate){
          str+="/"+this.$moment(item.finishDate).format('YYYY-MM-DD h:mm')
        }
          str+="/"+this.$moment(item.deadline).format('YYYY-MM-DD h:mm')
        this.tempName = str;
      },
      reciteHoverOut() {
        this.tempName = ""
      },
      tapLink() {
        this.reciteAddShow = !this.reciteAddShow;
      },
      tapLinkEdit() {
        this.reciteEditShow = false;
        this.reciteEditItem = {}
      },
      searchBaidu() {
        if (!this.local) {
          this.searchrecite()
        } else {
          this.searchreciteByTheme()
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
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }

  .recite-wrap-unit {
    cursor: pointer;
    flex: 10%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }

  .recite-wrap-unit-logo {
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
