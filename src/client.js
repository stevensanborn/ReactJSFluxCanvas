
import React from "react"

import ReactDOM from "react-dom"

import MainLayout from './pages/MainLayout'
import IndexLayout from './pages/Index'
import FaqLayout from './pages/Faq'
import BuildLayout from './pages/Build'
import PublishLayout from './pages/Publish'



import {Router, Route, IndexRoute, hashHistory} from "react-router"

const app = document.getElementById("app");


ReactDOM.render(
	<Router history={hashHistory}>
		
		<Route path="/" component={MainLayout}>

			<IndexRoute component={IndexLayout}></IndexRoute>
		
			<Route path="build" component={BuildLayout}></Route>

			<Route path="publish" component={PublishLayout}></Route>
		
			<Route path="faq" component={FaqLayout}></Route>
		
		</Route>

	</Router>,

	app);


