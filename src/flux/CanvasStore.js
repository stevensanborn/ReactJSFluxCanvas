import {EventEmitter} from "events";
import Dispatcher from './Dispatcher';
import _ from 'lodash'
import 'whatwg-fetch'

class CanvasStore extends EventEmitter{

	constructor(){
		
		super();
		
		this.toys = [];

		this.publishedData=null;

		this.currentToy=null;

		this.finalImage=null;

		this.allToys=null;
/*
		[
			{
				id:1,
				image:"img/toys/blocks.png",
				ele:new Image()
			},
			{
				id:2,
				image:"img/toys/car.png",
				ele:new Image()
			},
			{
				id:3,
				image:"img/toys/rattle.png",
				ele:new Image()
			},
			{
				id:4,
				image:"img/toys/swing.png",
				ele:new Image()
			},
			{
				id:5,
				image:"img/toys/teddy.png",
				ele:new Image()
			},
			{
				id:6,
				image:"img/toys/train.png",
				ele:new Image()
			}

		];*/

	}

	getBaseImage(){
		return this.baseImage;
	}

	getCurrentToy(){
		return this.currentToy;
	}

	getToys(){
		return this.toys;
	}

	getAllToys(){
		return this.allToys;
	}

	clear()
	{
		this.toys=[];
		this.baseImage=null;
	}

	removeToy(t){
		// console.log("remove");
		
		// console.log(t);
		
		// console.log(this.toys);

		_.remove(this.toys,{id:t.id});
		
		this.emit("removed-toy");

		if(this.currentToy==t){
			this.setCurrentToy(null);
		}


	}



	setBaseImage(img){
		
		this.baseImage=img;

		this.emit("base-image");

	}

	setCurrentToy(t){
		this.currentToy=t;
		this.emit("updated-current-toy",t);
	}

	addToy(obj){

		const id=new Date().getTime();
		
		var position = obj.position ? [obj.position.x,obj.position.y]: null;
		
		const toyObj={
			id: id,
			toy_id:obj.id,
			ele:obj.ele,
			rotation:0,
			scale:1,
			width:150,
			height:150,
			barx:0,
			bary:0,
			position:position
		}

		this.toys.push(toyObj);

		this.emit("add-toy",toyObj);
		this.emit("updated-current-toy",toyObj);

	}

	
	updatedToy(t){
		this.emit("updated-toy",t);
	}


	handleActions(action){
		
		switch(action.type){
			
			case "SET_BASE_IMAGE":
				this.setBaseImage(action.img);
			break;	

			case "SET_CURRENT_TOY":
				this.setCurrentToy(action.toy);
			break;	

			case "ADD_TOY":
				this.addToy(action.toy);
			break;	

			case "UPDATED_TOY":
				this.updatedToy(action.toy);
			break;

			case "REMOVE_TOY":
				this.removeToy(action.toy);
			break;


		}
		
	}


	getToysWithCategory(cat){

		var arr = _.filter(this.allToys,(item)=>{
			if(item.category.indexOf(cat) > -1) return true;
			return false;
		});

		arr.sort((item1,item2)=>{
			if( parseInt(item1.emoji_order) > parseInt(item2.emoji_order))
				return 1;
			else
				return -1;
			

		});
		
		return arr;

	}



	getAllToys(){
		return this.allToys;
	}

	loadAllToys(){

		var p= new Promise(

			(resolve, reject)=>{

				
				fetch('/data/toys.json')
				
				.then((response)=>{

					return response.json()
					
				}).then((json)=>{

					this.allToys=json;

					resolve(this.allToys);
					
				})
				.catch((ex)=>{
		    		
		    		console.log('parsing failed', ex);
		    		
		    		reject(ex);

		  		});

			}
		);


		return p;

	}



}



const canvasStore = new CanvasStore;

Dispatcher.register(canvasStore.handleActions.bind(canvasStore));

export default canvasStore;
