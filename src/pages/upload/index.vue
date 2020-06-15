<template>
  <div class="main">
    <div class="note-name">{{tempName}}</div>
    <div class="note-wrap">
      <div class="note-main upload-main">
        <div>{{state}}</div>
        <button @click="inputClick">upload</button>
        <input id="input-file"  type="file" @change="inputChange" style="visibility: hidden" />
        <div v-if="url">{{url}}</div>

      </div>

    </div>

    <!--以上是链接部分-->
    <NavBottom/>
  </div>
</template>

<script>
  import {qiniuUpload} from "../../api";
  import NavBottom from "../../components/navBottom"

  export default {
    name: 'Main',
    components: {NavBottom},
    data() {
      return {
        state: '',
        url: ''
      }
    },
    created() {

    },
    methods: {
      inputClick(){
        let input = document.getElementById('input-file')
        input.click()
      },
      inputChange(e){
        let formData = new FormData()
        let file = e.target.files[0]
        formData.append('file',file)
        this.url = ''
        this.state = 'uploading'
        qiniuUpload(formData).then(res=>{
          if (res.success) {
            this.url = res.data
            this.state = 'success'
          } else{
            this.state = 'fail'
            this.url=''
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    text-align: center;
    padding-top: 80px;
  }

  .note-main {
    display: flex;
    flex-wrap: wrap;
  }

  .note-name {
    margin-bottom: 20px;
    color: white;
    height: 20px;
  }

  .note-wrap {
    width: 800px;
    margin: 0 auto 30px auto;
    display: flex;
    justify-content: flex-start;
    align-items: start;

    background: #e8ecf1;
    padding: 20px;
    border-radius: 15px;
  }


.upload-main{
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
