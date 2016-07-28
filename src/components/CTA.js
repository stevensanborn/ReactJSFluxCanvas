
import React from "react"
import {Link} from "react-router"

export default class cta extends React.Component{

	render(){

        const classNames="fa "+this.props.icon;
		return ( 
            
            <div class="cta-container" >
                
                <label for="file-input">
                        <div class="cta_modal">
                            
                            <div>
                                <i className={classNames} aria-hidden="true"></i>     
                            </div>
                            
                            <div>
                                {this.props.text}
                            </div>

                                {this.props.extra}
                        </div>  
                </label>

            </div>
                            


		);
	}

}
