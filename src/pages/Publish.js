
import React from "react"
import CanvasStore from "../flux/CanvasStore"

class PublishLayout extends React.Component{

	constructor(props){
		
		super(props)

	}

	onClickDownload(){

	 	var pom = document.createElement('a');
        pom.setAttribute('href', CanvasStore.publishedData);
        pom.setAttribute('download', 'download.png');
        pom.style.display = 'none';
        document.body.appendChild(pom);
        pom.click();
        document.body.removeChild(pom);   
	}

	 componentWillMount() {
	 		if(!CanvasStore.publishedData){

			this.context.router.push("/");

		}
	 }

	render(){
		return (
			<div class="container"> 
				

			<section>

				<div class="container build-container">
					
					<img src={CanvasStore.publishedData} class="publish-preview"  />

				</div>

				<div>
					
					<button class="btn btn-primary" onClick={this.onClickDownload.bind(this)} >Download</button>

				</div>

				<div class="social-share">
	
					<p>
					<a class="top_social" href="javascript:window.location=%22http://www.facebook.com/sharer.php?u=%22+encodeURIComponent(document.location)+%22&#38;t=%22+encodeURIComponent(document.title)" title="Share on Facebook...">Like</a> | 
					<a href="https://plusone.google.com/_/+1/confirm?hl=en&url=<?php if(is_home()){echo home_url();}else{the_permalink();} ?>" target="_blank" title="Plus one this page on Google">Google +1</a> | 
					<a class="top_social" href="javascript:window.location=%22https://twitter.com/share?url=%22+encodeURIComponent(document.location)+%22&text=%22+encodeURIComponent(document.title)">Tweet</a> | 
					<a href="http://www.linkedin.com/shareArticle?mini=true&url=<?php if(is_home()){echo home_url();}else{the_permalink();} ?>" target="_blank">Share on LinkedIn</a> | 
					<a class="top_social" href="javascript:window.location=%22http://reddit.com/submit?url=%22+encodeURIComponent(document.location)+%22&title=%22+encodeURIComponent(document.title)">Submit to Reddit</a> | 
					<a class="top_social" href="javascript:window.location=%22http://news.ycombinator.com/submitlink?u=%22+encodeURIComponent(document.location)+%22&t=%22+encodeURIComponent(document.title)">Post to Hacker News</a>
					</p>

				</div>
				
				

			</section>

			

			</div>
		);
	}

}


PublishLayout.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default  PublishLayout;

