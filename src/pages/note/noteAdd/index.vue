<template>
  <div class="note-add">
    <div class="note-add-wrap">
      <div class="note-add-title">新增便签</div>
      <div class="note-add-unit">
        <div class="note-add-unit-label">名称</div>
        <input class="note-add-unit-input" v-model="name"/>
      </div>

      <div class="note-add-unit">
        <div class="note-add-unit-label">主题</div>
        <input class="note-add-unit-input" v-model="theme"/>
      </div>
      <div class="note-add-unit">
        <div class="note-add-unit-label">截止日期</div>
        <div class="block">
          <el-date-picker
            v-model="deadline"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <!--<input class="note-add-unit-input" v-model="deadline"/>-->
      </div>
      <div class="note-add-unit">
        <div class="note-add-unit-label">分类</div>
        <div class="note-add-unit-button-wrap">
          <div :class="type==='一般'?'note-add-unit-button button-active':'note-add-unit-button'" @click="typeChange('一般')">一般</div>
          <div :class="type==='紧急'?'note-add-unit-button button-active':'note-add-unit-button'" @click="typeChange('紧急')">紧急</div>
        </div>
      </div>
      <div class="note-add-button">
        <div class="note-add-button-unit" @click="cancel">取消</div>
        <div class="note-add-button-unit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import {noteAddNew} from "../../../api";

export default {
    name: 'noteAdd',
    data() {
      return {
        name:"",
        deadline:0,
        type:"一般",
        theme:"",
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
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
        console.log(this.deadline);
        let data=new Date(this.deadline)
        console.log(data)
      //   let data={};
      //   data.name=this.name;
      //   data.own=this.own;
      //   if(this.url){
      //     data.url=this.url;
      //   }
      //   if(this.type){
      //     data.type=this.type;
      //   }
      //   if(this.theme){
      //     data.theme=this.theme;
      //   }
      //   if(this.img){
      //     data.img=this.img;
      //   }
      //   if(this.ISBN){
      //     data.ISBN=this.ISBN;
      //   }
      //   if(this.noteUrl){
      //     data.noteUrl=this.noteUrl;
      //   }
        // noteAddNew(data).then(res=>{
        //   if (res.success){
        //     this.$emit('finish')
        //     this.$emit('close')
        //   } else {
        //     alert(res.msg)
        //   }
        // })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.note-add{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:rgba(0,0,0,0.5);
  text-align: center;
}
  .note-add-wrap{
    background: #e8ecf1;
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 20px;
  }
  .note-add-title{
    margin-bottom: 20px;
  }
  .note-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .note-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .note-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
    width: 300px;
  }
  .note-add-unit-button-wrap{
    display: flex;
  }
  .note-add-unit-button{
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
  .note-add-button{
    margin: 0 auto;
    width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.note-add-button-unit{
  cursor: pointer;
  margin: 20px 40px;
  background: #7393a7;
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
