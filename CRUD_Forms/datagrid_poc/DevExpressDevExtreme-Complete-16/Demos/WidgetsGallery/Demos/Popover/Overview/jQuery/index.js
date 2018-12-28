$(function(){
    $("#popover1").dxPopover({
        target: "#link1",
        showEvent: "dxhoverstart",
        hideEvent: "dxhoverend",
        position: "top",
        width: 300
    }).dxPopover("instance");
    
    $("#popover2").dxPopover({
        target: "#link2",
        showEvent: "dxhoverstart",
        hideEvent: "dxhoverend",
        position: "bottom",
        width: 300,
        showTitle: true,
        title: "Details:"
    }).dxPopover("instance");
    
    $("#popover3").dxPopover({
        target: "#link3",
        showEvent: "dxhoverstart",
        hideEvent: "dxhoverend",
        position: "top",
        width: 300,
        animation: { 
            show: {
                type: "pop",
                from: {  scale: 0 },
                to: { scale: 1 }
            },
            hide: {
                type: "fade",
                from: 1,
                to: 0
            }
        }
    }).dxPopover("instance");
    
    $("#popover4").dxPopover({
        target: "#link4",
        showEvent: "dxclick",
        position: "top",
        width: 300,
        shading: true,
        shadingColor: "rgba(0, 0, 0, 0.5)"
    }).dxPopover("instance");
});