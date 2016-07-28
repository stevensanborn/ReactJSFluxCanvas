
import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"


class MainLayout extends React.Component{


	constructor(props){
		
		super(props);

		this.baseImage=null;

	}


	render(){
		return (
			<div> 
				<Header />
		    
				{this.props.children}

				<Footer />
			</div>
		);
	}
}


MainLayout.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MainLayout;

