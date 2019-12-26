import React from 'react';
import {Link} from 'react-router-dom';
import {HashRouter,Route} from 'react-router-dom';
import './App.css';
import { Layout, Menu} from 'antd';
import Page1 from './Page1';
import Usermsg from './usermsg/Usermsg';
import Crowdpackage from './Crowdpackage/Crowdpackage';
import Smstask from './Smstask/Smstask';
import Smsbranch from './Smstask/Smsbranch'
import { relative } from 'path';
import axios from 'axios';
// import { token1 } from './jaxios';
// import { createHashHistory,createBrowserHistory } from 'history';
// const customHistory = createHashHistory();
const { Header, Content } = Layout;
class App extends React.Component{
  constructor(){
    super()
    this.state={
      name:''
    }
  }
  componentDidMount(){
    let customers_id=window.location.search;
    let url='/getTokenCustomers'+customers_id;
    // let makeReload=localStorage.getItem('makeReload')
    // console.log(makeReload)
    // if(!makeReload||makeReload===2){
    //   localStorage.setItem('makeReload',1)
    //   // alert(localStorage.getItem('makeReload'))
    //   window.location.reload()
    // }else{
    //   localStorage.removeItem("makeReload",2)
    // }
    
    axios.get(url).then(res=>{
      console.log(res.data.data.token)
      let token1="?token="+res.data.data.token
      sessionStorage.setItem("token",token1)
      return token1
      }).then(token1=>{
        let makeReload=localStorage.getItem('makeReload')
        console.log(makeReload)
        if(!makeReload){
          localStorage.setItem('makeReload',1)
          // alert(localStorage.getItem('makeReload'))
          window.location.reload()
        }else{
          localStorage.removeItem("makeReload")
        }
        var url="/getAdminRow"+token1;
        axios.get(url).then(res=>{
          console.log(res)
          var {name,id}=res.data.data;
          this.setState({name,id})
      })
    })
    // var url="/getAdminRow"+token1;

    // axios.get(url).then(res=>{
    //   console.log(res)
    //   var {name,id}=res.data.data;
    //   this.setState({
    //     name,id
    //   })
    // })
  }
  render(){
    return(
      <HashRouter >
      <Layout className="layout" style={{width:'100%',minWidth:1280,maxHeight:1080,minHeight:768}}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to="/Page1"><div>数据管理</div>  </Link></Menu.Item>
          <Menu.Item key="2"><Link to="/Usermsg">用户管理</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/Crowdpackage">人群包管理</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/Smsbranch">营销管理</Link></Menu.Item>
          {/* <Menu.Item key="5">
            {/* <div>ID:283928</div> */}
            {/* <div>运营人员-Operator01</div>
          </Menu.Item> */} 
          <div style={{float:"right",height:60,position:relative,top:10}}>
        <div style={{height:'20px'}}>{this.state.name}</div>
        <div style={{height:'20px'}}>ID:{this.state.id}</div>
          </div>
          
        </Menu>
      </Header>
      <Content style={{ padding: '0',maxHeight:1080,minHeight:768,height:'100%',backgroundColorbackground:' rgba(255,255,255,0.78)' }}>
          <Route  path="/" component={Page1} >
            <Route  path="/Page1" component={Page1}/>
            <Route exact path="/Usermsg" component={Usermsg}/>
            <Route exact path="/Crowdpackage" component={Crowdpackage}/>
            <Route exact path="/Smstask" component={Smstask}/>
            <Route exact path="/Smsbranch" component={Smsbranch}/>
          </Route>
        {/* <Routers/> */}
      </Content>
    </Layout>
    </HashRouter>
  )
  
}
};
export default App;