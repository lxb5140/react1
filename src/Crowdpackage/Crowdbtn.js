import React from 'react';
import {Button} from 'antd';

class Crowdbtn extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const st=this.props.st;
        // console.log(this.props)
        if(st===1){
            return(
                <span>
                    <Button type={'primary'} style={{width:76,height:28}} className="">
                        审核中
                    </Button>
                </span>
            )
        }else if(st===2){
            return(
                <span>
                    <Button  style={{width:76,height:28,background:' #1AB481',color:"#fff"}}>
                        可用
                    </Button>
                </span>
            )
        }else if(st===3){
            return(
                <span>
                    <Button   style={{width:76,height:28,background: '#C3C3C3',color:"#fff"}}>
                        不可用
                    </Button>
                </span>
                )
        }else{
            return(
                <span>
                    <Button   style={{width:76,height:28,background: 'rgb(209, 198, 198)',color:"#fff"}}>
                        可指派
                    </Button>
                </span>
            )
        }
        
    }
}
export default Crowdbtn