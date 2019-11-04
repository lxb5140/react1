import React from 'react';
import axios from 'axios';
import { Layout, Menu} from 'antd';
import Topnav from './Topnav';
import Smstable from './Smstable';
import "./Smstask.css"
const { Sider, Content } = Layout;
class Smstask extends React.Component{
    constructor(){
        super()
        this.state={
            mode: 'inline',
            theme: 'light',
            res1:'',
            key:'',
            status:'',
            time_section1:'',

        }
    }
    UNSAFE_componentWillMount(){
        this.axiosget();
    }
    axiosget=(value)=>{
        var value1=value?value:''
        var url='/getMarketingSmsList?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+value1;
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
        var key=value.key;

        key=key?'&title='+key:'';
        this.setState({key,status:'',time_section1:''})
        console.log(key);
        this.axiosget(key);
    }
    // 状态
    statuschange=(status)=>{
        var $=this.state;
        var status1=status?"&status="+status:'';
        this.setState({status});
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
        var a='/getMarketingSmsListExcel?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+this.state.key+this.state.status+this.state.time_section1
        
        window.location.href=a;
    }
    render(){
        var leftList=this.state.res1.leftList;
        // console.log(leftList)
        return(
            <div>
                <Layout>
                    <Sider style={{marginRight:"56px",minWidth:'256px',maxWidth:'256px'}}>
                        <Menu
                            style={{ width: 256,height:'100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode={this.state.mode}
                            theme={this.state.theme}
                        >
                            {
                                leftList&&leftList.map((item)=>{
                                    return(
                                        <Menu.Item key={item} className="itemcss" onClick={this.itemchange}>
                                            {item}
                                        </Menu.Item>
                                    )
                                    
                                })
                            }
                            
                        </Menu>
                    </Sider>
                    <Content style={{backgroundColor:"rgba(255,255,255,0.78)"}}>
                        <Topnav/>
                        <Smstable res={this.state.res1} getfun={{timechange:this.timechange,pageChange1:this.pageChange1,layoutexcel:this.layoutexcel}} statuschange={this.statuschange} />
                    </Content>
                </Layout>
            </div>   
        )
    }
}
export default Smstask;