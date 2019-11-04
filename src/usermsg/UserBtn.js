import React from 'react';
import axios from 'axios';
import{ DatePicker,Input,Modal,Button,Select,Icon,Upload,message} from 'antd';
// import { } from 'antd';


import './UserBtn.css';
const {  RangePicker} = DatePicker;
const { Option } = Select;
class UserBtn extends React.Component{
    constructor(){
        super()
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
                type_name:''
            
        }
    }
    
    onChange=(date, dateString)=> {
    console.log(date, dateString)
    }
    // 控制弹框显示
    setModal1Visible(modal1Visible){
        this.setState({ modal1Visible });
    }
    // 用户上传
    uploaddone(modal1Visible) {
        
        if(this.state.link){
            var link1="&link="+this.state.link;
            var url="/insUser?token=-uAgyQH6nXDdP2HzE1yyir1Beg"+link1;
            axios.get(url).then(res=>console.log(res))
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
            type_name:''
        });
        // return(
        //     <Modal
        //             title="新建用户组"
        //             centered
        //             visible={true}
        //             onOk={() => this.newusergroup(false)}
        //             onCancel={() => this.newusergroup(false)}
        //             className='modals'
        //             style={{width:408}}
        //             footer={<Button type="primary" onClick={()=>this.newusergroup(false)}>新建</Button>}
                            
        //             >
        //             <div>
        //                 <span>类型</span>
        //                 <Select defaultValue="全部" style={{ width: 240,marginLeft:'20px' }} onChange={this.handleChange}>
        //                     <Option value="自有">自有</Option>
        //                     <Option value="媒体">媒体</Option>
                        
        //                 </Select>
        //             </div>
        //             <div>
        //                 <span>来源</span>
        //                 <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.sourceChange}>
        //                     {
        //                         sourceList&&sourceList.map(item=>{
        //                             return(

        //                                 <Option key={item}>{item}</Option>
        //                             )
        //                         })
        //                     }
                            
        //                 </Select>
        //             </div>
        //             <div>
        //                 <span>广告主</span>
        //                 <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.adminChange}>
        //                     {
        //                         adminList&&adminList.map(item=>{
        //                             return( 
        //                                 <Option key={item.name}>{item.name}</Option>
        //                             )
        //                         })
        //                     }
                            
        //                 </Select>
        //             </div>
        //             <div>
        //                 <span>时间</span>
                        
        //                 <RangePicker suffixIcon={<Icon type="down" />}  placeholder="" separator="" style={{width:240,marginLeft:'20px' }} onChange={this.timeChange} />
        //             </div>
        //             <div>
        //                 <span>地域</span>
        //                 <Select showArrow  mode="multiple" style={{ width: 240,marginLeft:'20px' }} onChange={this.regionChange}>
        //                     <Option value="001">全部</Option>
                    
        //                 </Select>
        //             </div>
        //             <div>
        //                 <span>年龄</span>
        //                 <Select showArrow  mode="multiple" style={{ width: 240,marginLeft:'20px' }} onChange={this.ageChange}>
        //                     <Option value="001">18-23</Option>
        //                     <Option value="002">24-30</Option>
        //                     <Option value="003">31-40</Option>
        //                     <Option value="004">41-49</Option>
        //                     <Option value="005">50+</Option>
        //                 </Select>
        //             </div>
        //             <div>
        //                 <span>性别</span>
        //                 <Select defaultValue="全部"  style={{ width: 240,marginLeft:'20px' }} onChange={this.sexChange}>
        //                     <Option value="001">男</Option>
        //                     <Option value="002">女</Option>
        //                     <Option value="003">未知</Option>
                            
        //                 </Select>
        //             </div>
        //             <div>
        //                 <span>组名称</span>
        //                 <Select  showArrow  style={{ width: 240,marginLeft:'20px' }} onChange={this.groupChange}>
        //                     <Option value="腾讯">腾讯</Option>
        //                     <Option value="报读">报读</Option>
        //                     <Option value="头条">头条</Option>
        //                     <Option value="朋友圈">朋友圈</Option>
        //                 </Select>
        //             </div>
        //         </Modal>
        // )
    }
    // 新建弹框  类型
    typeChange=(type_name)=>{
        console.log(type_name);
        this.setState({type_name})
    }
    // 新建弹框sourceChange
    sourceChange=(source)=>{
        console.log(source);
        this.setState({source})
    }
    // 新建弹框adminChange
    adminChange=(admin)=>{
        console.log(admin);
        this.setState({admin})
    }
    // 新建弹框 时间选择
    timeChange=(i,time)=>{
        console.log(time);
        this.setState({time})
    }
    // 新建弹框 年龄
    ageChange=(age)=>{
        console.log(age);
        this.setState({age})
    }
    //新建弹框 性别
    sexChange=(sex)=>{
        console.log(sex);
        this.setState({sex})
    }
    // 新建弹框 地域
    regionChange=(region)=>{
        console.log(region);
        this.setState(region);
    }
    // 新建弹框 组名称co
    groupChange=(name)=>{
        console.log(name);
        this.setState({name})
    }
    showtip=(info)=>{
        if (info.file.status === 'done'){

            var link=info.file.response.data.link;
            console.log(link)
            this.setState({link})
        }
    }
    
    render(){
        var sourceList=this.props.p1.sourceList;
        var adminList=this.props.p1.adminList;
        console.log(this.props.p1)
        return(
            //用户管理顶部按钮
            <div className='topDiv'>
                <Button type="primary" className="btnBtn" onClick={() => this.setModal1Visible(true)}>上传用户</Button>
                <Modal
                    title="上传用户"
                    centered
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
                <Button type="primary" className="btnBtn" onClick={()=>this.newusergroup(true)}>新建用户组</Button>  
                {/* 弹框 */}
                <Modal
                    title="新建用户组"
                    centered
                    visible={this.state.modal3Visible}
                    onOk={() => this.newusergroup(false)}
                    onCancel={() => this.newusergroup(false)}
                    className='modals'
                    style={{width:408}}
                    footer={<Button type="primary" onClick={()=>this.newusergroup(false)}>新建</Button>}
                            
                    >
                    <div>
                        <span>类型</span>
                        <Select defaultValue="全部" style={{ width: 240,marginLeft:'20px' }} onChange={this.typeChange}>
                            <Option value="自有">自有</Option>
                            <Option value="媒体">媒体</Option>
                        
                        </Select>
                    </div>
                    <div>
                        <span>来源</span>
                        <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.sourceChange}>
                            {
                                sourceList&&sourceList.map(item=>{
                                    return(

                                        <Option key={item}>{item}</Option>
                                    )
                                })
                            }
                            
                        </Select>
                    </div>
                    <div>
                        <span>广告主</span>
                        <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.adminChange}>
                            {
                                adminList&&adminList.map(item=>{
                                    return( 
                                        <Option key={item.name}>{item.name}</Option>
                                    )
                                })
                            }
                            
                        </Select>
                    </div>
                    <div>
                        <span>时间</span>
                        
                        <RangePicker suffixIcon={<Icon type="down" />}  placeholder="" separator="" style={{width:240,marginLeft:'20px' }} onChange={this.timeChange} />
                    </div>
                    <div>
                        <span>地域</span>
                        <Select showArrow  mode="multiple" style={{ width: 240,marginLeft:'20px' }} onChange={this.regionChange}>
                            <Option value="001">全部</Option>
                    
                        </Select>
                    </div>
                    <div>
                        <span>年龄</span>
                        <Select showArrow  mode="multiple" style={{ width: 240,marginLeft:'20px' }} onChange={this.ageChange}>
                            <Option value="001">18-23</Option>
                            <Option value="002">24-30</Option>
                            <Option value="003">31-40</Option>
                            <Option value="004">41-49</Option>
                            <Option value="005">50+</Option>
                        </Select>
                    </div>
                    <div>
                        <span>性别</span>
                        <Select defaultValue="全部"  style={{ width: 240,marginLeft:'20px' }} onChange={this.sexChange}>
                            <Option value="001">男</Option>
                            <Option value="002">女</Option>
                            {/* <Option value="003">未知</Option> */}
                            
                        </Select>
                    </div>
                    <div>
                        <span>组名称</span>
                        <Select  showArrow  style={{ width: 240,marginLeft:'20px' }} onChange={this.groupChange}>
                            <Option value="腾讯">腾讯</Option>
                            <Option value="报读">报读</Option>
                            <Option value="头条">头条</Option>
                            <Option value="朋友圈">朋友圈</Option>
                        </Select>
                    </div>
                </Modal>
                <Button type="primary" style={{marginRight:'20px',float:'right'}} onClick={() => this.setModal2Visible(true)}>生成人群包</Button> 
                <Modal
                    title="生成人群包"
                    centered
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    className='modals'
                    okText="生成"
                    cancelText="取消"
                    >
                    <div>
                        <span>媒体选择</span>
                        <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.handleChange}>
                            <Option value="001">腾讯</Option>
                            <Option value="002">报读</Option>
                            <Option value="003">头条</Option>
                            <Option value="004">朋友圈</Option>
                        </Select>
                    </div>
                    <div>
                        <span>匹配类型</span>
                        <Input disabled  style={{ width: 240,marginLeft:'20px' }} value="SHA=256"  />
                    </div>
                    <div>
                        <span>人群包名称</span>
                        <Input  style={{ width: 240,marginLeft:'20px' }} />
                    </div>
                </Modal>
            </div>
        )
    }
}
export default UserBtn;