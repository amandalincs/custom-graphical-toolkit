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

        var rect = group.rect(20, 20).fill('#fff').radius(3);
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
                this.fill({ color: yellow});
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
return {Button, Checkbox}
}());

export{MyToolkit}