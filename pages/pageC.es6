import {getDateStr} from '/modules/date.es6';
import {getTextStr} from '/modules/text.es6';

$(document).ready(function(){
    function setSpan(str, text) {
        $('#span-c-date').text(str)
        $('#span-c-text').text(text)
    }
    
    setSpan(getDateStr(), getTextStr());
})