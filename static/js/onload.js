window.addEventListener("load" , function (){

    var $demo_elem   = $(".ui_demo_area");
    var $ex_elem     = $(".ui_explain_area");
    var $demo_child  = $demo_elem.children();

    for ( let i=0 ; i< $demo_child.length ; i++){
        $ex_elem[i].innerText = $demo_child[i].className;
    }

});
