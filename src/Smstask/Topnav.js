import React from 'react'
import { Breadcrumb } from 'antd';
import './Topnav.css'
class Topnav extends React.Component{
    render(){
        return(
            <div className="topnav">
                <Breadcrumb separator=">">
                    
                    <Breadcrumb.Item >营销管理</Breadcrumb.Item>
                    <Breadcrumb.Item >短信任务列表</Breadcrumb.Item>
            
                </Breadcrumb>
            </div>
        )
    }
}
export default Topnav;