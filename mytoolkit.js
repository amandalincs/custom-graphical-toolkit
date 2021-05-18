import {SVG} from './svg.min.js';

const teal = '#449D91';
const light_teal = '#6EBEB3';
const dark_teal = '#2B8A7D';
const white = '#FFFFFF';
const yellow = '#FAC86D'

var MyToolkit = (function() {
    var Button = function(){
        var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group();
        draw.height(80);

        var rect = group.rect(125,50).fill(teal).radius(5);
        var text = group.text("Button").font({
            family: 'Gill Sans',
            size: 18,
            anchor: 'middle',
            leading: '1.5em',
            fill: white
        }).center(rect.width()/2, rect.height()/2);

        var clickEvent = null;
        var stateChange = null;

        group.mouseover(function(event){
            rect.fill({ color: light_teal});
            if (stateChange != null)
                stateChange(event);
        });
        
        group.mouseout(function(event){
            rect.fill({ color: teal});
            if (stateChange != null)
                stateChange(event);
        });

        group.mouseup(function(event){
            rect.fill({ color: teal});
            if (stateChange != null)
                stateChange(event);
        });

        group.mousedown(function(event){
            rect.fill({ color: dark_teal});
            if (stateChange != null)
                stateChange(event);
        });

        group.click(function(event){
            if(clickEvent != null)
                clickEvent(event);
        });

        return {
            move: function(x, y) {
                group.move(x, y);
            },
            onClick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            setLabel: function(newText) {
                text.text(newText);
            }
        };
    };

    var Checkbox = function() {
        var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group();
        draw.height(50);

        var rect = group.rect(20, 20).fill(white).radius(3);
        rect.stroke({ color: teal, width: 3 });

        var text = group.text("Checkbox").font({
            family: 'Gill Sans',
            size: 18,
            fill: teal
        }).attr({ x: 35, y: -7});

        var checkEvent = null;
        var stateChange = null;
        var isChecked = false;

        rect.mouseover(function(event) {
            this.stroke({ color: light_teal });
            if (stateChange != null)
                stateChange(event);
        });

        rect.mouseout(function(event) {
            this.stroke({ color: teal });
            if (stateChange != null)
                stateChange(event);
        });

        rect.mouseup(function(event){
            this.stroke({ color: teal });
            if (stateChange != null)
                stateChange(event);
        });

        rect.mousedown(function(event){
            if (stateChange != null)
                stateChange(event);
        });

        rect.click(function(event) {
            if (!isChecked) {
                this.fill({ color: light_teal});
                isChecked = true;
            } else {
                this.fill({ color: white })
                isChecked = false;
            }

            if (checkEvent != null) {
                if (!isChecked) {
                    checkEvent("unchecked");
                } else {
                    checkEvent("checked");
                }
            }
        });

        return {
            move: function(x, y) {
                group.move(x, y);
            },
            onCheck: function(eventHandler) {
                checkEvent = eventHandler;
            },
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            setLabel: function(newText) {
                text.text(newText);
            }
        };
    };

    var RadioGroup = function(numButtons = 2) {
        var draw = SVG().addTo('body').size('100%','100%');
        var radioGroup = draw.group();
        draw.height(numButtons*30 + 10);

        var checkEvent = null;
        var stateChange = null;

        for (var i = 0; i < numButtons; i++) {
            let radioButton = radioGroup.group();
            let circle = radioButton.circle(20).fill(white);
            circle.stroke({ color: teal, width: 3 })
            circle.data('buttonIndex', i)
            let text = radioButton.text("Radio").font({
                family: 'Gill Sans',
                size: 18,
                fill: teal
            }).attr({ x: 35, y: -7});
            radioButton.y(i*30);

            circle.click(function(event) {
                let buttonIndex = this.data('buttonIndex');    
                let allButtons = radioGroup.children();

                for (var j = 0; j < numButtons; j++) {
                    let buttonCircle = allButtons[j].get(0);
                    if (buttonCircle.data('buttonIndex') == buttonIndex) {
                        buttonCircle.fill({ color: light_teal});
                    } else {
                        buttonCircle.fill({ color: white});
                    }
                }

                if (checkEvent != null) {
                    let displayIndex = buttonIndex + 1;
                    checkEvent("button " + displayIndex + " checked");
                }
            });

            circle.mouseover(function(event) {
                this.stroke({ color: light_teal });
                if (stateChange != null)
                    stateChange(event);
            });

            circle.mouseout(function(event) {
                this.stroke({ color: teal });
                if (stateChange != null)
                    stateChange(event);
            });

            circle.mouseup(function(event) {
                this.stroke({ color: teal });
                if (stateChange != null)
                    stateChange(event);
            });

            circle.mousedown(function(event) {
                if (stateChange != null)
                    stateChange(event);
            });
        }

        return {
            move: function(x, y) {
                radioGroup.move(x, y);
            },
            onCheck: function(eventHandler) {
                checkEvent = eventHandler;
            },
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            setLabel: function(index, newText) {
                let allButtons = radioGroup.children();
                for (var i = 0; i < numButtons; i++) {
                    let buttonText = allButtons[i].get(1);
                    if (i == index-1) {
                        buttonText.text(newText);
                    }
                }
            }
        };

    };

    var TextBox = function() {
        var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group();

        var rect = group.rect(200, 30).fill(white).radius(5);
        rect.stroke({ color: teal, width: 3 });
        rect.addClass('box');

        var text = group.text("").x(10).y(-2).font({
            family: 'Gill Sans',
            size: 18,
            fill: teal
        });

        var caret = group.line(10, 5, 10, 25).stroke({ width: 1, color: white });
        var isFocused = false;

        var textChange = null;
        var stateChange = null;

        group.click(function(event) {
            isFocused = true;
            caret.stroke({ width: 2, color: light_teal });
            if (stateChange != null)
                stateChange(event);
        });

        group.mouseover(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        group.mouseout(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        group.mouseup(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        group.mousedown(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        SVG.on(document, "click", function(event) {
            if (event.target.className.baseVal != "box") {
                isFocused = false;
                caret.stroke({ width: 1, color: white });
            }
        });

        SVG.on(document, "keydown", function(event) {
            if (isFocused) {
                if (event.keyCode !== 8 && !event.shiftKey) {
                    if (text.length() < rect.width() - 25) {
                        var input = "";
                        input = text.text() + event.key;
                        text.text(input);
                        let inputLength = text.length();
                        caret.plot(group.x() + inputLength + 12, group.y() + 5, group.x() + inputLength + 12, group.y() + 25);
                        if (event.keyCode == 32) {
                            caret.plot(group.x() + inputLength + 15, group.y() + 5, group.x() + inputLength + 15, group.y() + 25);
                        }
                    }
                } else if (event.keyCode == 8) {
                    var existing = text.text();
                    var removed = existing.substring(0, existing.length - 1);
                    text.text(removed);
                    let removedLength = text.length();
                    caret.plot(group.x() + removedLength + 12, group.y() + 5, group.x() + removedLength + 12, group.y() + 25);
                } else if (event.shiftKey) {
                    if (text.length() < rect.width() - 25) {
                        var input = "";
                        if (event.keyCode !== 16) {
                            input = text.text() + String.fromCharCode(event.keyCode).toUpperCase();
                        } else {
                            input = text.text();
                        }
                        text.text(input);
                        let inputLength = text.length();
                        caret.plot(group.x() + inputLength + 12, group.y() + 5, group.x() + inputLength + 12, group.y() + 25);
                    }
                }

                if (textChange != null) {
                    textChange("text changed");
                }
            }
        })

        return {
            move: function(x, y) {
                group.move(x, y);
            },
            onTextChange: function(eventHandler) {
                textChange = eventHandler;
            },
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            getText: function() {
                return text.text();
            }
        };
    };
return {Button, Checkbox, RadioGroup, TextBox}
}());

export{MyToolkit}