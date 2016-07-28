
import React from "react"
import * as CanvasActions from '../flux/CanvasActions'
import CanvasStore from '../flux/CanvasStore'

export default class ToyModRect extends React.Component{

    constructor(props){
        
        super(props);

        this.borderInterval=null;
        this.borderAnimTick=0;
        this.mouseDownTile=[0,0];

        this.mouseDownBar=[0,0];

        this.funcMouseMoveTile=null;
        this.funcMouseUpTile=null;
        this.funcMouseMoveBar=null;
        this.funcMouseUpBar=null;

        this.funcOnUpdateCurrentToy=null;
       
        var xpos=this.props.canvas_width/2;
        var ypos=this.props.canvas_height/2;

        if(this.props.toy.position){
            xpos=this.props.toy.position[0];
            ypos=this.props.toy.position[1];
        }
       
        let active=false;

        if(CanvasStore.getCurrentToy() == this.props.toy)
            active=true;

        this.baselineX=this.props.toy.width/2+30;

        var barx=this.props.toy.barx?this.props.toy.barx : this.baselineX;
        var bary=this.props.toy.bary?this.props.toy.bary:0;

     
        this.state={
            style_border_bg:"0,0",
            dragging:true,
            x:xpos,
            y:ypos,
            barx:barx,
            bary:bary,
            rotation:this.props.toy.rotation*(180 / Math.PI),
            active:active
            // current_toy:CanvasStore.getCurrentToy()

        }


    }


    componentWillMount(){       
        
        this.funcOnUpdateCurrentToy= (t) => {          
            
            let active=false;
            
            if(t == this.props.toy)
                active=true;
        
            this.setState({active:active});
            
        }

        CanvasStore.on("updated-current-toy",this.funcOnUpdateCurrentToy);

    }


    componentDidMount(){

        this.borderInterval= setInterval(this.onBorderTick.bind(this),30);

    }

    componentWillUnmount(){
        CanvasStore.removeListener("updated-current-toy", this.funcOnUpdateCurrentToy);      
        clearInterval(this.borderInterval);

    }



    onBorderTick(){
       
        if(!this.state.active)
            return null;

        this.borderAnimTick = (this.borderAnimTick+1) % 10000;

        const percent= this.borderAnimTick/100;

        const w=this.props.toy.width*this.props.toy.scale+10-4;
        const h=this.props.toy.height*this.props.toy.scale+10-4;

        var perWidth=Math.round(w*percent);
        var perHeight=Math.round(h*percent);

        this.setState({ style_border_bg:""+perWidth+"px 0px , "+(w-perWidth)+"px "+h+"px, 0px "+(h-perHeight)+"px, "+w+"px "+perHeight+"px"});

    }

    onMouseDownTile(e){

        if(!this.state.active){

            CanvasActions.setCurrentToy(this.props.toy)
            
        }


        this.mouseDownTile[0]=e.pageX;
        this.mouseDownTile[1]=e.pageY;

        this.funcMouseMoveTile=this.onMouseMoveTile.bind(this);
        this.funcMouseUpTile=this.onMouseUpTile.bind(this);
        
        document.addEventListener('mousemove', this.funcMouseMoveTile)
        document.addEventListener('mouseup', this.funcMouseUpTile)
       
        e.stopPropagation()
        e.preventDefault()
        
        
    }

    onMouseUpTile(e){

        if(!this.state.active)
            return;


        var diff=[e.pageX-this.mouseDownTile[0],e.pageY-this.mouseDownTile[1]];
        const posX = this.state.x+diff[0];
        const posY = this.state.y+diff[1];
        this.setState({x:posX,y:posY});
        
        this.props.toy.position=[posX,posY];
        CanvasActions.updatedToy(this.props.toy);


        document.removeEventListener('mousemove',this.funcMouseMoveTile);
        document.removeEventListener('mouseup',this.funcMouseUpTile);
        
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseMoveTile(e){

        if(!this.state.active)
            return;

        var diff=[e.pageX-this.mouseDownTile[0],e.pageY-this.mouseDownTile[1]];
        
        this.mouseDownTile[0]=e.pageX;
        this.mouseDownTile[1]=e.pageY;
        
        const posX = this.state.x+diff[0];
        const posY = this.state.y+diff[1];
        
        this.setState({x:posX,y:posY});
        
        this.props.toy.position=[posX,posY];
        
        CanvasActions.updatedToy(this.props.toy);

        e.stopPropagation()
        e.preventDefault()
    }

    onClickTile(){
        
       // this.props.setNewToy(this.props.toy);

    }

    onMouseDownBar(e){

        this.mouseDownBar=[e.pageX,e.pageY];
        
        this.funcMouseMoveBar=this.onMouseMoveBar.bind(this);
        this.funcMouseUpBar=this.onMouseUpBar.bind(this);
        
        if(this.funcMouseMoveBar){
            document.removeEventListener('mousemove',this.funcMouseMoveBar);
            document.removeEventListener('mouseup',this.funcMouseUpBar);
        }

        document.addEventListener('mousemove', this.funcMouseMoveBar)
        document.addEventListener('mouseup', this.funcMouseUpBar)
       
        e.stopPropagation()
        e.preventDefault()
    }




    onMouseMoveBar(e){

        var diff=[e.pageX-this.mouseDownBar[0],e.pageY-this.mouseDownBar[1]];
        this.mouseDownBar=[e.pageX,e.pageY];
        
        const posX = this.state.barx+diff[0];
        const posY = this.state.bary+diff[1];
        const angle=-Math.atan2(posX, posY)+Math.PI/2;
        const scaleX=posX/this.baselineX;
        const scaleY=posY/this.baselineX;
        const scale= Math.sqrt(scaleX *scaleX + scaleY*scaleY);
        
        this.setState({barx:posX,bary:posY,rotation:angle* (180 / Math.PI), scale:scale });
        
        this.props.toy.barx=posX;
        this.props.toy.bary=posY;

        this.props.toy.rotation=angle; 
        this.props.toy.scale=scale;

        CanvasActions.updatedToy(this.props.toy);

        e.stopPropagation()
        e.preventDefault()
    }


    onMouseUpBar(e){

        if(!this.state.active)
            return;


         var diff=[e.pageX-this.mouseDownBar[0],e.pageY-this.mouseDownBar[1]];
        this.mouseDownBar=[e.pageX,e.pageY];
        
        const posX = this.state.barx+diff[0];
        const posY = this.state.bary+diff[1];
        const angle=-Math.atan2(posX, posY)+Math.PI/2;
        const scaleX=posX/this.baselineX;
        const scaleY=posY/this.baselineX;
        const scale= Math.sqrt(scaleX *scaleX + scaleY*scaleY);
      
         this.setState({barx:posX,bary:posY,rotation:angle* (180 / Math.PI), scale:scale });
       
        document.removeEventListener('mousemove',this.funcMouseMoveBar);
        document.removeEventListener('mouseup',this.funcMouseUpBar);
        
        e.stopPropagation()
        e.preventDefault()
    
    }

	render(){
        
        if(!this.props.toy)return null;

        var xpos=this.props.canvas_width/2;
        
        var ypos=this.props.canvas_height/2;

        let opacity= this.state.active?'1':'0';
        
        var w=this.props.toy.width* this.props.toy.scale;
        var h=this.props.toy.height* this.props.toy.scale;

        var style={
            left:this.state.x-5,
            top:this.state.y-5,
            opacity:opacity
        };

        

        var rectstyle={
            left:-w/2,
            top:-h/2,
            width:w+10,
            height:h+10,
            transform: "rotate("+this.state.rotation+"deg)",
            backgroundPosition:this.state.style_border_bg
        };

        var bardist=Math.sqrt(this.state.barx*this.state.barx + this.state.bary*this.state.bary);
        
        var perpstyle={
            left:w +10,
            top:h/2 ,
            width:bardist-w/2,
            height:4,
            
           
        };

        // let xbarpos=style.width;
        // let ybarpos=style.height/2-25;

        var barstyle={
            left:this.state.barx-25,
            top:this.state.bary-25,
            display:this.state.active?'block':'none'
        };

        
       return ( 
        <div class="toyMod" style={style} onMouseDown={this.onMouseDownTile.bind(this)} onClick={this.onClickTile.bind(this)} >
            <div class="toyModRect" style={rectstyle}>
             <div class="perp" style={perpstyle} />
               
            </div>
            <div class="bar" onMouseDown={this.onMouseDownBar.bind(this)} style={barstyle}>

                <i class="fa fa-repeat icon_bar" aria-hidden="true"></i>
            </div>
        </div>);

    }


}
