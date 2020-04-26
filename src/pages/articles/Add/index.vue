<template>
  <div class="memoryDate-add">
    <div class="memoryDate-add-wrap">
      <div class="memoryDate-add-title">新增记录</div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">标题</div>
        <input class="memoryDate-add-unit-input" v-model="title"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">描述</div>
        <input class="memoryDate-add-unit-input" v-model="words"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">地址</div>
        <input class="memoryDate-add-unit-input" v-model="url"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">文件</div>
        <input class="memoryDate-add-unit-input" v-model="location"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">主题</div>
        <input class="memoryDate-add-unit-input" v-model="theme"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">系列</div>
        <input class="memoryDate-add-unit-input" v-model="series"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">类型</div>
        <input class="memoryDate-add-unit-input" v-model="type"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">标签1</div>
        <input class="memoryDate-add-unit-input" v-model="tags[0]"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">标签2</div>
        <input class="memoryDate-add-unit-input" v-model="tags[1]"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">标签3</div>
        <input class="memoryDate-add-unit-input" v-model="tags[2]"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">公开</div>
        <div class="memoryDate-add-unit-button-wrap">
          <div :class="publicAble?'memoryDate-add-unit-button button-active':'memoryDate-add-unit-button'" @click="typeChange(true)">公开</div>
          <div :class="!publicAble?'memoryDate-add-unit-button button-active':'memoryDate-add-unit-button'" @click="typeChange(false)">隐藏</div>
        </div>
      </div>
      <div class="memoryDate-add-button">
        <div class="memoryDate-add-button-unit" @click="cancel">取消</div>
        <div class="memoryDate-add-button-unit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {articlesAddNew} from "../../../api";

  export default {
    name: 'articlesAdd',
    data() {
      return {
        title:"",
        theme:"",
        type:"",
        location:"",
        url:"",
        series:"",
        words:"",
        publicAble:false,
        tags:[],
        id:""
      }
    },
    methods:{
      typeChange(type){
        if(type!==this.publicAble){
          this.publicAble=type;
        }
      },cancel(){
        this.$emit('close')
      },
      submit(){
        let data={};
        data.title=this.title;
        data.id=this.id;
        data.publicAble=this.publicAble;
        data.tags=this.tags;
        data.words=this.words;
        data.location=this.location;
        data.url=this.url;
        data.series=this.series;
        data.theme=this.theme;
        data.type=this.type;
        articlesAddNew(data).then(res=>{
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

  .memoryDate-add{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background:rgba(0,0,0,0.5);
    text-align: center;
  }
  .memoryDate-add-wrap{
    background: #e8ecf1;
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 20px;
  }
  .memoryDate-add-title{
    margin-bottom: 20px;
  }
  .memoryDate-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .memoryDate-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .memoryDate-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
    width: 300px;
  }
  .memoryDate-add-unit-button-wrap{
    display: flex;
  }
  .memoryDate-add-unit-button{
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
  .memoryDate-add-button{
    margin: 0 auto;
    width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .memoryDate-add-button-unit{
    cursor: pointer;
    margin: 20px 40px;
    background: #7393a7;
    color: white;
    padding: 10px;
    border-radius: 10px;
  }

</style>
