import React from 'react';
import axios from 'axios';
import { Layout, Menu} from 'antd';
import Topnav from './Topnav';
import Smstable from './Smstable';
import "./Smstask.css"
import { token1 } from '../jaxios';
const { Sider, Content } = Layout;
// const token="?_OgrzQSqzyXdP2HzE1yyir1BdQ";
class Smstask extends React.Component{
    constructor(){
        super()
        this.state={
            mode: 'inline',
            theme: 'light',
            res1:'',
            key:'',
            status1:'',
            time_section1:'',

        }
    }
    UNSAFE_componentWillMount(){
        this.axiosget();
    }
    axiosget=(value)=>{
        var value1=value?value:''
        var url='/getMarketingSmsList'+token1+value1;
        axios.get(url).then(res=>{
            var res1=res.data.data
            console.log(res)
            this.setState({
                res1
            })
        })
    }
    //分页请求
    pageChange1=(currntPage)=>{
        var $=this.state;
        var currntPage1=currntPage?"&currntPage="+currntPage:'';
        if($.key)currntPage1+=$.key;
        if($.status)currntPage1+=$.status;
        if($.time_section)currntPage1+=$.time_section;
        // currntPage1=currntPage1+$.key+$.status+$.time_section;
        console.log(currntPage1)
        this.axiosget(currntPage1);
    }
    // 左侧列表
    itemchange=(value)=>{
        // var key=value.key;

        // key=key?'&title='+key:'';
        // this.setState({key,status:'',time_section1:''})
        // console.log(key);
        // this.axiosget(key);
        window.location.reload();
    }
    // 状态
    statuschange=(status)=>{
        var $=this.state;
        var status1=status?"&status="+status:'';
        this.setState({status1});
        status1+=$.key+$.time_section1
        this.axiosget(status1);
    }
    // 时间
    timechange=(time_section)=>{
        var $=this.state;
        var time_section1=time_section?"&time_section="+time_section:'';
        this.setState({time_section1})
            time_section1+=$.key+$.status;
        console.log(time_section)
        this.axiosget(time_section1);
    }
    layoutexcel=()=>{
        console.log('key:'+this.state.key,'status:'+this.state.status1,'time:'+this.state.time_section1)
        var a='/getMarketingSmsListExcel'+token1+this.state.key+this.state.status1+this.state.time_section1;
        
        window.location.href=a;
    }
    render(){
        // var leftList=this.state.res1.leftList;
        // console.log(leftList)
        return(
            <div>
                <Layout>
                    <Sider style={{marginRight:"56px",width:"13.8%"}}>
                        <Menu
                            style={{ width: '100%',minWidth:264,height:'100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode={this.state.mode}
                            theme={this.state.theme}
                        >
                           
                            <Menu.Item  className="itemcss" onClick={this.itemchange}> 短信任务列表</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{backgroundColor:"rgba(255,255,255,0.78)",width:'83.1%'}}>
                        <Topnav/>
                        <Smstable res={this.state.res1} getfun={{timechange:this.timechange,pageChange1:this.pageChange1,layoutexcel:this.layoutexcel}} statuschange={this.statuschange} />
                    </Content>
                </Layout>
            </div>   
        )
    }
}
export default Smstask;