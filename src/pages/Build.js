
import React from "react"



import Canvas from "../components/Canvas"

import RowMenu from "../components/RowMenu"

import ToyMenu from "../components/ToyMenu"

import CanvasStore from '../flux/CanvasStore'

import * as CanvasActions from '../flux/CanvasActions'

import CTA from '../components/CTA'


export default class BuildLayout extends React.Component{


	constructor(props){
		
		super(props);

		this.max_width=1170;
		this.max_height=768;


		this.state={
		
			baseImage:CanvasStore.getBaseImage(),
			
			toys:CanvasStore.getToys(),

			current_toy:CanvasStore.getCurrentToy(),

			show_toy_menu:false,

			canvas_width:this.max_width,

			canvas_height :this.max_height

		};

		
		this.listeners=[];

	}


	componentWillMount(){
		
		this.addListener(CanvasStore,"base-image", () => {
			 var baseImage=CanvasStore.getBaseImage();
			

			let aspectCanvas =  Math.min(this.max_width/baseImage.width , this.max_height/baseImage.height);
			

			this.setState({"baseImage":baseImage,"canvas_width":baseImage.width*aspectCanvas,"canvas_height":baseImage.height*aspectCanvas});
			

			
		});


		this.addListener(CanvasStore,"updated-current-toy", (t) => {			
			
			this.setState({current_toy:t});

		});

	}

	addListener(obj,event,f){
		this.listeners.push({event,f});
		obj.on(event,f);
	}

	componentWillUnmount(){
   		console.log("unmounting ...");
	   	
	   	this.listeners.forEach(function(l){
	     	CanvasStore.removeListener(l.event, l.f);      
	   	});
	   	
	   	this.listeners=null;
	}


	toggleNewToyMenu(){		
		this.setState({show_toy_menu:!this.state.show_toy_menu});
	}


	render(){

		var styleContainer= {

			width:this.state.canvas_width+'px',
			height:this.state.canvas_height+'px'

		}

		console.log(this.state.canvas_width);

		return (
			<div> 
				

			<section>

				<div class="container build-container">
	        
	            		
	        			<RowMenu  {...this.state}  onClickAddNewToy={this.toggleNewToyMenu.bind(this)} canvas_ref={this.refs.main_canvas}  onSelectFile={this.onSelectFile.bind(this)}/>

	            		<div class="canvas-container">
	        
	            			<Canvas max_canvas_width={this.max_width} max_canvas_height={this.max_height} ref="main_canvas" />

	            			{ 

	            				this.state.baseImage == null  && (

		            			<CTA 
		            				icon="fa-upload" 
		            				text="Upload your photo" 
		            				onInteract="alert('hello')"
		            				extra={<input type="file" id="file-input" class="upload" onChange={this.onSelectFile.bind(this)}></input>} 
		            				/>
		            			)

	            			}


	            		</div>
	            		{ 
	            			this.state.show_toy_menu &&  (
	            			<ToyMenu   toggleNewToyMenu={this.toggleNewToyMenu.bind(this)} />
	            			)
	            		}
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
		CanvasActions.setBaseImage(img);
	}


	


}
