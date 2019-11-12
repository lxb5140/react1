import React from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router ,Route} from 'react-router-dom';
import Usermsg from './usermsg/Usermsg';
class Page1 extends React.Component{
    render(){
        return(
            <div>
                <div>this is Page1</div>
                {/* <Link to="/web/Usermsg">用户管理</Link> */}
                <Router>
                    <Route exact  path="/Usermsg" component={Usermsg}/>   
                </Router>
            </div>   
        )
    }
}
export default Page1;