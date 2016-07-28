
import React from "react"

import CanvasStore from '../flux/CanvasStore'

import ToyModRect from '../components/ToyModRect'

import * as CanvasActions from '../flux/CanvasActions'

export default class Canvas extends React.Component{

	constructor(props){
		
		super(props);

		var canvas_width=this.props.max_canvas_width;
		var canvas_height=this.props.max_canvas_height;
		var baseImage=CanvasStore.getBaseImage();
		
		if(baseImage){
			let aspectCanvas =  Math.min(this.props.max_canvas_width/baseImage.width , this.props.max_canvas_height/baseImage.height);
			canvas_width  =baseImage.width*aspectCanvas;
			canvas_height =baseImage.height*aspectCanvas;
		}

		this.state={
			baseImage:baseImage,
			current_toy:CanvasStore.getCurrentToy(),
			toys:CanvasStore.getToys(),
			canvas_width:canvas_width,
			canvas_height:canvas_height
		}

		this.listeners=[];

		

	}


	addListener(obj,event,f){
		this.listeners.push({event,f});
		obj.on(event,f);

	}
	componentWillMount(){		
		
		this.addListener(CanvasStore,"base-image", () => {			
			
			this.setState({"baseImage":CanvasStore.getBaseImage()});

			let aspectCanvas =  Math.min(this.props.max_canvas_width/this.state.baseImage.width , this.props.max_canvas_height/this.state.baseImage.height);
			this.setState({"canvas_width":this.state.baseImage.width*aspectCanvas,"canvas_height":this.state.baseImage.height*aspectCanvas});
			
			this.updateFrame();

		});
		
		this.addListener(CanvasStore,"add-toy", (t) => {			

			this.setState({"toys":CanvasStore.getToys()});
			this.updateFrame();

		});
		
		this.addListener(CanvasStore,"updated-toy", (t) => {			
			this.updateFrame();
		});

		this.addListener(CanvasStore,"removed-toy", () => {			
			this.setState({toys:CanvasStore.getToys()})
			this.updateFrame();
		});

		this.addListener(CanvasStore,"updated-current-toy", (t) => {			
			this.setState({current_toy:t});
			this.updateFrame();
		});

	}

   componentWillUnmount(){
   		console.log("unmounting ...");
	   	
	   	this.listeners.forEach(function(l){
	     	CanvasStore.removeListener(l.event, l.f);      
	   	});

	   	this.listeners=null;
	}

	componentDidMount(){
		this.updateFrame();
	}


	setNewToy(t){
		
		this.setState({current_toy:t});
			
		this.state.toys.forEach((toy,index)=>{
			if(t.id == toy.id){
				this.refs['ToyModRect'+index].setState({active:true});
			}
			else{
				this.refs['ToyModRect'+index].setState({active:false});
			}
		});
		
	}


	
	updateFrame(){
		
		
		if(!this.state.baseImage)
			return;

		let canvasWidth=this.refs.main_canvas.width;
		
		let canvasHeight=this.refs.main_canvas.height;

		let aspectCanvas =  Math.min(canvasWidth/this.state.baseImage.width , canvasHeight/this.state.baseImage.height);
		
		let w=this.state.baseImage.width*aspectCanvas;

		let h=this.state.baseImage.height*aspectCanvas;
		
		let xpos=(canvasWidth-w)/2;
	
		let ypos=(canvasHeight-h)/2;

		let ctx=this.refs.main_canvas.getContext('2d');
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		ctx.drawImage(this.state.baseImage,0,0,w,h);

		
		if(this.state.toys.length > 0){

			this.state.toys.forEach(function(t){
				
				let xtoypos = xpos +w/2;
				
				let ytoypos = ypos +h/2;

			
				//render toy
				if(t.position)
					xtoypos=t.position[0],ytoypos=t.position[1];

				ctx.save();
				ctx.translate(xtoypos,ytoypos);
				ctx.rotate(t.rotation); 
				ctx.scale(t.scale,t.scale);
				ctx.translate(-t.width/2,-t.height/2);
				ctx.drawImage(t.ele,0,0,t.width,t.height);
				ctx.restore();
			
			});
		}

	}

	
	onClickCanvas(e){
		if( e.target == this.refs.main_canvas){

			CanvasActions.setCurrentToy(null);

		}
	}

	
	getCanvasURLData(){
		
	
		let data = this.refs.main_canvas.toDataURL('image/png');
	
		return data.replace(/^data:image\/[^;]/, 'data:application/octet-stream');	

	}


	render(){

		var styleContainer= {

			width:this.state.canvas_width+'px',
			height:this.state.canvas_height+'px'

		}

		
		return ( 
			<div class="main-canvas-holder" style={styleContainer}>
				
				<canvas class="main-canvas" ref="main_canvas" width={this.state.canvas_width} height={this.state.canvas_height}  onClick={this.onClickCanvas.bind(this)}></canvas> 

				{
					this.state.toys.map((t,i)=>{
						return <ToyModRect key={"toyrect"+t.id} canvas_width={this.state.canvas_width} canvas_height={this.state.canvas_height}  toy={t} ref={'ToyModRect'+i} />
					})
				}

				
			</div>
		);
	}

}
