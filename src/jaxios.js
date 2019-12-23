// import axios from "axios";
// const token="?token=-uAgyQH6nXDdP2HzE1yyir1Beg";

// export const getaxios= {
//     // 用户管理数据请求
//         getii(val){
//             val=val?val:'';
//             var url='/getUserList'+token+val;
//             return axios.get(url)
//             // .then(res=>{
//             //     var p1=res.data.data;
//             //     console.log(p1)
//             //     // this.setState({p1})
//             //     return res
//             // })
//         },
//         getsel(val) {
//             val=val?val:'';
//             var url='/getSelectToUser'+token+val;
//             return axios.get(url)
//             // .then(res=>{
//             //     var p2=res.data.data;
//             //     // console.log(p2)
//             //     // this.setState({p2})
//             //     return p2
//             // })
//         },
//         btndel(a){
//             var a1=a?"&id="+a:'';
//             console.log(a1)
//             var url='/delUserGroup'+token+a1;
//             axios.get(url)
//         },
//         gettoken(){
//             return token
//         }
        

//     }
//     export const postaxios={
//         axiospost(obj){
//             var url='/insUserGroup'+token;
//             return axios.post(url,{params:obj})
//         }
//     }
function  gettoken(){
  var a=localStorage.getItem("token")
      // a=JSON.parse(a);
      // var {api_token}=a
  // localStorage.setItem("temp",'arr')
  // var b=localStorage.getItem("temp")
  // console.log("a:"+api_token);
  return a

}
    export  const token1=gettoken()
    
