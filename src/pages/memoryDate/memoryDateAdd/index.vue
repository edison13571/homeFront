<template>
  <div class="memoryDate-add">
    <div class="memoryDate-add-wrap">
      <div class="memoryDate-add-title">新增记录</div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">名称</div>
        <input class="memoryDate-add-unit-input" v-model="name"/>
      </div>

      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">主题</div>
        <input class="memoryDate-add-unit-input" v-model="theme"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">日</div>
        <input class="memoryDate-add-unit-input" v-model="recallDate"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">月</div>
        <input class="memoryDate-add-unit-input" v-model="recallMonth"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">年</div>
        <input class="memoryDate-add-unit-input" v-model="recallYear"/>
      </div>
      <div class="memoryDate-add-unit">
        <div class="memoryDate-add-unit-label">分类</div>
        <div class="memoryDate-add-unit-button-wrap">
          <div :class="type==='year'?'memoryDate-add-unit-button button-active':'memoryDate-add-unit-button'" @click="typeChange('year')">year</div>
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
import {memoryDateAddNew} from "../../../api";

export default {
    name: 'memoryDateAdd',
    data() {
      return {
        name:"",
        recallDate:"",
        recallMonth:"",
        recallYear:"",
        type:"year",
        theme:"",
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
        if(this.recallMonth){
          data.recallMonth=this.recallMonth;
        }
        if(this.recallDate){
          data.recallDate=this.recallDate;
        }
        if(this.theme){
          data.theme=this.theme;
        }
        if(this.recallYear){
          data.recallYear=this.recallYear;
        }
        if(this.type){
          data.type=this.type;
        }
        memoryDateAddNew(data).then(res=>{
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
