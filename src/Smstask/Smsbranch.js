import React from 'react';
import {Link} from 'react-router-dom';
import './Smsbranch.css'
class Smsbranch extends React.Component{
    render(){
        return(
            <div style={{width:1920,height:1020,backgroundColor:'rgba(255,255,255,0.78)'}}>

                <Link to="/Smstask">
                <div className="div1" style={{marginLeft:195}} >
                    <img src={require('../images/icon-dx.png')} alt=""/>
                    <p>短信营销</p>
                </div>
                </Link>

                <Link to="">
                <div className="div1"  >
                    <img src={require('../images/icon-yx.png')} alt=""/>
                    <p>邮件营销</p>
                </div>
                </Link>
                {/* <Link to=""><img src={require('../images/icon-yx.png')}/></Link> */}
            </div>
        )
    }
}
export default Smsbranch;