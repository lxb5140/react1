import React from 'react';
import axios from 'axios';
import{ DatePicker,Input,Modal,Button,Select,Icon,Upload,message} from 'antd';
// import { } from 'antd';
import { token1 } from '../jaxios';

import './UserBtn.css';
const {  RangePicker} = DatePicker;
const { Option } = Select;
// const token="?token=_OgrzQSqzyXdP2HzE1yyir1BdQ";
class UserBtn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
                modal1Visible: false,
                modal2Visible: false,
                modal3Visible: false,
                source:'',
                admin:'',
                time:'',
                age:'',
                sex:'',
                region:'',
                name:'',
                type_name:'',
                media:'',//生成人群包 媒体
                matetype:'',
                c_name:'',
                list:'',//选项列表
                // 新建弹框联动
                age1:'',
                admin_id1:'',
                region1:'',
                sex1:'',
                type_name1:'',
                source_name1:''

            
        }
    }
    componentDidMount(){
        this.axiosops();
    }
    onChange=(date, dateString)=> {
    // console.log(date, dateString)
    }
    // 控制弹框显示
    setModal1Visible(modal1Visible){
        
        this.setState({ modal1Visible });
        
    }
    
    // 用户上传
    uploaddone(modal1Visible) {
        
        if(this.state.link){
            var link1="&link="+this.state.link;
            var url="/insUser"+token1+link1;
            axios.get(url).then(res=>{alert(res.data.message);}).then(()=>{window.location.reload(1)})
            this.setState({ modal1Visible,link:'' });
        }else{
            message.error('请上传文件')
        }
        
            // console.log(1111)
            // this.props.getfun.upusers(this.state.link);
            // if(info.file.status === 'done')

        
    }
    // 生成人群包
    setModal2Visible(modal2Visible) {
        
        this.setState({ modal2Visible });
        
    }
    // 新建用户
    newusergroup=(modal3Visible)=>{
        // var sourceList=this.props.p1.sourceList;
        // var adminList=this.props.p1.adminList;
        var $=this.state;
        var gl={
            source:$.source,
            admin:$.admin,
            time:$.time,
            age:$.age,
            sex:$.sex,
            region:$.region,
            name:$.name,
            type_name:$.type_name
        }
        
        // console.log(gl);
        this.props.newusergroup(gl);
        this.setState({ 
            modal3Visible,
            source:'',
            admin:'',
            time:'',
            age:'',
            sex:'',
            region:'',
            name:'',
            link:'',
            type_name:'',
            age1:'',
            admin_id1:'',
            region1:'',
            sex1:'',
            type_name1:'',
            source_name1:''
        });
    }
    
    // 新建弹框显示隐藏
    newusergroupshow=(modal3Visible)=>{
        // this.axiosops()
        console.log(this.state.list)
        this.setState({modal3Visible})
    }
    newusergroupshow1=(modal3Visible)=>{
        // window.location.reload()
        // console.log(e.target.nodeName)

            this.setState({modal3Visible,age1:'',admin_id1:'', region1:'',sex1:'', type_name1:'',source_name1:''})


    }
    // 新建弹框
    axiosops=(val)=>{
        var url='/getSelect'+token1;
        if(val)url+=val;   
        axios.get(url).then(res=>{
            // console.log(res.data.data.typeList)
            this.setState({list:res.data.data})
        })
    }
    // 新建弹框  类型
    typeChange=(type_name)=>{
        var $=this.state;
        var type_name1=type_name?'&type_name='+type_name:'';
        this.setState({type_name,type_name1})
        type_name1+=$.region1+$.sex1+$.source_name1+$.age1+$.admin_id1;
        console.log(type_name1);
        this.axiosops(type_name1);
    }
    // 新建弹框sourceChange
    sourceChange=(source)=>{
        var $=this.state;
        var source_name1=source?'&source_name='+source:'';
        source_name1+=$.region1+$.sex1+$.type_name1+$.age1+$.admin_id1;
        console.log(source);
        this.setState({source,source_name1})
        this.axiosops(source_name1);
    }
    sourceChange=(source)=>{
        var source_name1=source?'&source_name='+source:'';
        this.setState({source,source_name1})

    }
    // 新建弹框adminChange
    adminChange=(admin)=>{
        console.log(admin);
        var $=this.state;
        var admin_id1=admin?'&admin_name='+admin:'';
        admin_id1+=$.region1+$.sex1+$.type_name1+$.source_name1+$.age1;
        this.setState({admin,admin_id1})
        this.axiosops(admin_id1);
    }
    adminChange1=(admin)=>{
        var admin_id1=admin?'&admin_name='+admin:'';
        this.setState({admin,admin_id1})
    }
    // 新建弹框 时间选择
    timeChange=(i,time)=>{
        console.log(time);
        this.setState({time})
    }
    // 新建弹框 年龄
    ageChange=(age)=>{
        console.log(age);
        var $=this.state;
        var age1=age?'&age='+age:'';
        this.setState({age,age1})
        age1+=$.region1+$.sex1+$.type_name1+$.source_name1+$.admin_id1;
        this.axiosops(age1);
    }
    ageChange1=(age)=>{
        console.log(age);
        var age1=age?'&age='+age:'';
        this.setState({age,age1})
    }
    //新建弹框 性别
    sexChange=(sex)=>{
        var $=this.state;
        var sex1=sex?'&sex='+sex:'';
        this.setState({sex,sex1})
        sex1+=$.region1+$.age1+$.type_name1+$.source_name1+$.admin_id1;
        console.log(sex);
        this.axiosops(sex1);
    }
    // 新建弹框 地域
    regionChange=(region)=>{
        console.log(region);
        var $=this.state;
        var region1=region?'&region='+region:'';
        this.setState({region,region1});
        region1+=$.sex1+$.age1+$.type_name1+$.source_name1+$.admin_id1;
        this.axiosops(region1);
    }
    regionChange=(region)=>{
        var region1=region?'&region='+region:'';
        this.setState({region,region1});
    }
    // 新建弹框 组名称co
    groupChange=(e)=>{
        console.log(e.target.value);
        this.setState({name:e.target.value})
    }
    showtip=(info)=>{
        if (info.file.status === 'done'){

            var link=info.file.response.data.link;
            console.log(link)
            this.setState({link})
        }
    }
    // 生成人群包
    getmedia=(media)=>{
        var matetype=media==="2"?"手机号-MD5":"手机号-SHA256";
        this.setState({media,matetype})
    }
    // 生成人群包 组名称
    getc_name=(e)=>{
        this.setState({c_name:e.target.value})
    }
    // 生成弹框 生成
    getcrow(modal2Visible){
        this.setState({modal2Visible})
        var gl={media:this.state.media,c_name:this.state.c_name}
        this.props.getcrow1(gl)
    }
    render(){
        var sourceList=this.state.list.sourceList;
        var adminList=this.state.list.adminList;
        var ageList=this.state.list.ageList;
        var regionList=this.state.list.regionList;
        var sexList=this.state.list.sexList;
        var typeList=this.state.list.typeList;
        // var $=this.state.list;
        // console.log(this.props.p1.isRoot)
        return(
            //用户管理顶部按钮
            <div className='topDiv'>
                <Button type="primary" className="btnBtn" onClick={() => this.setModal1Visible(true)}>上传用户</Button>
                <Modal
                    title="上传用户"
                    centered
                    destroyOnClose
                    maskClosable={false}
                    visible={this.state.modal1Visible}
                    onOk={() => this.uploaddone(false)}
                    onCancel={() => this.setModal1Visible(false)}
                    className={['modals','btn140']}
                    okText="上传"
                    cancelText="取消"
                    >
                    <div>
                        <div>
                            <Upload name="excelFile" accept=".xls" action="/readExcel?token=-uAgyQH6nXDdP2HzE1yyir1Beg"onChange={this.showtip}>
                            <Button type="primary" style={{width:140}}>点击上传Excel</Button>
                            </Upload>
                        </div> 
                        <div className='text1'>
                            <p>文件格式说明:</p>
                            <p>1.请根据表格自有或者媒体渠道的表格样式及抬头顺序编辑Excel表</p>
                            <p>2.ID列不需要编辑在Excel内，表格第一列为【来源】。</p>
                        </div>
                    </div>    
                </Modal>
                <Button type="primary" className="btnBtn" onClick={()=>this.newusergroupshow(true)}>新建用户组</Button>  
                {/* 弹框 */}
                <Modal
                    title="新建用户组"
                    maskClosable="false"
                    centered
                    destroyOnClose
                    maskClosable={false}
                    visible={this.state.modal3Visible}
                    onOk={() => this.newusergroup(false)}
                    onCancel={() => this.newusergroupshow1(false)}
                    destroyOnClose
                    className='modals'
                    style={{width:408}}
                    footer={<Button type="primary" onClick={()=>this.newusergroup(false)}>新建</Button>}
                            
                    >
                    <div>
                        <span>类型</span>
                        <Select defaultValue="" allowClear={true} style={{ width: 240,marginLeft:'20px' }} onChange={this.typeChange}>
                            {
                                typeList&&typeList.map(item=>{
                                    // console.log(item)
                                    return(<Option key={item}>{item}</Option>)
                                })
                            }        
                        </Select>
                    </div>
                    <div>
                        <span>来源</span>
                        <Select  mode="multiple" allowClear={true}  showArrow style={{ width: 240,marginLeft:'20px' }} onBlur={this.sourceChange} onChange={this.sourceChange}>
                            {
                                sourceList&&sourceList.map(item=>{
                                    return(

                                        <Option key={item}>{item}</Option>
                                    )
                                })
                            }
                            
                        </Select>
                    </div>
                    <div style={{display:this.props.p1.isRoot?'block':'none'}}>
                        <span>广告主</span>
                        <Select mode="multiple" allowClear={true} showArrow style={{ width: 240,marginLeft:'20px' }} onBlur={this.adminChange} onChange={this.adminChange1}>
                            {
                                adminList&&adminList.map(item=>{
                                    return( 
                                        <Option key={item}>{item}</Option>
                                    )
                                })
                            }
                            
                        </Select>
                    </div>
                    <div>
                        <span>时间</span>
                        
                        <RangePicker allowClear={true} className="date_sty" suffixIcon={<Icon type="down" />}  placeholder="" separator="" style={{width:240,marginLeft:'20px',textAlign:"left" }} onChange={this.timeChange} />
                    </div>
                    <div>
                        <span>地域</span>
                        <Select showArrow allowClear={true}  mode="multiple" style={{ width: 240,marginLeft:'20px' }} onBlur={this.regionChange} onChange={this.regionChange1}>
                            {
                                regionList&&regionList.map(item=>{
                                    return(
                                        <Option key={item}>{item}</Option>
                                    )
                                })
                            }
                            
                    
                        </Select>
                    </div>
                    <div>
                        <span>年龄</span>
                        <Select showArrow allowClear={true}  mode="multiple" style={{ width: 240,marginLeft:'20px' }} onBlur={this.ageChange} onChange={this.ageChange1}>
                                {
                                ageList&&ageList.map(
                                    item=>{
                                        return(
                                            <Option key={item}>{item}</Option>
                                        )
                                    }
                                )
                                }
                            {/* <Option value="[18,23]">18-23</Option>
                            <Option value="[24,30]">24-30</Option>
                            <Option value="[31,40]">31-40</Option>
                            <Option value="[41,49]">41-49</Option>
                            <Option value="[50]">50+</Option> */}
                        </Select>
                    </div>
                    <div>
                        <span>性别</span>
                        <Select  allowClear={true}   style={{ width: 240,marginLeft:'20px' }} onChange={this.sexChange}>
                            {
                                sexList&&sexList.map(item=>{
                                    return(
                                        <Option key={item}>{item===1?"男":"女"}</Option>
                                    )
                                })
                            }
                            {/* <Option value="2">女</Option>
                            <Option value="">未知</Option> */}
                            
                        </Select>
                    </div>
                    <div>
                        <span>组名称</span>
                        <Input style={{ width: 240,marginLeft:'20px' }} onChange={this.groupChange} />
                        {/* <Select  showArrow  style={{ width: 240,marginLeft:'20px' }} onChange={this.groupChange}>
                            <Option value="腾讯">腾讯</Option>
                            <Option value="报读">报读</Option>
                            <Option value="头条">头条</Option>
                            <Option value="朋友圈">朋友圈</Option>
                        </Select> */}
                    </div>
                </Modal>
                <Button type="primary" style={{marginRight:'20px',float:'right'}} onClick={() => this.setModal2Visible(true)}>生成人群包</Button> 
                <Modal
                    title="生成人群包"
                    centered
                    destroyOnClose
                    maskClosable={false}
                    visible={this.state.modal2Visible}
                    onOk={() => this.getcrow(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    className='modals'
                    okText="生成"
                    cancelText="取消"
                    >
                    <div>
                        <span>媒体选择</span>
                        <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.getmedia}>
                            <Option value="1">头条</Option>
                            <Option value="2">腾讯</Option>
                            <Option value="3">百度</Option>
                            <Option value="4">朋友圈</Option>
                        </Select>
                    </div>
                    <div>
                        <span>匹配类型</span>
                        <Input disabled  style={{ width: 240,marginLeft:'20px' }} value={this.state.matetype}  />
                    </div>
                    <div>
                        <span>用户组名称</span>
                        <Input disabled  style={{ width: 240,marginLeft:'20px' }} value={this.props.groupname}  />
                    </div>
                    <div>
                        <span>人群包名称</span>
                        <Input  style={{ width: 240,marginLeft:'20px' }} onBlur={this.getc_name}/>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default UserBtn;