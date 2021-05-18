import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(100, 100);
btn.setLabel("Click Me!");
btn.onClick(function(e){
	console.log(e.type);
});
btn.onStateChange(function(e) {
    console.log(e.type);
});

// Implement a MyToolkit Checkbox
var checkbox = new MyToolkit.Checkbox;
checkbox.move(100, 50);
checkbox.setLabel("Check Me!");
checkbox.onCheck(function(checkStatus) {
    console.log(checkStatus);
    if (checkStatus == "unchecked") {
        checkbox.setLabel("Check Me!");
    } else if (checkStatus == "checked") {
        checkbox.setLabel("Uncheck Me!");
    }
});
checkbox.onStateChange(function(e) {
    console.log(e.type);
});