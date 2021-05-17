import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(100,100);
btn.setLabel("Click Me!");
btn.onClick(function(e){
	console.log(e.type);
});
btn.onStateChange(function(e) {
    console.log(e.type);
});