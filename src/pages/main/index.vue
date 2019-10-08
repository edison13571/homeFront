<template>
  <div class="main">
    <div class="search-area">
      <input class="search-input" placeholder="something" v-model="searchInfo" v-on:keyup.enter="searchBaidu"/>
      <div class="search-button" @click="searchBaidu">搜索</div>
    </div>
  <div class="links-wrap">
    <div class="links-wrap-unit" v-for="(item,index) in urls" :key="index" @click="linksClick(item)">
      <div v-if="item.img!=='none'" class="links-wrap-unit-logo links-wrap-unit-logo-img">
        <img   :src="item.img" alt=""/>
      </div>
      <div v-else class="links-wrap-unit-logo">{{item.name.charAt(0)}}</div>
      <div class="links-wrap-unit-link" :href="item.url" target="_blank">{{item.name}}</div>
<!--      <div>{{item.theme}}</div>-->
    </div>
    <div class="links-wrap-unit" @click="tapLink">
      <div class="links-wrap-unit-logo">+</div>
      <div class="links-wrap-unit-link">新增</div>
    </div>
  </div>
     <LinksAdd v-if="linksAddShow" @close="tapLink" @finish="getLinks"/>
  </div>
</template>

<script>
  import {linksList,useLink} from "../../api";
  import LinksAdd from "./linksAdd"
  export default {
    name: 'Main',
    components:{LinksAdd},
    data() {
      return {
        urls:[],
        linksAddShow:false,
        searchInfo:""
      }
    },
    created(){
      this.getLinks()
    },
    methods:{
      getLinks(){
        linksList({size:100}).then(res=>{
          this.urls=res.data.list
        })
      },
      linksClick:function (item) {
        window.open(item.url)
        useLink({id:item._id}).then(res=>{
          console.log(res)
        })
      },
      tapLink(){
        this.linksAddShow=!this.linksAddShow;
      },
      searchBaidu(){
        window.open('https://www.baidu.com/s?wd=' + this.searchInfo)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    text-align: center;
    padding-top: 80px;
  }
  .search-area{
    margin-bottom: 20px;
  }
  .links-wrap{
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }
  .links-wrap-unit{
    cursor: pointer;
    flex: 20%;
    flex-grow: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

  }
  .links-wrap-unit-link{
    flex: 1;
  }
  .links-wrap-unit-logo{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;background: #7393a7;
    color: white;
    font-size: 20px;
    overflow: hidden;
  }
  .links-wrap-unit-logo-img{

    background: white;

  }
  .links-wrap-unit-logo-img img{
    width: 35px;
    height: 35px;
    /*border-radius: 50%;*/
  }
.links-wrap-unit a{
  text-decoration: none;
  color: black;
}
  .search-area{
    display: flex;
    width: 600px;
    margin: 0 auto 30px auto;
    justify-content: space-between;
    align-items: center;
  }
  .search-input{
    flex: 1;
    margin: 20px;
    height: 30px;
    background: white;
    padding: 0 20px;
    border-radius: 5px;
  }
  .search-button{
    cursor: pointer;
  }
</style>
