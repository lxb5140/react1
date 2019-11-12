import React from 'react';
// import {Link} from 'react-router-dom'
// import fetchJsonp from 'fetch-jsonp';
// import {BrowserRouter as Router ,Route,Link} from 'react-router-dom';
import axios from 'axios';
import UserBtn from './UserBtn';
import { Layout, Menu,Button,Icon} from 'antd';
import UserTable from './UserTable';
import './Usermsg.css';
// import { relative } from 'upath';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
// const { TreeNode, DirectoryTree } = Tree;
// const { SubMenu } = Menu;

class Usermsg extends React.Component {
    constructor(){
        super()
        this.state = {
            mode: 'inline',
            theme: 'light',
            bc:1,//编辑按钮状态
            obj:'primary',
            p1:{},//返回数据
            currentPage1:'',//分页
            type1:'',   //类型
            source_name1:'',//来源
            adminList1:'',//广告主
            time_section1:'',//时间
            users:''//用户名


        }
    }
    // 左侧编辑按钮
    btnchange=(e)=>{
        // console.log(111111111)
        if(this.state.bc){
            e.target.innerHTML="退出编辑";
            this.setState({
                bc:0,
                obj:'danger'
            })
        }else{
            e.target.innerHTML='编辑';
            
            this.setState({
                bc:1,
                obj:'primary'
        })
    }
    }
    // http请求
    UNSAFE_componentWillMount(){
                this.getii()
    }
    getii=(value)=>{
        value=value?value:'';
        var url='/getUserList?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+value;
        axios.get(url).then(res=>{
            var p1=res.data.data
            console.log(p1);
            // var count = res.count;
            // var {userGroupList,userList,}=p1;
            this.setState({
                p1
            })

        })
    }
    // 分页
    getaffiliatedTableTableList=(currentPage)=>{
        var currentPage1=currentPage?'&currentPage='+currentPage:'';
        var tip=currentPage1+this.state.time_section1+this.state.type1+this.state.source_name1+this.state.users+this.state.adminList1;
        // console.log(currentPage1)
        this.setState({currentPage1})
        this.getii(tip)
    }
    // 类型
    type_name=(type)=>{
        var type1=type?'&type_name='+type:'';
        var tip=type1+this.state.currentPage1+this.state.time_section1+this.state.source_name1+this.state.users+this.state.adminList1;
        this.setState({type1})
        // var url='/getUserList?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+;
        console.log(tip)
        this.getii(tip);
    }
    // 来源
    source_name=(source_name)=>{
        var source_name1=source_name?'&source_name='+source_name:'';
        var tip=source_name1+this.state.currentPage1+this.state.time_section1+this.state.type1+this.state.users+this.state.adminList1;
        console.log(tip)
        this.setState({source_name1})
        // console.log(source_name1)
        // var url='/getUserList?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+source_name1;
        this.getii(tip);
    }
    // 广告主
    adminList=(adminList)=>{
        var adminList1=adminList?'&admin_id='+adminList:'';
        var tip=adminList1+this.state.source_name1+this.state.currentPage1+this.state.time_section1+this.state.type1+this.state.users;
        this.setState({adminList1})
        console.log(tip)
        this.getii(tip)
    }
    // 时间选择器
    getTime=(time_section)=>{
        // console.log(time_section)
        var time_section1=time_section[0]?"&time_section="+time_section:'';
        var tip=time_section1+this.state.adminList1+this.state.source_name1+this.state.currentPage1+this.state.type1+this.state.users;
        this.setState({time_section1});
        console.log(tip)
        this.getii(tip)
    }
    // 左侧用户列
    userItem=(value)=>{
        console.log(value.key);
        var key=value.key;
        key=key==="111"?'':key;
        var users=key?"&users="+key:'';
        this.setState({
            currentPage1:'',
            type1:'',
            source_name1:'',
            adminList1:'',
            time_section1:'',
        })
        this.getii(users);

    }
    // post请求
    axiospost=(obj)=>{
        var url='/insUserGroup?token=-uAgyQH6nXDdP2HzE1yyir1Beg';
        axios.post(url,{params:obj}).then(res=>{
            console.log(res);
        })
    }
    // 新建用户组
    newusergroup=(value)=>{
        this.axiospost(value)
        console.log(value);
    }
    // 上传用户   
    // upusers=(link)=>{
    //     var link1=link?"&link="+link:'';
    //     console.log(link1)
    //     // this.getii(link1);
    // }
    // 编辑删除键
    btndel=(a)=>{
        var a1=a?"&id="+a:'';
        var url='/delUserGroup?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+a1;
        axios.get(url).then(res=>{
            console.log(res)
            this.getii()
            
        })
    }
    // 导出excel
    userlayout=()=>{
        var pck2="&pck1="+this.state.pck;
        var a='/getUserPackageExcel?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+pck2;
        // if()
        if(this.state.status)a+=this.state.status;
        if(this.state.time_section1)a+=this.state.time_section1;
        
        window.location.href=a;
    }
    userItem1=(i)=>{
        console.log(i)
    }
    render() {
        console.log(this.state.p1.isRoot)
        return (
        <div>
            
            <Layout>
                <Sider style={{marginRight:"56px",height:'1020px',}}>
                    <Menu
                        style={{ width: 264,height:'1020px',position:"relative" }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={this.state.mode}
                        theme={this.state.theme}
                        >
                        <Menu.Item key="111" onClick={this.userItem} >

                            全部用户
                            {/* <Icon type="minus-circle" style={{color:'#ff4d4f',float:'right',height:40,lineHeight:'40px'}}/> */}
                        </Menu.Item>
                        {/* <DirectoryTree  > */}
                        {
                            
                            this.state.p1.userGroupList&&this.state.p1.userGroupList.map((item)=>{
                                if(item.group.length===0){
                                    return(
                                        <Menu.Item key={item.id} onClick={this.userItem}>
                                            {/* <Link to="/web/Usermsg"> */}
                                            {item.name}
                                            <Icon type="minus-circle"  onClick={()=>this.btndel(item.id)} style={{display:this.state.bc?"none":"inline",color:'#ff4d4f',float:'right',height:40,lineHeight:'40px',zIndex:999}}/>
                                            {/* </Link> */}
                                        </Menu.Item>
                                            
                                    )
                                }else{
                                    return(
                                        <SubMenu style={{textAlign:"center",fontSize:'14px',fontFamily:'PingFangSC-Regular'}} key={item.id} title={
                                            <span>
                                                <span>{item.name}</span>
                                                <Icon type="minus-circle"
                                                        className='iconshow1'  
                                                        style={{display:this.state.bc?"none":"inline"}} 
                                                        onClick={()=>this.btndel(item.id)}
                                                        />
                                            </span>
                                        }>
                                            {item.group.map(child=>{
                                                return(
                                                    <Menu.Item key={child.id}>{child.name}
                                                        <Icon type="minus-circle"
                                                        className='iconshow1'  
                                                        style={{display:this.state.bc?"none":"inline"}} 
                                                        onClick={()=>this.btndel(item.id)}
                                                        />
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                            
                                        </SubMenu>
                                    )
                                }
                                
                                }
                                
                            )
                        }
                        {/* </DirectoryTree> */}
                        <div style={{margin:'auto',width:'100%',position:'absolute',bottom:20,textAlign:"center"}} onClick={this.btnchange} >
                            <Button type={this.state.obj} style={{width:204,margin:"auto"}} >编辑</Button>
                        </div>
                    </Menu>
                
                </Sider>
                <Content  style={{marginLeft:'auto',background: 'rgba(255,255,255,0.78)'}}>
                    <UserBtn p1={this.state.p1} newusergroup={this.newusergroup}/>
                    <UserTable  p1={this.state.p1}
                    getfun={{getaffiliatedTableTableList:this.getaffiliatedTableTableList
                    ,type_name:this.type_name,source_name:this.source_name,
                    adminList:this.adminList,
                    getTime:this.getTime,
                    userlayout:this.userlayout
                    // upusers:this.upusers
                    }} 
                    
                    />
                </Content>
            </Layout>
            
        </div>
        )
    }
    }

export default Usermsg;