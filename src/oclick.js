import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
class Oclick extends React.Component{
    onChange=(dates, dateStrings)=> {
        // console.log(dates,dateStrings);
        // var string=dates+","+dateStrings
        // console.log(string)
        this.props.getTime1(dateStrings)
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    render(){

        return(
            <div style={{display:"inline-block",marginLeft:20}}>
                
                <RangePicker
                placeholder={['开始时间','结束时间']}
                ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={this.onChange}
                
                />
            </div>
            )
    }    

    
}
export default Oclick;