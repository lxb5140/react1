import React from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router ,Route} from 'react-router-dom';
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
const { Header, Content } = Layout;
class App extends React.Component{

  
  render(){
    return(
      <Router>
      <Layout className="layout" style={{width:1920}}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to="/web/Page1"><div>数据管理</div>  </Link></Menu.Item>
          <Menu.Item key="2"><Link to="/web/Usermsg">用户管理</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/web/Crowdpackage">人群包管理</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/web/Smsbranch">营销管理</Link></Menu.Item>
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
      <Content style={{ padding: '0' }}>
          <Route exact path="/web" component={Page1} />
          <Route exact path="/web/Page1" component={Page1}/>
          <Route exact path="/web/Usermsg" component={Usermsg}/>
          <Route exact path="/web/Crowdpackage" component={Crowdpackage}></Route>
          <Route exact path="/web/Smstask" component={Smstask}></Route>
          <Route exact path="/web/Smsbranch" component={Smsbranch}></Route>
        {/* <Routers/> */}
      </Content>
    </Layout>
    </Router>
  )
  
}
};
export default App;