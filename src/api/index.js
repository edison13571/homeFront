import axios from 'axios';
import qs from 'qs';


// axios.defaults.baseURL = "http://192.168.1.15:3000/";
axios.defaults.baseURL = "http://129.211.51.250:3000/";
axios.defaults.timeout = 5000;
// const FDFSURL=process.env.FDFS_ENDPOINT;
/** d
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */


axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
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

export function issueEdit(data) {
  return post('/api/issues/detail',data);
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
