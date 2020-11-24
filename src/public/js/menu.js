$(document).ready(function () {
        
    $(".ui.sidebar.first").sidebar("attach events", ".toc1.item");

    $('.logout_view_open').click(function (e) { 
        $('.logout_model').modal({
        blurring: true
        }).modal('show');
    });   
        
    $('.dropdown').dropdown();

    $("input, select").change(function(){
        $(this).closest('.field').find('.label').remove();
        $(this).closest('.search').find('.label').remove();
        $(this).closest('.field').removeClass('error');
    });

});

