
import React from "react"
import {Link} from "react-router"
import CanvasStore from '../flux/CanvasStore'

class Header extends React.Component{

	onNavigateHome(){

		this.context.router.push('/');

	}

	render(){
		return ( 
    <div>
    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top navbar-custom">
        <div class="container">
           
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="#page-top"> >> </a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                
                    <li class="page-scroll">
                        <a onClick={this.onNavigateHome.bind(this)} >Home</a>
                    </li>
                
                    <li class="page-scroll">
                        <Link to="build">Build</Link>
                    </li>
                
                    <li class="page-scroll">
	                    <Link to="faq">FAQ</Link>
                    </li>

                </ul>

            </div>
        
        </div>
        
    </nav>

    
    
    </div>


		);
	}

}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default Header;
