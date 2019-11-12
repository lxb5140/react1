import React from 'react';
import {Link} from 'react-router-dom';
import {HashRouter,Route} from 'react-router-dom';
import './App.css';
import { Layout, Menu} from 'antd';
// import Routers from './router'
// import Home from './Home';
import Page1 from './Page1';
import Usermsg from './usermsg/Usermsg';
import Crowdpackage from './Crowdpackage/Crowdpackage';
import Smstask from './Smstask/Smstask';
import Smsbranch from './Smstask/Smsbranch'
import { relative } from 'path';
// import { createHashHistory,createBrowserHistory } from 'history';
// const customHistory = createHashHistory();
const { Header, Content } = Layout;
class App extends React.Component{

  
  render(){
    return(
      <HashRouter >
      <Layout className="layout" style={{width:'100%',minWidth:1280,maxHeight:1080,minHeight:768}}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
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
            <div style={{height:'20px'}}>运营人员-Operator01</div>
            <div style={{height:'20px'}}>ID:283928</div>
          </div>
          
        </Menu>
      </Header>
      <Content style={{ padding: '0',maxHeight:1080,minHeight:768,height:'100%',backgroundColorbackground:' rgba(255,255,255,0.78)' }}>
          <Route  path="/" component={Page1} >
            <Route exact path="/Page1" component={Page1}/>
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