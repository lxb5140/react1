import React from 'react';
import axios from 'axios';
import { Menu , Select,Button,Modal,Input,Upload} from 'antd';
// import Oclick from '../oclick';
import Crowdtable from './Crowdtable';
import './Crowdpackage.css';
import { DatePicker } from 'antd';
// import Crowselect from './Crowselect';
import { token1 } from '../jaxios';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;
// const token="?token=_OgrzQSqzyXdP2HzE1yyir1BdQ";
// const { SubMenu } = Menu;
class Crowdpackage extends React.Component{
    constructor(){
        super()
        this.state={
            value:'类型选择',
            children : [],
            data:'',
            columns : [
                {
                    title: '',
                    dataIndex: 'name',
                },
                {
                    title: '来源',
                    dataIndex: 'age',
                },
                {
                    title: '类型',
                    dataIndex: 'address',
                },{
                    title: '姓名',
                    dataIndex: 'name1',
                },
                {
                    title: '电话',
                    dataIndex: 'age1',
                },
                {
                    title: '广告主',
                    dataIndex: 'address1',
                },
                {
                    title: '提交时间',
                    dataIndex: 'name2',
                },
                {
                    title: '地域',
                    dataIndex: 'age2',
                },
                {
                    title: '年龄',
                    dataIndex: 'address2',
                },
                {
                    title: '性别',
                    dataIndex: 'address3',
                }
                ],
            
            newcrow:false  ,
            current: '1',
            pck:'&pck=1',//广告主   
            status:'',//状态
            time_section:'',//时间
            type:'',//类型
            pck1:'' ,   
            matetype:'',//弹框数据类型   
            name:'',
            text_link:'',
            typevalue:'类型选择',
            upload_num:'',
            pck2:'',
            encrypte:''//加密类型
            // statustype:'类型选择'
        };
    }
    
    
    componentDidMount(){
        var a=this.state.pck;
        this.axioscrowd(a)
    }
    // 二级导航
    handleClick = e => {
        console.log('click ', e.key);
        var pck='&pck='+e.key;
        this.setState({
            pck,
            status:'',
            time_section:'',
            type:'' ,
            typevalue:'类型选择',
            // handleClick:''
            current: e.key,
        
        })
        this.axioscrowd(pck);
        // this.setState({
        
        // pck
        // });
    };
    // 弹框上传
    crowdchange(newcrow){
        console.log(this.state.encrypte)
        this.setState({newcrow,pck2:'',pck1:'',encrypte:''})
    }
    // 请求函数
    axioscrowd(i){
        var i1=i?i:'';
        // console.log(i)
        var url='/getUserPackage'+token1+i1;
        axios.get(url).then(res=>{
            var data=res.data.data;
            console.log(data);
            this.setState({data})
        }).catch(err=>console.log(err))
    }  
    // 状态改变
    statusChange=(value)=>{
        console.log(value)
        var $=this.state;
        var statustype=value;
        var status=value?'&status='+value:'';
        this.setState({status,statustype})
        status=status+$.pck+$.type+$.time_section;
        console.log(status)
        this.axioscrowd(status);
    } 
    // 类型改变
    typeChange=(value)=>{
        console.log(value);
        var $=this.state;
        var typevalue=value;
        var type=value?'&type='+value:'';
        var type1=type+$.pck+$.status+$.time_section;
        this.setState({type,typevalue});
        this.axioscrowd(type1);
    }
    // 时间改变
    timeChange=(dates, dateStrings)=>{
        var $=this.state;
        var time_section=dateStrings?"&time_section="+dateStrings:'';
        var time_section1=time_section+$.pck+$.status+$.type
        console.log(time_section1)
        this.axioscrowd(time_section1)
    }
    // 分页改变
    pageChange=(currentPage)=>{
        var $=this.state;
        var currentPage1=currentPage?'&currentPage='+currentPage:'';
        // console.log(currentPage1)
        currentPage1=$.time_section+$.pck+$.status+$.type+currentPage1
        this.axioscrowd(currentPage1)
    }
    // 行删除功能
    rowdel=(id)=>{
        if(id){
            var id1="&id="+id;
            console.log(id1)
            var url='/delUserPackage'+token1+id1;
            axios.get(url).then(res=>{
            // var data=res.data.data;
            // console.log(res);
            alert(res.data.message)
            // this.setState({data})
            if(res.data.code===0){
                var $=this.state;
                var td=$.time_section+$.pck+$.status+$.type
                console.log('type:'+$.type,'tiem:'+$.time_section,'pck:'+$.pck,$.status)
                this.axioscrowd(td)
            }
            
        }).catch(err=>console.log(err))

        }
    }
    // tohref=()=>{
    //     location.href(/)
    // }
    // 新建人群包
    //媒体选项
    mediachange=(pck1)=>{
        console.log(pck1)
        var matetype=pck1==="2"?"MD5加密":"SHA256加密";
        var pck2="&pck="+pck1;
        this.setState({pck1,matetype,pck2})
    }
    // 是否加密
    encrypteChange=(val)=>{
        console.log(val)
        this.setState({encrypte:val})
    }
    // 输入名称
    getname=(e)=>{
        console.log(e.target.value);
        this.setState({name:e.target.value})

    }
    // zip上传
    zipchange=(info)=>{
        console.log(this.state.pck2)
        if (info.file.status === 'done'){
            var data=info.file.response.data;
            var text_link=data.text_link;
            var upload_num=data.upload_num;
            // var textContent=data.textContent;
            console.log("11"+text_link) 
            this.setState({text_link,upload_num})
    }
}
    //生成人群包上传
upchange=(newcrow)=>{
    var gl={
        pck:this.state.pck1 ,   
        name:this.state.name,
        link_txt:this.state.text_link,
        upload_num:this.state.upload_num,
        encrypte:this.state.encrypte
    }
    // console.log(gl)
    var url="/insUserPackage"+token1;
    axios.post(url,{params:gl}).then(res=>{alert(res.data.message);window.location.reload()})
    this.setState({
            pck1:'' ,   
            matetype:'',//弹框数据类型   
            name:'',
            text_link:'',
            newcrow,
            pck2:'',
            encrypte:''
    })
    
}
// 导出excel
    tohref=()=>{
        console.log(this.state.pck)
        var pck2="&pck1="+this.state.pck;
        var a='/getUserPackageExcel'+token1+pck2;
        // if()
        if(this.state.status)a+=this.state.status;
        if(this.state.time_section1)a+=this.state.time_section1;
        
        window.location.href=a;
    }
    // handleClick=(i)=>{
    //     // console.log(i)
    //     // window.location.reload();
    // }
    render() {
        var typeList=this.state.data.typeList;
        return (
            <div style={{background: 'rgba(255,255,255,0.78)'}}>
                <div className="topTitle" >
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{borderRadius:'5px',paddingTop:'10px',boxShadow:' 0px 0px 10px #888888',paddingLeft:'15px',fontSize:20}}>
                        <Menu.Item key="1" style={{fontSize:18,color:' #1E2326',fontFamily:' PingFangSC-Regular'}}>
                    
                        头条
                        </Menu.Item>
                        <Menu.Item key="2" style={{fontSize:18,color:' #1E2326',fontFamily:' PingFangSC-Regular'}}>
                    
                        腾讯
                        </Menu.Item>
                        <Menu.Item key="3" style={{fontSize:18,color:' #1E2326',fontFamily:' PingFangSC-Regular'}}>
                        百度
                        </Menu.Item>
                        <Menu.Item key="4" style={{fontSize:18,color:' #1E2326',fontFamily:' PingFangSC-Regular'}}>
                    
                        朋友圈
                        </Menu.Item>
                
                    </Menu>
                </div>
                <div style={{margin:'15px auto',width:"93.8%",fontSize:'1rem'}}>
                    <Button type="primary" onClick={()=>this.crowdchange(true)} className="btncss">新建人群包</Button>
                    <Modal
                        title="上传人群包"
                        centered
                        destroyOnClose
                        maskClosable={false}
                        visible={this.state.newcrow}
                        onOk={() => this.upchange(false)}
                        onCancel={() => this.crowdchange(false)}
                        className='modals'
                        okText="上传"
                        cancelText="取消"
                        

                        >
                        <div>
                            <span>媒体选择</span>
                            <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.mediachange}>
                                <Option value="1">头条</Option>
                                <Option value="2">腾讯</Option>
                                <Option value="3">百度</Option>
                                <Option value="4">朋友圈</Option>
                            </Select>
                        </div>
                        <div>
                            <span>是否加密</span>
                            <Select defaultValue="请选择加密类型" style={{ width: 240,marginLeft:'20px' }} disabled={this.state.pck1?false:true} onChange={this.encrypteChange}>
                                <Option value="1">文件未{this.state.matetype}</Option>
                                <Option value="2">文件已{this.state.matetype}</Option>
                            </Select>    
                            {/* <Input disabled  value={this.state.matetype} style={{ width: 240,marginLeft:'20px' }}   /> */}
                        </div>
                        <div>
                            <span>人群包名称</span>
                            <Input placeholder="请输入名称" style={{ width: 240,marginLeft:'20px' }} onBlur={this.getname} />
                        </div>
                        <div>
                            <span style={{position:'relative',left:'-95px'}}>上传文件</span>
                            <Upload action={`/readTxtToPhone${token1}${this.state.pck2}`} accept=".zip" name="textFile" onChange={this.zipchange}     >
                                <Button type="primary" style={{position:'relative',width:140,left:'-40px'}} >点击上传ZIP包</Button>
                            </Upload>
                        </div>
                        <div className="divtxt" >
                            <p>·请将号码写在*.txt (UTF-8编码)格式的文档中，一行一个号码</p>
                            <p>·上传文件内，每行一个号码，号码数量不超过三千万</p>
                            <p>·文件类型为单个或多个txt文件经过zip格式压缩得到，压缩后大小不超过1G</p>
                        </div>
                    </Modal>
                </div>
                <div className="tablec">
                    {/* table可选框 */}
                    <table></table>
                    <div  style={{margin:'20px auto '}}>
                        {/* <Crowselect  
                        // typeList={this.state.data.typeList} 
                        data={this.state.data}
                        timeChange={this.timeChange}
                        statusChange={this.statusChange}
                        typeChange={this.typeChange}
                        ></Crowselect> */}
                        <Select
                        // defaultValue="" 
                        placeholder="类型选择"
                        value={this.state.typevalue}
                        style={{ width: 120,marginLeft:'20px' }} 
                        onChange={this.typeChange}>
                            {
                                typeList&&typeList.map(item=>{
                                    return(

                                        <Option key={item}>{item}</Option>
                                    )
                                })
                            }
                            {/* <Option value="媒体">媒体</Option> */}
                        </Select>
                        <Select
                            // defaultValue="" 
                            mode="multiple"
                            style={{ width: 120,marginLeft:'20px' }}
                            placeholder="状态选择"
                            
                            showArrow 
                            // value={this.state.statustype}
                            onChange={this.statusChange}
                            optionLabelProp="label"
                            // allowClear={true}
                        >
                            {
                                this.state.data.statusList&&this.state.data.statusList.map(item=>{
                                    return(
                                        <Option key={item.id} >{item.name} </Option>
                                    )
                                })
                            }
                            
                        </Select>
                
                        <RangePicker
                            style={{display:"inline-block",marginLeft:20}}
                            placeholder={['开始时间','结束时间']}
                            ranges={{
                                '今天': [moment(), moment()],
                                '本月': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            onChange={this.timeChange}
                            
                        />
                        <Button type="primary" style={{float:'right',marginRight:'20px  '}} onClick={this.tohref}>导出Excel</Button> 
                    </div>
                    {/* 表格 */}
                    {/* <div>
                        <Table type={'checkbox'} columns={this.state.columns} pagination={false}  dataSource={this.state.data} size="middle"  bordered/>
                        <Checkbox onChange={this.onChange1}>全选</Checkbox>
                        <Pagination style={{float:'right'}} showTotal={total => `共 ${total} 数据`} showQuickJumper defaultCurrent={1} total={10} onChange={this.onChange} />
                    </div> */}
                    <div>
                    <Crowdtable data={this.state.data} pageChange={this.pageChange} rowdel={this.rowdel}/>
                    </div>
                </div>
            </div>
        
        )
    }
    }
        
export default Crowdpackage;