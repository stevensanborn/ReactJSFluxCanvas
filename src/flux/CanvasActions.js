import dispatcher from './Dispatcher'


export function setBaseImage(img){
	
	dispatcher.dispatch({
		type:"SET_BASE_IMAGE",
		img:img
	});
}


export function addToy(t){
	dispatcher.dispatch({
		type:"ADD_TOY",
		toy:t
	});
}
export function removeToy(t){
	dispatcher.dispatch({
		type:"REMOVE_TOY",
		toy:t
	});
}


export function updatedToy(t){
	
	dispatcher.dispatch({
		type:"UPDATED_TOY",
		toy:t
	});

}


export function setCurrentToy(t){
	
	console.log("dispatching set current toy");

	dispatcher.dispatch({
		type:"SET_CURRENT_TOY",
		toy:t
	});

}