import React from 'react';
// import {Link} from 'react-router-dom'
// import fetchJsonp from 'fetch-jsonp';
// import {BrowserRouter as Router ,Route,Link} from 'react-router-dom';
import axios from 'axios';
import UserBtn from './UserBtn';
import { Layout, Menu,Button,Icon} from 'antd';
import UserTable from './UserTable';
import './Usermsg.css';
import { token1 } from '../jaxios';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
// const token="?token=_OgrzQSqzyXdP2HzE1yyir1BdQ";
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
            users:'',//用户名,
            p2:''


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
    componentDidMount(){
                this.getii()
                this.getsel()
                console.log(token1)
    }
    // 选择项请求
    getsel=(value)=>{
        value=value?value:'';
        var url='/getSelectToUser'+token1+value;
        axios.get(url).then(res=>{
            var p2=res.data.data;
            // console.log(p2)
            this.setState({p2})
        })
    }
    // 数据请求
    getii=(value)=>{
        value=value?value:'';
        var url='/getUserList'+token1+value;
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
        // console.log(tip)
        this.getii(tip);
        this.getsel(tip)
    }
    // 来源
    source_name=(source_name)=>{
        var source_name1=source_name?'&source_name='+source_name:'';
        var tip=source_name1+this.state.currentPage1+this.state.time_section1+this.state.type1+this.state.users+this.state.adminList1;
        // console.log(tip)
        this.setState({source_name1})
        // console.log(source_name1)
        // var url='/getUserList?token=-uAgyQH6nXDdP2HzE1yyir1Beg'+source_name1;
        this.getii(tip);
        this.getsel(tip)
    }
    // 广告主
    adminList=(adminList)=>{
        var adminList1=adminList?'&admin_id='+adminList:'';
        var tip=adminList1+this.state.source_name1+this.state.currentPage1+this.state.time_section1+this.state.type1+this.state.users;
        this.setState({adminList1})
        // console.log(tip)
        this.getii(tip)
        this.getsel(tip)
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
    userItem=(key)=>{
        console.log(key);
        // var key=value.key;
        var users="&users="+key
        
        this.setState({
            currentPage1:'',
            type1:'',
            source_name1:'',
            adminList1:'',
            time_section1:'',
            users
            
        })
        this.getii(users);

    }
    userItem1=(val)=>{
        var key=val.key;
        console.log(val);
        var users="&users="+'';
        // if(key==='111'){
        //     var users='';
        // }else{
        // var users="&users="+key;
        // }
        // // var key=value.key;
        // key=key==="111"?'':key;
        // var users="&users="+key;
        this.setState({
            currentPage1:'',
            type1:'',
            source_name1:'',
            adminList1:'',
            time_section1:'',
            users
            
        })
        this.getii(users);

    }
    userItem2=(val)=>{
        var users="&users="+val;
        this.setState({
            currentPage1:'',
            type1:'',
            source_name1:'',
            adminList1:'',
            time_section1:'',
            users
            
        })
        this.getii(users);

    }
    // post请求
    axiospost=(obj)=>{
        var url='/insUserGroup'+token1;
        axios.post(url,{params:obj}).then(res=>{
            // console.log(res);
            alert(res.data.message)
            window.location.reload(true);
        })
    }
    // 新建用户组
    newusergroup=(value)=>{
        console.log(value)
        this.axiospost(value)
        // console.log(value);
    }
    // 上传用户   

    // 编辑删除键
    btndel=(a)=>{
        var a1=a?"&id="+a:'';
        console.log(a1)
        var url='/delUserGroup'+token1+a1;
        axios.get(url).then(res=>{
            console.log(res)
            alert(res.data.message)
            // this.getii()
            // window.location.reload(true);
            
        })
    }
    // 导出excel
    userlayout=()=>{
        var all='';
        if(this.state.type1)all+=this.state.type1;
        if(this.state.adminList1)all+=this.state.adminList1;
        if(this.state.time_section1)all+=this.state.time_section1;
        if(this.state.users)all+=this.state.users;
        if(this.state.source_name1)all+=this.state.source_name1;
        var a='/getUserListExcel'+token1+all;
    
        console.log(a)
        window.location.href=a;
        // window.location.reload(true);s
    }
    // userItem1=(i)=>{
    //     console.log(i)
    // }
    // 生成人群包
    getcrow=(gl)=>{
        var all='';
        if(this.state.type1)all+=this.state.type1;
        if(this.state.adminList1)all+=this.state.adminList1;
        if(this.state.time_section1)all+=this.state.time_section1;
        if(this.state.users)all+=this.state.users;
        if(this.state.source_name1)all+=this.state.source_name1;
        var name="&name="+gl.c_name;
        var pck="&pck="+gl.media;
        all+=name+pck;
        var url="/insUserToPackage"+token1+all;
        axios.get(url).then(res=>{
            // console.log(res)
            alert(res.data.message)
            // window.location.reload(true);
        }).catch(err=>
            alert(err.data.message))
    }
    render() {
        // console.log(this.state.p1.isRoot)
        const {isRoot,userGroupList}=this.state.p1;
        return (
        <div>
            
            <Layout>
                <Sider style={{marginRight:"56px",height:'100%',}}>
                    <Menu
                        style={{ width:"264px",height:'1020px',position:"relative",maxHeight:1080,minHeight:768 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={this.state.mode}
                        className="menu_sty"
                        theme={this.state.theme}
                        >
                        <Menu.Item key="111" onClick={this.userItem1} >
                            <p>全部用户</p>
                            
                            {/* <Icon type="minus-circle" style={{color:'#ff4d4f',float:'right',height:40,lineHeight:'40px'}}/> */}
                        </Menu.Item>
                        {/* <DirectoryTree  > */}
                        {
                            userGroupList&&userGroupList.map((item)=>{
                                if(isRoot===1){
                                    if(item.group&&item.group.length===0){
                                        return(
                                            <Menu.Item key={item.id}
                                            //  onClick={()=>this.userItem(item.id)}
                                            >
                                                {/* <Link to="/web/Usermsg"> */}
                                                <p>{item.name} </p>                                           
                                            </Menu.Item>
                                                
                                        )
                                    }else{
                                        return(
                                            <SubMenu 
                                            style={{textAlign:"center",fontSize:'14px',fontFamily:'PingFangSC-Regular',color:'#1A2327'}} 
                                            // onClick={this.userItem}
                                            key={item.id} 
                                            title={<div> <p>{item.name}</p> {/* <Icon type="minus-circle"
                                                            className='iconshow1'  
                                                            style={{display:this.state.bc?"none":"inline"}} 
                                                            onClick={()=>this.btndel(item.id)}
                                                            /> */}
                                                </div>}>
                                                {item.group.map(child=>{
                                                        return(
                                                            <Menu.Item key={child.id}   onClick={()=>this.userItem(child.users)}>
                                                                <p>{child.name}</p>
                                                                <Icon type="minus-circle"
                                                                className='iconshow1'  
                                                                style={{display:this.state.bc?"none":"inline",textAlign:"left"}} 
                                                                onClick={()=>this.btndel(child.id)}
                                                                
                                                                />
                                                            </Menu.Item>
                                                        )
                                                })
                                            }
                                            </SubMenu>
                                        )
                                    }
                                }else{
                                    return(
                                        <Menu.Item key={item.id}  onClick={()=>this.userItem2(item.users)} >
                                            <p>{item.name}</p>
                                            <Icon type="minus-circle"
                                                                className='iconshow1'  
                                                                style={{display:this.state.bc?"none":"inline",textAlign:"left"}} 
                                                                onClick={()=>this.btndel(item.id)}
                                                                
                                                                />
                                        </Menu.Item>
                                    )
                                }
                            })
                        }
                        
                        <div style={{width:264,position:'fixed',bottom:20,textAlign:"center"}} onClick={this.btnchange} >
                            <Button type={this.state.obj} style={{width:204,margin:"auto"}} >编辑</Button>
                        </div>
                    </Menu>
                
                </Sider>
                <Content  style={{marginLeft:'auto',background: 'rgba(255,255,255,0.78)'}}>
                    <UserBtn p1={this.state.p1} newusergroup={this.newusergroup} getcrow1={this.getcrow}/>
                    <UserTable  p1={this.state.p1} p2={this.state.p2}
                    getfun={{getaffiliatedTableTableList:this.getaffiliatedTableTableList
                    ,type_name:this.type_name,source_name:this.source_name,
                    adminList:this.adminList,
                    getTime:this.getTime,
                    userlayout:this.userlayout
                    // upusers:this.upusers
                    }} 
                    style={{boxShadow: '0 5px 25px 0 rgba(234,234,234,0.50)'}}
                    />
                </Content>
            </Layout>
            
        </div>
        )
    }
    }

export default Usermsg;