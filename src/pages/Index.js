
import React from "react"

import { browserHistory } from 'react-router'


import * as CanvasAction from '../flux/CanvasActions'

import CanvasStore from '../flux/CanvasStore'

 class IndexLayout extends React.Component{
	
	constructor(props){
	
		super(props)

	}

	render(){
		
		return (
			 
		<div>
			
		    <section class="section-upload">

		    <div class="container">
	            
	            <div class="row">

	                <div class="col-lg-12">
	                    

	                    <div class="fileUpload"  ref="fileUpload">
							
							<label for="file-input">

								<div class="file_upload_circle">
	                        		<i class="fa fa-camera-retro" aria-hidden="true"></i>
	                        	</div>

	                         <span class="upload-cta">UPLOAD YOUR PHOTO</span>
		                    
	                    	</label>

	                        <input type="file" id="file-input" accept="image/*" class="upload" onChange={this.onSelectFile.bind(this)}></input>

                        </div>


						<div >	                        
	                        
	                        
	                        <span class="upload-subtitle">Emotify Your Photos ! Add emoticons to your photos for free </span>	                        

	                    </div>

	                    
	                    <img src="img/emoji_collection.png" id="emoji-collection" />
	                    

	                </div>
	            </div>

	        </div>

	        </section>

	    </div>

		);
	}



	onSelectFile(e){

		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
	      alert('The File APIs are not fully supported in this browser.');
	      return;
    	}

		

		const inputElement =e.target;
		const file = inputElement.files[0];
	    const fr = new FileReader();
	    

	    fr.onload = this.onLoadFile.bind(this);
	    
	    fr.readAsDataURL(file);

	    

	}

	onLoadFile(e){
		
		var img = new Image();
		
		img.src=e.target.result;

		this.refs.fileUpload.style.visibility='hidden';
		
		CanvasAction.setBaseImage(img);



	}



	componentWillMount(){
		
		
		CanvasStore.once("base-image", () => {

			this.context.router.push('build');
			
		});

	}

	


}

IndexLayout.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexLayout;

