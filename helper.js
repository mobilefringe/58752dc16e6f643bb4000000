function init() {
    $("#brand_select").on('change', function() {            
        if ($(this).val() != ""){
            window.location = "/stores/"+ $(this).val();    
        }
    });  

    var _fbq = window._fbq || (window._fbq = []);
        if (!_fbq.loaded) {
            var fbds = document.createElement('script');
            fbds.async = true;
            fbds.src = '//connect.facebook.net/en_US/fbds.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(fbds, s);
            _fbq.loaded = true;
          }
        _fbq.push(['addPixelId', '548352815262916']);
    window._fbq = window._fbq || [];
    window._fbq.push(['track', 'PixelInitialized', {}]);
    
    $(".long_feature_box").hover(function() {
        $(this).find(".long_feature_label").animate({
            "top": "-=81%"
        }, 500)
    }, function() {
        $(this).find(".long_feature_label").animate({
            "top": "+=81%"
        }, 500)
    });
    
    //Campaign Monitor Sign Up
    $('#subForm').submit(function (e) {
        if ($("#agree_terms").prop("checked") != true){
            alert("Please agree to the term and conditions.");
            $("#agree_terms").focus();
            return false;
        }
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Please try again later.");
                } else { // 200
                    $('#subForm').trigger('reset');
                    $("#success_subscribe").fadeIn();
                    
                }
        });
    });
}

function show_content(){
    $(".yield").css({visibility: "visible"});
    $(".loader_backdrop").remove();
    
    var header_stores = getStoresList();
    renderStoreList('#brand_select','#brand_select_template', header_stores, "stores");
    $("#brand_select").prepend("<option selected>Brands</option>");
    
    renderHomeHours();
    
    var pathArray = window.location.pathname;
    if (pathArray === "/" || pathArray === "/home") {
        $("#welcome_message").show();
    }
    
    var feature_items = getFeatureList();
    var one_item = feature_items.slice(0,1);
    renderFeatureItems('#feature_item','#feature_item_template', one_item);
    var two_items = feature_items.slice(1,3);
    renderFeatureItems('#home_feature','#home_feature_template', two_items);
}