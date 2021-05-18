import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(100, 0);
btn.setLabel("Click Me!");
btn.onClick(function(e){
	console.log(e.type);
});
btn.onStateChange(function(e) {
    console.log(e.type);
});

// Implement a MyToolkit Checkbox
var checkbox = new MyToolkit.Checkbox;
checkbox.move(300, 10);
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

// Implement a MyToolkit RadioGroup
var radioGroup = new MyToolkit.RadioGroup(4);
radioGroup.move(500, 10);
radioGroup.setLabel(1, "Option 1");
radioGroup.setLabel(2, "Option 2");
radioGroup.setLabel(3, "Option 3");
radioGroup.setLabel(4, "Option 4");
radioGroup.onCheck(function(checkStatus) {
    console.log(checkStatus);
})
radioGroup.onStateChange(function(e) {
    console.log(e.type);
});

// Implement a MyToolkit TextBox
var textBox = new MyToolkit.TextBox;
textBox.move(700, 10);
textBox.onTextChange(function(textStatus) {
    console.log(textStatus)
    console.log(textBox.getText());
})
textBox.onStateChange(function(e) {
    console.log(e.type);
});