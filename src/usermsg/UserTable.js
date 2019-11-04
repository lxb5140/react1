import React from 'react';

import { Select,Button,Table } from 'antd';
import './UserTable.css';
import Oclick from '../oclick';
const { Option } = Select;
// const { TreeNode } = TreeSelect;
class UserTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:'类型选择',
            children : [],
            st:[],
            columns : [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    'align':"center"
                },
                {
                    title: '来源',
                    dataIndex: 'source_name',
                    'align':"center"
                },
                {
                    title: '类型',
                    dataIndex: 'type_name',
                    'align':"center"
                },{
                    title: '姓名',
                    dataIndex: 'name',
                    'align':"center"
                },
                {
                    title: '电话',
                    dataIndex: 'mobile',
                    'align':"center"
                },
                {
                    title: '广告主',
                    dataIndex: 'admin_name',
                    'align':"center"
                },
                {
                    title: '提交时间',
                    dataIndex: 'create_ts',
                    'align':"center"
                },
                {
                    title: '地域',
                    dataIndex: 'region',
                    'align':"center"
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    'align':"center"
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    'align':"center"
                }
                ],
            userList:[],
            arr:[]    
            
        };
    }
    componentWillUnmount(){
        // this.state.userList||this.setState({
        //     userList:this.props.p1.userList
        // })
    }
    componentDidMount(){

    
    }
    
    onChange=(pageNumber)=> {
            // console.log('Page: ', pageNumber);
            // let params = {
            //     currentPage: pageNumber,
            //     pageSize: 10
            // }
            this.props.getfun.getaffiliatedTableTableList(pageNumber)
        }
        onChange1=(e)=> {
            console.log(`checked = ${e.target.checked}`);
            
        }
        // 类型选择
        handleChange=(value) =>{
            this.props.getfun.type_name(value);
            this.setState({
                arr:value
            })
            
        }
        handleChange1=(value) =>{
            console.log(value)
            this.props.getfun.source_name(value)
            
        }
        handleChange2=(value) =>{
            console.log(value)
            this.props.getfun.adminList(value)
            
        }
        // getii=()=>{
        //     console.log(this.state.arr)
        // }
        getTime1=(value)=>{
            // console.log(111111111)
            console.log(value)
            this.props.getfun.getTime(value);
        }
        userlayout=()=>{
            this.props.getfun.userlayout()
        }    
        render(){
            var sourceList= this.props.p1.sourceList
            // console.log(sourceList)
        return(
            <div className="topTable">
                <div style={{marginBottom:20}}>
                    <Select defaultValue="类型选择" style={{ width: 120,marginLeft:'20px' }} onChange={this.handleChange}>
                        <Option value="">全部</Option>
                        <Option value="媒体">媒体</Option>
                        <Option value="自有">自有</Option>
                        
                    </Select>
                    <Select
                        mode="multiple"
                        style={{ width: 120,marginLeft:'20px' }}
                        placeholder="来源选择"
                        showArrow                   
                        onChange={this.handleChange1}
                        optionLabelProp="label"
                        > 
                    {
                        sourceList&&sourceList.map((item,index)=>{
                            return(

                                <Option key={item}>{item}</Option>
                            )
                            // console.log(sourceList)
                        })
                    }
                    </Select>
                    <Select
                    mode="multiple"
                    style={{ width: 120,marginLeft:'20px',dispaly:this.props.p1.isRoot?"block":"none" }}
                    placeholder="广告主选择"
                    showArrow
                    // suffixIcon={<Icon type="down" />}
                    onChange={this.handleChange2}
                    optionLabelProp="label"
                    > 
                    {
                        
                        this.props.p1.adminList&&this.props.p1.adminList.map((item)=>{
                            return(
                                <Option key={item.id}>{item.name}</Option>
                            )
                        })
                    }  

                    </Select>
                    {/*  时间选择器*/}
                    <Oclick  getTime1={this.getTime1}/>
                    <Button type="primary" style={{float:'right',marginRight:'20px  '}} onClick={this.userlayout}>导出Excel</Button>
                </div>
                <div>
                <Table
                rowKey="id" 
                type={'checkbox'} 
                columns={this.state.columns} 
                pagination={{onChange:this.onChange,showTotal:total=> `共 ${total} 数据`,showQuickJumper:true,total:this.props.p1.count }}  
                dataSource={this.props.p1.userList} 
                size="middle"  
                bordered/>
                {/* <Checkbox onChange={this.onChange1}>全选</Checkbox> */}
                {/* <Pagination   style={{float:'right'}} showTotal={total => `共 ${total} 数据`} showQuickJumper defaultCurrent={1} total={this.props.p1.count} onChange={this.onChange} /> */}
                </div>         
            </div>
        )
    }
}
export default UserTable