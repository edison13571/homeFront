<template>
  <div class="books-add">
    <div class="books-add-wrap">
      <div class="books-add-title">修改记录</div>
      <div class="books-add-unit">
        <div class="books-add-unit-label">记录</div>
        <div class="block">
          <div v-for="(item,index) in records" :key="index">{{timeShow(item)}}</div>
        </div>
      </div>

      <div class="books-add-unit">
        <div class="books-add-unit-label">时间</div>
        <div class="block">
          <el-date-picker
            v-model="recordTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="timestamp"
          >
          </el-date-picker>
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
import {booksEditInfo} from "../../../api";

export default {
    name: 'booksEdit',
    data() {
      return {
      records:[],
        id:"",
        recordTime:new Date().valueOf(),
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
      this.records=info.useDate;
      this.id=info._id;
    },
    methods:{
      timeShow(time){
        return this.$moment.unix(time/1000).format("YYYY-MM-DD HH:mm")
      },
      cancel(){
        this.$emit('close')
      },
      submit(){
        let data={};
        data.id=this.id;
        let arr=this.records;
        arr.push(this.recordTime)
        data.useDate=arr;
        booksEditInfo(data).then(res=>{
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
