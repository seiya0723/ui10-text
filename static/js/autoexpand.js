window.addEventListener("load" , function (){
    
    var $textarea    = $("textarea");

    for (let i=0;i<$textarea.length;i++){
        auto_expand_textarea( $textarea.eq(i) );
    }

});

$(function (){ 

    $("textarea").on("input" , function (){ 
        auto_expand_textarea($(this));
    }); 

});

//デフォルトで半角は1.0、全角は2.0として文字数をカウントする
function str_counter(str,half=1.0,full=2.0){

    var result = 0;

    for(let i=0;i<str.length;i++){
        var chr = str.charCodeAt(i);
        if((chr >= 0x00 && chr < 0x81) ||
            (chr === 0xf8f0) ||
            (chr >= 0xff61 && chr < 0xffa0) ||
            (chr >= 0xf8f1 && chr < 0xf8f4)){
            result += half;
        }   
        else{
            result += full;
        }   
    }   

    return result;
}


//テキストエリアの自動拡張関数
function auto_expand_textarea( $textarea ){

    var text            = $textarea.val();

    //半角での文字数を取得
    var fontsize        = parseFloat($textarea.css("font-size").replace("px","")) / 2 ;
    var pd_left         = parseFloat($textarea.css("padding-left").replace("px",""));
    var pd_right        = parseFloat($textarea.css("padding-right").replace("px",""));
    var bd_left         = parseFloat($textarea.css("border-left-width").replace("px",""));
    var bd_right        = parseFloat($textarea.css("border-right-width").replace("px",""));

    var textarea_width  = parseFloat($textarea.width()) - (pd_right + pd_left + bd_right + bd_left );

    //1行につき格納できる文字数

    //TODO:ブラウザごとに1行に格納する文字数が異なっているため、firefoxでは問題ないものがChromeでは不具合が出てしまう。
    //var row_max_length   = parseInt( textarea_width / fontsize);
    var row_max_length   = Math.round( textarea_width / fontsize);

    var text_list       = $textarea.val().split("\n");
    var nl_cnt          = text_list.length;

    var over_width_cnt  = 0;

    //改行なしでtextareaのwidthをはみ出した回数を計測
    for ( let i=0;i<text_list.length;i++){
        var text_length = str_counter(text_list[i]);

        if ( text_length > row_max_length){
            over_width_cnt += parseInt(text_length / row_max_length);
        }   
    }   

    //入力した文字列が改行した数 + 改行せずに文字列を入力しwidthをはみ出した回数
    var text_row        = nl_cnt + over_width_cnt;

    var line_height     = parseFloat($textarea.css("line-height"));
    var textarea_row    = parseFloat($textarea.attr("rows"));

    if ( (text) && (textarea_row < text_row )  ){  
        $textarea.height(line_height * text_row);
    }   
    else {
        $textarea.height(line_height * textarea_row);
    }   

}
