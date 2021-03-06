import {SVG} from './svg.min.js';

const teal = '#449D91';
const light_teal = '#6EBEB3';
const dark_teal = '#2B8A7D';
const white = '#FFFFFF';
const lightest_teal = '#A5DED6';

const draw = SVG().addTo('body').size('100%','100%');
draw.height(700)

var MyToolkit = (function() {
    /** Creates a clickable button with text label. */
    var Button = function(){
        var group = draw.group();

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
            /** Moves the button by its upper left corner to a given x and y position.
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler that listens for when the button is clicked.
             * @param {Event} eventHandler - The click event.
             */
            onClick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            /** Event handler that listens for when the widget state has changed.
             * @param {Event} eventHandler - The state change event.
             */
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            /** Sets the text displayed on the button.
             * @param {string} newText - The desired button text.
             */
            setLabel: function(newText) {
                text.text(newText);
            }
        };
    };

    /** Creates a checkbox with a label to the right of the box. */
    var Checkbox = function() {
        var group = draw.group();

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
            /** Moves the button by its upper left corner to a given x and y position.
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler that listens for when the checked state has changed
             * @param {Event} eventHandler - The check event.
             */
            onCheck: function(eventHandler) {
                checkEvent = eventHandler;
            },
            /** Event handler that listens for when the widget state has changed.
             * @param {Event} eventHandler - The state change event.
             */
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            /** Sets the label text that appears to the right of the check box.
             * @param {string} newText - The desired label text.
             */
            setLabel: function(newText) {
                text.text(newText);
            }
        };
    };

    /** Creates a group of a specified number of radio buttons (minimum of 2), positioned vertically.
     * @param {numButtons} - The desired number of radio buttons.
     */
    var RadioGroup = function(numButtons = 2) {
        var radioGroup = draw.group();

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
            /** Moves the button by its upper left corner to a given x and y position.
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             */
            move: function(x, y) {
                radioGroup.move(x, y);
            },
            /** Event handler that listens for when the checked state has changed.
             * @param {eventHandler} - The check event.
             */
            onCheck: function(eventHandler) {
                checkEvent = eventHandler;
            },
            /** Event handler that listens for when the widget state has changed.
             * @param {eventHandler} - The state change event.
             */
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            /** Sets the label text that appears to the right of each radio button.
             * @param {index} - The index of the desired button.
             * @param {newText} - The desired label text.
             */
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

    /** Creates a text box that allows users to input text. */
    var TextBox = function() {
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
            /** Moves the button by its upper left corner to a given x and y position.
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler that listens for when the text has changed.
             * @param {Event} eventHandler - The text change event.
             */
            onTextChange: function(eventHandler) {
                textChange = eventHandler;
            },
            /** Event handler that listens for when the widget state has changed.
             * @param {Event} eventHandler - The state change event.
             */
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
            /** Gets the text entered by the user.
             * @return {string} The text entered by the user.
             */
            getText: function() {
                return text.text();
            }
        };
    };

    /** Creates a draggable scrollbar. */
    var Scrollbar = function() {
        var group = draw.group();

        var bar = group.rect(20, 300).fill(lightest_teal).radius(5);
        var thumb = group.rect(12, bar.height()/4).fill(teal).radius(5).cx(10).y(2);

        var isDragged = false;
        var thumbMove = null;
        var stateChange = null;

        thumb.mousedown(function(event) {
            isDragged = true;
            thumb.fill({ color: light_teal});
            if (stateChange != null)
                stateChange(event);
        });

        thumb.mouseover(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        thumb.mouseup(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        thumb.mouseout(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        SVG.on(document, 'mousemove', function(event) {
            if (isDragged) {
                if (event.offsetY > bar.y() && event.offsetY < bar.height() + 125) {
                    thumb.y(event.offsetY);
                }
                if (thumbMove != null) {
                    thumbMove("thumb moved");
                }
            }
        });

        SVG.on(document, 'mouseup', function(event) {
            isDragged = false;
            thumb.fill({ color: teal});
        });

        return {
            /** Moves the button by its upper left corner to a given x and y position.
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler that listens for when the scroll thumb has moved.
             * @param {Event} eventHandler - The thumb move event.
             */
            onThumbMove: function(eventHandler) {
                thumbMove = eventHandler;
            },
            /** Sets the height of the scrollbar.
             * @param {number} newHeight - The desired scrollbar height.
             */
            setHeight: function(newHeight) {
                bar.height(newHeight);
            },
            /** Gets the position of the scroll thumb.
             * @return {string} The scroll thumb position (x, y).
             */
            getThumbPosition: function() {
                return thumb.x() + ", " + thumb.y();
            },
            /** Event handler that listens for when the widget state has changed.
             * @param {Event} eventHandler - The state change event.
             */
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            },
        };
    };

    /** Creates an animated progress bar. */
    var ProgressBar = function() {
        var group = draw.group();

        var bar = group.rect(300, 20).fill(lightest_teal).radius(10);
        bar.stroke({ color: light_teal, width: 3 });
        var increment = 50;
        var percent = group.rect(0, 20).fill(light_teal).radius(10);

        var incrementEvent = null;
        var stateChange = null;

        group.mousedown(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        group.mouseover(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        group.mouseup(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        group.mouseout(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        // for (var i = 0; i < bar.width() / percent.width(); i++) {
        //     percent.animate({
        //         duration: 5000,
        //         delay: 1000,
        //         when: 'now',
        //         wait: 500
        //     }).width(percent.width() + increment * i);
        // }

        return {
            /** Moves the button by its upper left corner to a given x and y position.
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Sets the width of the progress bar.
             * @param {number} newWidth - The desired progress bar width.
             */
            setWidth: function(newWidth) {
                bar.width(newWidth);
            },
            /** Sets the increment value of the progress bar.
             * @param {number} newIncrement - The desired increment value.
             */
            setIncrement: function(newIncrement) {
                increment = newIncrement;
            },
            /** Gets the increment value of the progress bar.
             * @return {number} The increment value.
             */
            getIncrement: function() {
                return increment;
            },
            /** Increments the value of the progress bar by specified amount.
             * @param {number} value - Increment value from 0-100.
             */
            incrementBar: function(value) {
                percent.animate({
                    duration: 1000,
                    delay: 1000,
                    when: 'now',
                    wait: 500
                }).width(percent.width() + value);
                console.log("progress incremented by " + value);
            },
            /** Event handler that listens for when the progress bar has incremented.
             * @param {Event} eventHandler - The increment event.
             */
            onIncrement: function(eventHandler) {
                incrementEvent = eventHandler;
            },
            /** Event handler that listens for when the widget state has changed.
             * @param {Event} eventHandler - The state change event.
             */
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            }
        };
    };

    /** Creates a toggle button. */
    var Toggle = function() {
        var group = draw.group();

        var button = group.rect(100, 50).fill(lightest_teal).radius(25);
        var toggle = group.rect(40, 40).fill(white).radius(20).x(5).y(5);

        var toggleEvent = null;
        var stateChange = null;
        var isOn = false;

        toggle.mouseover(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        toggle.mouseout(function(event) {
            if (stateChange != null)
                stateChange(event);
        });

        toggle.mouseup(function(event){
            if (stateChange != null)
                stateChange(event);
        });

        toggle.mousedown(function(event){
            if (stateChange != null)
                stateChange(event);
        });

        toggle.click(function(event) {
            if (!isOn) {
                toggle.animate({
                    duration: 500,
                    when:'now',
                }).dx(50);
                button.animate({
                    duration: 500,
                    when:'now'
                }).fill(teal);
                isOn = true;
            } else {
                toggle.animate({
                    duration: 500,
                    when:'now',
                }).dx(-50);
                button.animate({
                    duration: 500,
                    when:'now'
                }).fill(lightest_teal);
                isOn = false;
            }

            if (toggleEvent != null) {
                if (!isOn) {
                    toggleEvent("toggle off");
                } else {
                    toggleEvent("toggle on");
                }
            }
        });

        return {
            /** Moves the button by its upper left corner to a given x and y position.
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler that listens for when the toggle state has changed.
             * @param {Event} eventHandler - The toggle event.
             */
            onToggle: function(eventHandler) {
                toggleEvent = eventHandler;
            },
            /** Event handler that listens for when the widget state has changed.
             * @param {Event} eventHandler - The state change event.
             */
            onStateChange: function(eventHandler) {
                stateChange = eventHandler;
            }
        };
    };
return {Button, Checkbox, RadioGroup, TextBox, Scrollbar, ProgressBar, Toggle}
}());

export{MyToolkit}