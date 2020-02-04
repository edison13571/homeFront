import axios from 'axios';
import qs from 'qs';


// axios.defaults.baseURL = "http://192.168.1.171:3000/";
axios.defaults.baseURL = "http://129.211.51.250:3000/";

export let baseURL=axios.defaults.baseURL;
axios.defaults.timeout = 10000;
// const FDFSURL=process.env.FDFS_ENDPOINT;
/** d
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */


axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
if(response.data.error){
  alert(response.data.msg)
}
  return response;
}, function (error) {
  console.log(error);
  // 对响应错误做点什么
  if (JSON.stringify(error).indexOf('401')>-1){
    // alert('登录失效，请重新登录！');
    window.location.href='/#/login'
  }else if (JSON.stringify(error).indexOf('500')>-1){
    // alert('网络问题，请稍后重试！');
  }
  return Promise.reject(error);
});

export function deleted(url,data = {}){
  return new Promise((resolve,reject) => {
    let type = {
      headers: {
        "Authorization": window.localStorage.getItem("token")
      }};
    axios.delete(url,type)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}
export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    let type = {
      headers: {
        "Authorization": window.localStorage.getItem("token")
      }};
    axios.put(url,data,type)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

export function del(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,{params:data})
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

export function post(url,data = {}){

  return new Promise((resolve,reject) => {
    let type = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": window.localStorage.getItem("token")
      }};
    axios.post(url,qs.stringify(data),type).then(response => {
      resolve(response.data);
    },err => {
      reject(err)
    })
  })
}
export function postUpload(url,data = {}){
  return new Promise((resolve,reject) => {
    let type = {
      headers: {'Content-Type': 'multipart/form-data',
        "Authorization": window.localStorage.getItem("token")}};
    axios.post(url,data,type).then(response => {
      resolve(response.data);
    },err => {
      reject(err)
    })
  })
}

export function get(url,data){
  let headers = {'Content-Type': 'multipart/form-data',
    "Authorization": window.localStorage.getItem("token")};
  return new Promise((resolve,reject) => {
    axios.get(url,{params:data,headers:headers})
    // axios.get(url,{params:data})
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

export function baiduGetVoice(url,data){
  let headers = {'Content-Type': 'multipart/form-data'};
  data.tok="24.8b662e5ff9735ecd89be7575b28ba747.2592000.1583411632.282335-17684060";
  data.cuid="center";
  data.ctp=1;
  data.lan="zh";
  data.aue=3;
  let baiduUrl="https://tsn.baidu.com/text2audio";
  return new Promise((resolve,reject) => {
    axios.get(baiduUrl,{params:data,headers:headers,responseType:'arraybuffer'})
    // axios.get(url,{params:data})
      .then(response => {
        let blob = new Blob([response.data],{type:"audio/mp3"});
        let blobUrl = URL.createObjectURL(blob);
        resolve(blobUrl);
      },err => {
        reject(err)
      })
  })
}

// 登录
export function vioceGet(data) {
  return baiduGetVoice('',data);
}

export function youdaoVoice(data) {
  return get('/api/issues/getVoice/youdao',data);
}

// 登录
export function test(data) {
  return get('/api/users/test',data);
}


// 登录
export function login(data) {
  return post('/api/users/login',data);
}

export function userInfo(data) {
  return get('/api/users/current',data);
}

export function issueQuery(data) {
  return get('/api/issues/query',data);
}

export function issueDetail(data) {
  return get('/api/issues/detail',data);
}

export function issueNext(data) {
  return get('/api/issues/nextId',data);
}

export function issueFinish(data) {
  return post('/api/issues/next',data);
}

export function issueAdd(data) {
  return post('/api/issues/add',data);
}

export function issueAllReciteType(data) {
  return get('/api/issues/allReciteType',data);
}

export function issueAllTheme(data) {
  return get('/api/issues/allTheme',data);
}

export function issueEdit(data) {
  return post('/api/issues/detail',data);
}

export function queryByReciteType(data) {
  return get('/api/issues/queryByReciteType',data);
}

export function countByReciteType(data) {
  return get('/api/issues/countByReciteType',data);
}

export function reciteAdd(data) {
  return post('/api/issues/reciteAdd',data);
}

export function linksList(data) {
  return get('/api/links/query',data);
}

export function linksAddNew(data) {
  return post('/api/links/add',data);
}

export function linksEditInfo(data) {
  return post('/api/links/update',data);
}

export function useLink(data) {
  return post('/api/links/useLink',data);
}

export function ticketsList(data) {
  return get('/api/tickets/query',data);
}

export function ticketsAddNew(data) {
  return post('/api/tickets/add',data);
}

export function ticketsEditInfo(data) {
  return post('/api/tickets/update',data);
}

export function ticketsStats(data) {
  return get('/api/tickets/stats',data);
}

export function booksStats(data) {
  return get('/api/books/stats',data);
}

export function issuesStats(data) {
  return get('/api/issues/stats',data);
}

export function booksList(data) {
  return get('/api/books/query',data);
}

export function booksAddNew(data) {
  return post('/api/books/add',data);
}

export function booksEditInfo(data) {
  return post('/api/books/update',data);
}
export function memoryDateRecent(data) {
  return get('/api/memoryDate/queryInArray',data);
}

export function memoryDateList(data) {
  return get('/api/memoryDate/query',data);
}

export function memoryDateAddNew(data) {
  return post('/api/memoryDate/add',data);
}

export function memoryDateEditInfo(data) {
  return post('/api/memoryDate/update',data);
}

export function noteList(data) {
  return get('/api/notes/query',data);
}

export function noteAddNew(data) {
  return post('/api/notes/add',data);
}

export function noteEditInfo(data) {
  return post('/api/notes/update',data);
}

export function habitsList(data) {
  return get('/api/habits/query',data);
}

export function habitsAddNew(data) {
  return post('/api/habits/add',data);
}

export function habitsEditInfo(data) {
  return post('/api/habits/update',data);
}

export function habitsAddRecord(data) {
  return post('/api/habits/addRecord',data);
}

export function habitsQueryRecord(data) {
  return post('/api/habits/queryRecord',data);
}
