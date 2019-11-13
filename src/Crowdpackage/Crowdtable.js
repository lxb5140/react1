import React from 'react';
import axios from 'axios';
import { Table, Divider,Modal,Select } from 'antd';
import Crowdbtn from './Crowdbtn';
import "./Crowdtable.css"
import { token1 } from '../jaxios';
const { Column } = Table;
const {Option}=Select;
// const token="?token=_OgrzQSqzyXdP2HzE1yyir1BdQ";
class Crowdtable extends React.Component{
    constructor(){
        super()
        this.state={
    
            showModal1:false ,   
            showModal2:false ,
            id:'',
            admin_id:'',
            mediaList:''  
        }
    }
    // 状态按钮控制

    // 控制弹框显示
    showModaldel(showModal1,id){
        this.setState({showModal1,id})

    }
    // 删除行
    rowDelete(showModal1){
        this.setState({showModal1})
        // console.log(id)
        this.props.rowdel(this.state.id);
    }
    // 弹框显示
    appint(showModal2,id){
        console.log(showModal2)
        var url="/getAdminGList"+token1;
        axios.get(url).then(res=>{
            console.log(res.data.data)
            this.setState({mediaList:res.data.data})
        })
        // console.log(id)
        this.setState({showModal2,id})
    
    }
    // 指派人群包
    appint1(showModal2){
        if(this.state.type){
            var id1="&id="+this.state.id;
            var admin_id="&admin_id="+this.state.type;
            var url="/designateUserPackage"+token1+id1+admin_id;
            // console.log(url);
            axios.get(url).then(res=>{
                window.location.reload()
                alert(res.data.message)
            }
                ).catch(err=>alert(err.data.data.message));
            this.setState({showModal2,admin_id:'',id:''});
        }else{
            alert('请选择广告主')
        }


    }
    // 页面改变
    onChange=(pageNumber)=> {
        
        this.props.pageChange(pageNumber)
    }
    // 类型改变
    typeChange=(type)=>{
        console.log(type)
        this.setState({type})
    }
    
    render(){      
        return(
            <div>
                <Table dataSource={this.props.data.userPackageList}
                pagination={{onChange:this.onChange,showTotal:total=> `共 ${total} 数据`,showQuickJumper:true,total:this.props.data.count }}
                rowKey={row=>row.id}
                bordered
                >
                    
                    <Column title="ID" align="center" dataIndex="id" key="id" />
                    
                    <Column title="名称" align="center" dataIndex="name" key="name" />
                    <Column title="类型" align="center" dataIndex="type" key="type" />
                    <Column title="状态" 
                        dataIndex="status" 
                        key="status" 
                        align="center"
                        render={(text, record) => (
                            <Crowdbtn st={record.status}/>
                    )}/>
                    <Column title="上传人数" align="center" dataIndex="upload_num" key="upload_num" />
                    <Column title="可用人数" align="center" dataIndex="upload_suc" key="upload_suc" />
                    <Column
                    title="创建时间"
                    dataIndex="create_ts"
                    key="create_ts"
                    align="center"
                    />
                    <Column title="广告主" align="center" dataIndex="admin_name" key="admin_name" />
                    <Column
                    title="操作"
                    key="action"
                    align="center"
                    render={(text, record) => (
                        <span>
                            <span className="point" style={{display:this.props.data.isRoot?'inline':'none'}}  onClick={()=>this.appint(true,record.id)}>指派</span>
                            <Divider type="vertical"  style={{display:this.props.data.isRoot?'inline-block':'none'}}/>
                            <span className="point"  onClick={()=>this.showModaldel(true,record.id)}>删除</span>
                        
                        </span>
                    )}
                    />
                </Table>
                {/* 删除弹框 */}
                <Modal
                    title="确定要删除此人群包吗"
                    centered
                    maskClosable={false}
                    visible={this.state.showModal1}
                    onOk={() => this.rowDelete(false)}
                    onCancel={() => this.showModaldel(false)}
                    okText="删除"
                    cancelText="取消"
                    >
                    
                </Modal>
                {/* 指派人群包弹框 */}
                <Modal
                    title="指派人群包"
                    centered
                    maskClosable={false}
                    visible={this.state.showModal2}
                    onOk={() => this.appint1(false)}
                    onCancel={() => this.appint(false)}
                    
                    okText="上传"
                    cancelText="取消"
                    >
                    <div style={{paddingRight:'50px'}}>
                        <span>广告主</span> 
                    <Select  style={{ width: 240,marginLeft:'20px' }} onChange={this.typeChange}>
                            {
                                this.state.mediaList&&this.state.mediaList.map(item=>{
                                    return(
                                        <Option key={item.id}>{item.name}</Option>
                                    )
                                })
                            }
                            
                            {/* <Option value="媒体">媒体</Option> */}
                        </Select>
                    </div>
                </Modal>
                {/* <Checkbox onChange={this.onChange1}>全选</Checkbox> */}
                {/* <Pagination style={{float:'right'}} showTotal={total => `共 ${total} 数据`} showQuickJumper defaultCurrent={1} total={10} onChange={this.onChange} /> */}
            </div>
        )
    }
}
export default Crowdtable;