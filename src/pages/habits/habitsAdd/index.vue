<template>
  <div class="habits-add">
    <div class="habits-add-wrap">
      <div class="habits-add-title">新增习惯</div>
      <div class="habits-add-unit">
        <div class="habits-add-unit-label">名称</div>
        <input class="habits-add-unit-input" v-model="title"/>
      </div>

      <div class="habits-add-unit">
        <div class="habits-add-unit-label">主题</div>
        <input class="habits-add-unit-input" v-model="theme"/>
      </div>
      <div class="habits-add-unit">
        <div class="habits-add-unit-label">目标</div>
        <input type="number" class="habits-add-unit-input" v-model="target"/>
      </div>

      <div class="habits-add-unit">
        <div class="habits-add-unit-label">单位</div>
        <input class="habits-add-unit-input" v-model="unit"/>
      </div>

      <div class="habits-add-unit">
        <div class="habits-add-unit-label">周期</div>
        <div class="habits-add-unit-button-wrap">
          <div :class="period==='day'?'habits-add-unit-button button-active':'habits-add-unit-button'" @click="periodChange('day')">日</div>
          <div :class="period==='week'?'habits-add-unit-button button-active':'habits-add-unit-button'" @click="periodChange('week')">周</div>
        </div>
      </div>

      <div class="habits-add-unit">
        <div class="habits-add-unit-label">分类</div>
        <div class="habits-add-unit-button-wrap">
          <div :class="type==='normal'?'habits-add-unit-button button-active':'habits-add-unit-button'" @click="typeChange('normal')">全天</div>
          <div :class="type==='notWorkday'?'habits-add-unit-button button-active':'habits-add-unit-button'" @click="typeChange('notWorkday')">非工作时间</div>
        </div>
      </div>

      <div class="habits-add-unit">
        <div class="habits-add-unit-label">状态</div>
        <div class="habits-add-unit-button-wrap">
          <div :class="state===2?'habits-add-unit-button button-active':'habits-add-unit-button'" @click="stateChange(2)">养成中</div>
          <div :class="state===1?'habits-add-unit-button button-active':'habits-add-unit-button'" @click="stateChange(1)">未激活</div>
        </div>
      </div>
      <div class="habits-add-button">
        <div class="habits-add-button-unit" @click="cancel">取消</div>
        <div class="habits-add-button-unit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import {habitsAddNew} from "../../../api";

export default {
    name: 'habitsAdd',
    data() {
      return {
        title:"",
        type:"normal",
        state:2,
        period:"day",
        theme:"",
        target:"",
        unit:"",
      }
    },
    created() {

    },
    methods:{
      stateChange(state){
        if(state!==this.state){
          this.state=state;
        }
      },
      periodChange(period){
        if(period!==this.period){
          this.period=period;
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
        data.title=this.title;
        data.type=this.type;
        data.state=this.state;
        data.period=this.period;
        data.target=this.target;
        data.unit=this.unit;
        data.theme=this.theme;

        habitsAddNew(data).then(res=>{
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

.habits-add{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:rgba(0,0,0,0.5);
  text-align: center;
}
  .habits-add-wrap{
    background: #e8ecf1;
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 20px;
  }
  .habits-add-title{
    margin-bottom: 20px;
  }
  .habits-add-unit{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .habits-add-unit-label{
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  .habits-add-unit-input{
    border: 0;
    outline: none;
    background: transparent;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
    width: 300px;
  }
  .habits-add-unit-button-wrap{
    display: flex;
  }
  .habits-add-unit-button{
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
  .habits-add-button{
    margin: 0 auto;
    width:300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.habits-add-button-unit{
  cursor: pointer;
  margin: 20px 40px;
  background: #7393a7;
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
