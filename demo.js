import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(100, 40);
btn.setLabel("Click Me!");
btn.onClick(function(e){
	console.log(e.type);
});
btn.onStateChange(function(e) {
    console.log(e.type);
});

// Implement a MyToolkit Checkbox
var checkbox = new MyToolkit.Checkbox;
checkbox.move(300, 50);
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
radioGroup.move(500, 50);
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
textBox.move(700, 50);
textBox.onTextChange(function(textStatus) {
    console.log(textStatus)
    console.log(textBox.getText());
})
textBox.onStateChange(function(e) {
    console.log(e.type);
});

// Implement a MyToolkit Scrollbar
var scrollbar = new MyToolkit.Scrollbar;
scrollbar.move(100, 200);
scrollbar.setHeight(300);
scrollbar.onThumbMove(function(thumbStatus) {
    console.log(thumbStatus);
    console.log(scrollbar.getThumbPosition());
})
scrollbar.onStateChange(function(e) {
    console.log(e.type);
});

// Implement a MyToolkit Progress Bar
var progressBar = new MyToolkit.ProgressBar;
progressBar.move(300, 300);
progressBar.setWidth(300);
progressBar.setIncrement(100);
console.log(progressBar.getIncrement());
progressBar.incrementBar(100);
progressBar.onIncrement(function(incrementStatus) {
    console.log(incrementStatus);
})
progressBar.onStateChange(function(e) {
    console.log(e.type);
});