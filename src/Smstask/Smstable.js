import React from 'react';
import { Table, Button,Modal,Select,DatePicker,Input,TimePicker,Upload } from 'antd';
import "./Smstable.css"
import moment from 'moment';
import axios from 'axios';
// const token="?token=_OgrzQSqzyXdP2HzE1yyir1BdQ";
import { token1 } from '../jaxios';
// import moment from 'moment'
const { RangePicker } = DatePicker;
const { Column } = Table;
const { Option } = Select;
const { TextArea } = Input;
class Smstable extends React.Component{
    constructor(props){
        super(props)
        this.state={

            showMotal:false,
            shownew:false,
            link:'',
            date:'',
            time:'',
            textContent:'',
            text_link:'',
            smscontent:"",
            namecontent:''
        }
    }
    statuschange=(value)=>{
        console.log(value)
        this.props.statuschange(value)
    }
    // 下载弹框显示
    downshow=(q)=>{
        // this.setState({
        //     showMotal
        // })
        var a='&link='+q
        var url="http://39.100.132.52:8212/downLoadTxt"+token1+a;
        window.location.href=url;
        
    }
    // 新建任务弹框显示
    shownew1=(e,shownew)=>{
        if(e.target.nodeName==='svg'||e.target.nodeName==='SPAN'||e.target.nodeName==='BUTTON'){
        this.setState({
            shownew
        })
    }
    }
    shownew=(shownew)=>{
        var $ =this.state;
        var gl={
            name:$.namecontent,
            content:$.smscontent,
            text_link:$.text_link,
            departure_ts:$.date+' '+$.time
        }
        var url="/marketingSmsIns"+token1;
        axios.post(url,{pramas:gl}).then(res=>{
            this.setState({textContent:''})
            // console.log(res);
            alert(res.data.message)
            window.location.reload();
        }
            
            )
        this.setState({
            shownew
        })
    }
    pageChange=(pageNumber)=>{
        // console.log(pageNumber)
        this.props.getfun.pageChange1(pageNumber)
    }
    // 时间修改
    onChange=(date, dateString)=> {
        console.log(date, dateString);
        this.props.getfun.timechange(dateString);
    }
// txt上传
    txtchange=(info)=>{
        console.log(info)
        if (info.file.status === 'done'){
            var data=info.file.response.data;
            var text_link=data.text_link;
            var textContent=data.textContent;
            console.log(textContent)
            this.setState({text_link,textContent})
        }
    }
    // 弹框时间选择
    tchoose=(i,time)=>{
        console.log(time)
        this.setState({time})
    }
    // 弹框日期选择
    dchoose=(i,date)=>{
        console.log(date)
        this.setState({date})
    }
    // 短信内容
    smscontent=(e)=>{
        console.log(e.target.value)
        this.setState({smscontent:e.target.value})
    }
    // 短信名称
    namecontent=(e)=>{
        console.log()
        this.setState({namecontent:e.target.value})
    }
    // 导出excle
    elayout=()=>{
        // 
        // window.location.href('/getMarketingSmsListExcel?token=-uAgyQH6nXDdP2HzE1yyir1Beg')
        this.props.getfun.layoutexcel()
    }
    render(){
        return(
            <div className="smstable">
                <div style={{marginBottom:20}}>
                    <Select 
                    defaultValue="全部"
                    style={{ width:90,marginLeft:'20px' }} 
                    onChange={this.statuschange}
                    >
                        <Option value="">全部</Option>
                        <Option value="1">未发送</Option>
                        <Option value="2">已发送</Option>
                    
                    </Select>  
                    <RangePicker
                    placeholder={['开始时间','结束时间']}
                    style={{marginLeft:'20px',width:345}}
                    ranges={{
                        "今天": [moment(), moment()],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={this.onChange}
                    
                    /> 
                    <Button type='primary' style={{float:"right",marginLeft:20}}  onClick={this.elayout}>导出EXCEL</Button>
                    <Button type='primary' style={{float:"right"}} onClick={(e)=>this.shownew1(e,true)}>新建任务</Button>
                </div>
                
                <Table
                    dataSource={this.props.res.smsList}
                    pagination={{onChange:this.pageChange,showTotal:total=> `共 ${total} 数据`,total:this.props.res.count,showQuickJumper:true}}
                    rowKey={row=>row.id}
                    bordered
                >
                    <Column title="ID" dataIndex="id" align="center" />
                    <Column title="任务名称" dataIndex="title" key="title" align="center" />
                    <Column title="状态" dataIndex="status" key="status" align="center" />
                    <Column title="发送量" dataIndex="phone_num" key="phone_num" align="center"  />
                    <Column title="发送成功" dataIndex="phone_suc" key="phone_suc" align="center" />
                    <Column title="发送失败" dataIndex="phone_eor" key="phone_eor" align="center" />
                    <Column title="发送时间" dataIndex="departure_ts" key="departure_ts" align="center" />
                    <Column title="短信内容" dataIndex="content" key="content" align="center"  />
                    <Column title="广告主" dataIndex="admin_name" key="admin_name" align="center"  />
                    <Column title="文件" dataIndex="text_link" key="text_link" align="center" render={
                        (rowkey)=>(
                            <span>
                                <span onClick={()=>this.downshow(rowkey)} className="downcss">下载</span>
                            </span>
                        )
                    } />
                </Table>
                <Modal
                    title="新建短信发送任务"
                    centered

                    visible={this.state.shownew}
                    onOk={() => this.shownew(false)}
                    onCancel={(e) => this.shownew1(e,false)}
                    className="widthchange"
                    okText="创建"
                    cancelText="取消"
                    >
                    <div className="modalsts">
                        <div>
                            <span>短信名称</span>
                            <Input placeholder="请输入短信名称" style={{width:360,marginLeft:10}} onBlur={this.namecontent} />
                        </div>
                        <div>
                            <span style={{position:"relative",top:-97}}>短信内容</span>
                            <TextArea style={{width:360,height:120,marginLeft:10}} rows={4} onBlur={this.smscontent}/>
                            <p style={{width:500,fontSize:12,color:' #92959A'}}>一条短信为70个字，超过70字将额外收费，请合理控制字数</p>
                            
                        </div>
                        <div>
                            <span style={{marginLeft:-84}}>预定发送时间</span>
                            <DatePicker style={{marginLeft:10}} placeholder="选择日期" onChange={this.dchoose} />
                            <TimePicker style={{marginLeft:10}} onChange={this.tchoose} defaultOpenValue={moment( 'HH:mm:ss')} />
                        </div>
                        <div style={{position:"relative"}}>
                            <span style={{position:"relative",top:-97}}>手机号码</span>
                            <TextArea style={{width:360,height:120,marginLeft:10}} value={this.state.textContent} rows={4} />
                        </div>
                        <div style={{marginLeft:-244}}>
                            <span>上传文件 </span>
                            <Upload action="/readTxtToPhone?token=-uAgyQH6nXDdP2HzE1yyir1Beg" accept=".txt" name="textFile" onChange={this.txtchange}>

                                <Button type="primary" style={{marginLeft:30,width:140}} >上传TXT文件</Button>
                            </Upload>
                        </div>
                        <div style={{textAlign:"left",fontSize:'12px',color:'#92959A',marginLeft:100}}>
                            <p>1、单词提交最好不超过20万个号码</p>
                            <p>2、手动输入号码请用英文逗号或换行分隔</p>
                            <p>3、内容编辑完成请先检查屏蔽词再行发送</p>
                            <p>4、号码文件只支持TXT、EXCEL文件格式</p>
                            <p>5、请用CTRL+V粘贴短信内容</p>
                            <p>6、汉字、数字、英文和标点符号都表示1个长度</p>
                            <p>7、发手机一条为70个字，长短信为每条67个字。</p>
                            <p>8、小灵通一条为60个字，长短信为每条60个字的基础上再加54个字算加一条。</p>
                            <p>9、短信内容实际长度=短信签名+短信内容</p>
                        </div>
                    </div>
                    
                </Modal>
            </div>
        )
        

    }
}
export default Smstable;