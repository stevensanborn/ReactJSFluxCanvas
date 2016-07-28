
import React from "react"
import Canvas from '../components/Canvas'
import CanvasStore from "../flux/CanvasStore"
import * as CanvasActions from "../flux/CanvasActions"


 class RowMenu extends React.Component{

    constructor(props){

        super(props);

        this.state={
            current_toy:CanvasStore.getCurrentToy()
        };

    }

    onClickAddNewToy(){
        this.props.onClickAddNewToy();
    }

    onClickRemoveToy(){
        CanvasActions.removeToy(this.state.current_toy);

    }

    onClickPublish(){

        CanvasStore.publishedData=this.props.canvas_ref.getCanvasURLData();
        this.context.router.push("publish")

    }

    componentWillMount(){       
      
       this.funcOnUpdateCurrentToy=(t) => {          
            this.setState({current_toy:t});
        };

        CanvasStore.on("updated-current-toy", this.funcOnUpdateCurrentToy);

    }

    componentWillUnmount(){
        CanvasStore.removeListener("updated-current-toy", this.funcOnUpdateCurrentToy);      
    }
    
	render(){

        const bShowAdd= (this.props.baseImage)?true:false;
        const bShowPublish= (this.props.toys.length>0)?true:false;
        const bShowEdit= (this.state.current_toy)?true:false;
        
		return ( 
            
            <div class="row-menu" >

                <div class="btn  icon-left btn-row" >
                    <label for="file-input">
                    <input type="file" id="file-input" class="upload" onChange={this.props.onSelectFile} />
                    <i class="fa fa-upload" aria-hidden="true"></i>
                        Change Photo
                    </label>
                    
                </div>

                
                { bShowAdd && (
                    
                    <div class="btn  icon-left btn-row" onClick={this.onClickAddNewToy.bind(this)}>

                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        Add
                    </div>


                 )}

                { bShowEdit && (

                     <div class="btn  icon-left btn-row" onClick={this.onClickRemoveToy.bind(this)}>

                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        Delete
                     </div> 
                )}
               

                  {bShowPublish &&  (

                    <div class="btn  icon-right  btn-row" onClick={this.onClickPublish.bind(this)}>

                       
                       Publish

                       <i class="fa fa-arrow-circle-right" aria-hidden="true" ></i>

                    </div>

                    )}
            </div>
                            


		);
	}

}

RowMenu.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default RowMenu;
