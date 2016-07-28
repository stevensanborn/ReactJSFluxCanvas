
import React from "react"

import CanvasStore from '../flux/CanvasStore'
import * as CanvasActions from '../flux/CanvasActions'
import classNames from 'classnames';
import TweenMax from 'gsap'

export default class ToyMenu extends React.Component{

  constructor(props){

    super(props);

    this.state={
      data_loaded:false,
      categories:['people','nature','objects','travel','activity','symbols'],
      toys:[],
      category:'face'
    }

    this.listeners=[];

  }

  selectImage(t){
    
    t.ele = new Image();

    t.ele.src="img/toys/"+t.image;//
    
    console.log(t.ele.src);

    t.ele.onload= () =>{
      
      CanvasActions.addToy(t);

      this.onClickCloseMenu();

    }

  }

  addListener(obj,event,f){
    
    this.listeners.push({event,f});
    
    obj.on(event,f);

  }

  componentWillMount(){   
    
    this.addListener(CanvasStore,"load-all-toy-data", () => {      });

    this.addListener(CanvasStore,"load-cat-data", () => {      });

  }

  componentDidMount(){
 
    TweenMax.from(this.refs.toyMenu,.35,{'opacity':'0',top:"300px","ease":Power2.easeOut, onComplete:this.onAnimateIn.bind(this) });
 
  }
  
  onAnimateIn(){

    //load the data
    if(this.state.data_loaded == false){

      CanvasStore.loadAllToys().then((alltoys)=>{
        
          this.setCategory('people');

          this.setState({"data_loaded":true});

      });

    }
    
  }

  setCategory(cat){
    
    var arr= CanvasStore.getToysWithCategory(cat);


    this.setState({"category":cat,"toys":arr});


  }

  componentWillUnmount(){
      console.log("unmounting ...");
      
      this.listeners.forEach(function(l){
        CanvasStore.removeListener(l.event, l.f);      
      });

      this.listeners=null;
  }

  onClickCloseMenu(){

    // this.props.toggleNewToyMenu();
    TweenMax.to(this.refs.toyMenu,.35,{'opacity':'0',top:"300px" ,"ease":Power2.easeOut,onComplete:this.onClickCloseMenuComplete.bind(this)});

  }

  onClickCloseMenuComplete(){

    this.props.toggleNewToyMenu();
  
  }

  render(){

    return ( 
            
            <div class="toy-menu"  ref="toyMenu"> 

                <div class="row-menu">
                  
                  <div class="btn btn-close" onClick={this.onClickCloseMenu.bind(this)}>

                      <i class="fa fa-times-circle close-button" aria-hidden="true"></i>
                        
                        
                  </div>

                  <div class="toy-menu-category-holder">
                         {
                          this.state.categories.map((t) => {
                              return  <button class="toy-cat-item btn " key={t} onClick= { (e)=> this.setCategory(t) } >{t}</button>
                          })

                        }
                        </div>

                </div>

                { this.state.data_loaded && (  

                  <div class="toy-menu-data">

                   <div class="toy-menu-row">
                   

                   </div>

                    {
                      this.state.toys.map((t) => {
                          
                          return  <div class="toy-menu-item" key={t.id} onClick= { (e)=> this.selectImage(t) } ><img src={"img/toys/"+t.image} /></div>

                      })
                    }

                    { 
                      !this.state.data_loaded && (  

                      <div class="loader">LOADING</div>

                     ) }

                 </div>

                )}
                  

                 

            </div>

    );
  }

}
