<template>
  <div class="tickets-add">
    <div class="tickets-add-wrap">
      <div class="tickets-add-title">新增记录</div>
      <div class="tickets-add-unit">
        <div class="tickets-add-unit-label">名称</div>
        <input class="tickets-add-unit-input" v-model="name"/>
      </div>

      <div class="tickets-add-unit">
        <div class="tickets-add-unit-label">主题</div>
        <input class="tickets-add-unit-input" v-model="theme"/>
      </div>
      <div class="tickets-add-unit">
        <div class="tickets-add-unit-label">图片</div>
        <input class="tickets-add-unit-input" v-model="img"/>
      </div>
      <div class="tickets-add-unit">
        <div class="tickets-add-unit-label">相关链接</div>
        <input class="tickets-add-unit-input" v-model="url"/>
      </div>
      <div class="tickets-add-unit">
        <div class="tickets-add-unit-label">分类</div>
        <div class="tickets-add-unit-button-wrap">
          <div :class="type==='电影'?'tickets-add-unit-button button-active':'tickets-add-unit-button'" @click="typeChange('电影')">电影</div>
          <div :class="type==='电视'?'tickets-add-unit-button button-active':'tickets-add-unit-button'" @click="typeChange('电视')">电视</div>
          <div :class="type==='其他'?'tickets-add-unit-button button-active':'tickets-add-unit-button'" @click="typeChange('其他')">其他</div>
        </div>
      </div>
      <div class="tickets-add-button">
        <div class="tickets-add-button-unit" @click="cancel">取消</div>
        <div class="tickets-add-button-unit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ticketsAddNew} from "../../../api";

export default {
    name: 'ticketsAdd',
    data() {
      return {
        name:"",
        url:"",
        type:"电影",
        theme:"",
        img:""
      }
    },
    created() {

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
        if(this.url){
          data.url=this.url;
        }
        if(this.type){
          data.type=this.type;
        }
        if(this.theme){
          data.theme=this.theme;
        }
        if(this.img){
          data.img=this.img;
        }
        ticketsAddNew(data).then(res=>{
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

.tickets-add{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:rgba(0,0,0,0.5);
  text-align: center;
}
  .tickets-add-wrap{
    background: #e8ecf1;
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 20px;
  }
  .tickets-add-title{
    margin-bottom: 20px;
  }
  .tickets-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .tickets-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .tickets-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
    width: 300px;
  }
  .tickets-add-unit-button-wrap{
    display: flex;
  }
  .tickets-add-unit-button{
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
  .tickets-add-button{
    margin: 0 auto;
    width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.tickets-add-button-unit{
  cursor: pointer;
  margin: 20px 40px;
  background: #7393a7;
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
