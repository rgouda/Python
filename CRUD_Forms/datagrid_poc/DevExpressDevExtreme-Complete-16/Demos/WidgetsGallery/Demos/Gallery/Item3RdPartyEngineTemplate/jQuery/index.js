$(function(){
    DevExpress.ui.setTemplateEngine("underscore");
    
    var galleryWidget = $("#gallery").dxGallery ({
        dataSource: gallery,
        height: 440,
        width: "100%",
        loop: true,
        showIndicator: false,
        itemTemplate: $("#item-template")
    }).dxGallery("instance");
});