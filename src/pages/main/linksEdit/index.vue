<template>
  <div class="links-add">
    <div class="links-add-wrap">
      <div class="links-add-title">修改链接</div>
      <div class="links-add-unit">
        <div class="links-add-unit-label">名称</div>
        <input class="links-add-unit-input" v-model="name"/>
      </div>
      <div class="links-add-unit">
        <div class="links-add-unit-label">地址</div>
        <input class="links-add-unit-input" v-model="url"/>
      </div>

      <div class="links-add-unit">
        <div class="links-add-unit-label">主题</div>
        <input class="links-add-unit-input" v-model="theme"/>
      </div>
      <div class="links-add-unit">
        <div class="links-add-unit-label">图片</div>
        <input class="links-add-unit-input" v-model="img"/>
      </div>
      <div class="links-add-unit">
        <div class="links-add-unit-label">分类</div>
        <div class="links-add-unit-button-wrap">
          <div :class="type==='常用'?'links-add-unit-button button-active':'links-add-unit-button'" @click="typeChange('常用')">常用</div>
          <div :class="type==='收藏'?'links-add-unit-button button-active':'links-add-unit-button'" @click="typeChange('收藏')">收藏</div>
          <div :class="type==='文章'?'links-add-unit-button button-active':'links-add-unit-button'" @click="typeChange('文章')">文章</div>
        </div>
      </div>
      <div class="links-add-button">
        <div class="links-add-button-unit" @click="cancel">取消</div>
        <div class="links-add-button-unit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import {linksEditInfo} from "../../../api";

export default {
    name: 'linksEdit',
    data() {
      return {
        name:"",
        url:"",
        type:"常用",
        theme:"",
        img:"",
        id:""
      }
    },
    props:{
      info:{
        type:Object,
        default:function () {
          return{}
        }
      }
    },

    beforeMount() {
      let info=this.$props.info;
      this.name=info.name;
      this.url=info.url;
      this.type=info.type;
      this.theme=info.theme;
      this.img=info.img;
      this.id=info._id;
    },
    methods:{
      typeChange(type){
        if(type!==this.type){
          this.type=type;
        }
      },cancel(){
        this.$emit('close')
      },
      submit(){
        let data={};
        data.name=this.name;
        data.url=this.url;
        data.id=this.id;
        if(this.type){
          data.type=this.type;
        }
        if(this.theme){
          data.theme=this.theme;
        }
        if(this.img){
          data.img=this.img;
        }
        linksEditInfo(data).then(res=>{
          if (res.success){
            this.$emit('finish')
            this.$emit('close')
          } else {
            alert(res.msg)
          }
        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.links-add{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:rgba(0,0,0,0.5);
  text-align: center;
}
  .links-add-wrap{
    background: #e8ecf1;
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 20px;
  }
  .links-add-title{
    margin-bottom: 20px;
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
    width: 300px;
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
  margin: 20px 40px;
  background: #7393a7;
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
