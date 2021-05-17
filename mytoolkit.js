import {SVG} from './svg.min.js';

const teal = '#449D91';
const light_teal = '#6EBEB3';
const dark_teal = '#2B8A7D';

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
            fill: "#ffffff"
        }).center(rect.width()/2, rect.height()/2);

        var clickEvent = null;
        var stateChange = null;

        rect.mouseover(function(event){
            this.fill({ color: light_teal});
            if (stateChange != null)
                stateChange(event);
        })
        
        rect.mouseout(function(event){
            this.fill({ color: teal});
            if (stateChange != null)
                stateChange(event);
        })

        rect.mouseup(function(event){
            this.fill({ color: teal});
            if (stateChange != null)
                stateChange(event);
        })

        rect.mousedown(function(event){
            this.fill({ color: dark_teal});
            if (stateChange != null)
                stateChange(event);
        })

        rect.click(function(event){
            if(clickEvent != null)
                clickEvent(event);
        })

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
        }
    }
return {Button}
}());

export{MyToolkit}