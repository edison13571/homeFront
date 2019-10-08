<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-line">
        <div class="login-line-label">用户名</div>
        <input placeholder="username" v-model="name"/>
      </div>
      <div class="login-line">
        <div class="login-line-label">密码</div>
        <input type="password" placeholder="password" v-model="password"/>
      </div>
      <div class="login-line" @click="clickLogin">
        <div class="login-line-button">开始使用</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from "../../api";

  export default {
    name: 'Login',
    data() {
      return {
          name:"",
        password:""
      }
    },
    methods:{
      checkIt:function(){
        if(!this.name){
          alert("请输入用户名");
          return false
        }
        if(!this.password){
          alert("请输入密码");
          return false
        }
        return true
      },
      clickLogin:function () {
        if(this.checkIt()){
          let data={};
          data.name=this.name;
          data.password=this.password;
          login(data).then(res=>{
           if (res.success){
             window.localStorage.token=res.token;
             this.$router.push('main')
           }
          })
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  text-align: center;
}
  .login-wrap{
    margin: 150px auto;
    background: #e8ecf1;
    width: 500px;
    border-radius: 20px;
    padding: 50px 50px 20px 50px;
  }
  .login-line{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
  .login-line input{
    background: transparent;
    border: 0;
    border-bottom: 2px solid #ffffff;
     padding: 10px;
    outline: none;
  }
  .login-line-label{
    width: 100px;
    text-align: left;
  }
.login-line-button{
  cursor: pointer;
  width: 200px;
  height: 30px;
}
</style>
