<template>
  <div class="books-add">
    <div class="books-add-wrap">
      <div class="books-add-title">新增记录</div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">名称</div>
        <input class="books-add-unit-input" v-model="name"/>
      </div>

      <div class="books-add-unit">
        <div class="books-add-unit-label">主题</div>
        <input class="books-add-unit-input" v-model="theme"/>
      </div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">图片</div>
        <input class="books-add-unit-input" v-model="img"/>
      </div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">ISBN</div>
        <input class="books-add-unit-input" v-model="ISBN"/>
      </div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">相关链接</div>
        <input class="books-add-unit-input" v-model="url"/>
      </div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">笔记链接</div>
        <input class="books-add-unit-input" v-model="noteUrl"/>
      </div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">分类</div>
        <div class="books-add-unit-button-wrap">
          <div :class="type==='在看'?'books-add-unit-button button-active':'books-add-unit-button'" @click="typeChange('在看')">在看</div>
          <div :class="type==='看过'?'books-add-unit-button button-active':'books-add-unit-button'" @click="typeChange('看过')">看过</div>
          <div :class="type==='想看'?'books-add-unit-button button-active':'books-add-unit-button'" @click="typeChange('想看')">想看</div>
        </div>
      </div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">拥有</div>
        <div class="books-add-unit-button-wrap">
          <div :class="own?'books-add-unit-button button-active':'books-add-unit-button'" @click="ownChange(true)">有</div>
          <div :class="!own?'books-add-unit-button button-active':'books-add-unit-button'" @click="ownChange(false)">没有</div>
        </div>
      </div>
      <div class="books-add-button">
        <div class="books-add-button-unit" @click="cancel">取消</div>
        <div class="books-add-button-unit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import {booksAddNew} from "../../../api";

export default {
    name: 'booksAdd',
    data() {
      return {
        name:"",
        url:"",
        noteUrl:"",
        ISBN:"",
        type:"在看",
        theme:"",
        img:"",
        own:true
      }
    },
    created() {

    },
    methods:{
      ownChange(own){
        if(own!==this.own){
          this.own=own;
        }
      },
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
        data.own=this.own;
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
        if(this.ISBN){
          data.ISBN=this.ISBN;
        }
        if(this.noteUrl){
          data.noteUrl=this.noteUrl;
        }
        booksAddNew(data).then(res=>{
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

.books-add{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:rgba(0,0,0,0.5);
  text-align: center;
}
  .books-add-wrap{
    background: #e8ecf1;
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 20px;
  }
  .books-add-title{
    margin-bottom: 20px;
  }
  .books-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .books-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .books-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
    width: 300px;
  }
  .books-add-unit-button-wrap{
    display: flex;
  }
  .books-add-unit-button{
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
  .books-add-button{
    margin: 0 auto;
    width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.books-add-button-unit{
  cursor: pointer;
  margin: 20px 40px;
  background: #7393a7;
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
