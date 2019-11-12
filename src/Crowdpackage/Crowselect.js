import React from 'react';
import { Menu , Select,Button,Modal,Input,Upload} from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;
class Crowselect extends React.Component{
    constructor(props){
        super(props)
        this.state={}
        
    }
    typeChange=(value)=>{
        this.props.typeChange(value)
    }
    statusChange=(value)=>{
        this.props.statusChange(value)
    }
    timeChange=(value)=>{
        this.props.timeChange(value)
    }
    render(){
        // var typeList=this.props.data.typeList;
        // // console.log(1111111111)
        // console.log(this.props.data.typeList)
        return(
            <div>
                <Select
                        placeholder="类型选择"
                        allowClear
                        style={{ width: 120,marginLeft:'20px' }} 
                        onChange={this.typeChange}>
                            {
                                this.props.data.typeList&&this.props.data.typeList.map(item=>{
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
                            allowClear='true'
                            style={{ width: 120,marginLeft:'20px' }}
                            placeholder="状态选择"
                            showArrow 
                            onChange={this.statusChange}
                            optionLabelProp="label"
                            // allowClear={true}
                        >
                            {
                                this.props.data.statusList&&this.props.data.statusList.map(item=>{
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
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            onChange={this.timeChange}
                            
                        />
                        <Button type="primary" style={{float:'right',marginRight:'20px  '}} onClick={this.tohref}>导出Excel</Button>
                    
            </div>
        )
    }
}
export default Crowselect;
