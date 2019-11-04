import React from 'react';
import axios from 'axios';
import { Table, Divider,Modal,Select } from 'antd';
import Crowdbtn from './Crowdbtn';
import "./Crowdtable.css"
const { Column } = Table;
const {Option}=Select;
class Crowdtable extends React.Component{
    constructor(){
        super()
        this.state={
    
            showModal1:false ,   
            showModal2:false ,
            id:'',
            admin_id:''   
        }
    }
    // 状态按钮控制

    // 控制弹框显示
    showModaldel(showModal1,id){
        this.setState({showModal1,id})
    }
    rowDelete(showModal1){
        this.setState({showModal1})
        // console.log(id)
        this.props.rowdel(this.state.id);
    }
    appint(showModal2){
        
        this.setState({showModal2})
        
    }
    appint1(showModal2,id){
        var id1="&id="+id;
        var admin_id="&admin_id="+this.state.admin_id;
        var url="/getAdminList?token=-uAgyQH6nXDdP2HzE1yyir1Beg"+id1+admin_id;
        console.log(url);
        axios.get(url).then(res=>console.log(res));
        this.setState({showModal2,admin_id:''});

    }
    onChange=(pageNumber)=> {
        
        this.props.pageChange(pageNumber)
    }
    typeChang=(type)=>{
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
                    <Column
                    title="操作"
                    key="action"
                    align="center"
                    render={(text, record) => (
                        <span>
                            <span  onClick={()=>this.appint(true,record.id)}>指派</span>
                            <Divider type="vertical" />
                            <span  onClick={()=>this.showModaldel(true,record.id)}>删除</span>
                        
                        </span>
                    )}
                    />
                </Table>
                {/* 删除弹框 */}
                <Modal
                    title="确定要删除此人群包吗"
                    centered
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
                    visible={this.state.showModal2}
                    onOk={() => this.appint1(false)}
                    onCancel={() => this.appint(false)}
                    
                    okText="上传"
                    cancelText="取消"
                    >
                    <div style={{paddingRight:'50px'}}>
                        <span>广告主</span> 
                    <Select defaultValue="请选择媒体" style={{ width: 240,marginLeft:'20px' }} onChange={this.typeChange}>
                            <Option value="自有">自有</Option>
                            <Option value="媒体">媒体</Option>
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