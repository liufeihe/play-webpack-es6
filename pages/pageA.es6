import {getDateStr} from '/modules/date.es6';
import {getTextStr} from '/modules/text.es6';
import {getDataSync, getDataWithPromise, getDataWithAsync} from '/modules/data.es6';
import {MyTable} from '/components/table/table.es6';

$(document).ready(function(){
    let table = new MyTable('component-table')
    const setSpan = (str, text) => {
        $('#span-a-date').text(str)
        $('#span-a-text').text(text)
    }
    const bindClick = ()=>{
        $('#changeTextSync').click(()=>{
            var text = getDataSync();
            $('#span-d-text').text(text);
        });

        $('#changeTextWithPromise').click(()=>{
            getDataWithPromise().then(fullfilled=>{
                $('#span-d-text').text(fullfilled);
            }, rejected=>{
                $('#span-d-text').text('failed.');
            });
        });

        $('#changeTextWithAsync').click(async ()=>{
            try {
                let result = await getDataWithAsync();
                $('#span-d-text').text(result);
            } catch (error) {
                alert(error)
            }
        });

        $('#changeTableText').click(()=>{
            let num = parseInt(Math.random()*1000)
            table.setData(num);
        })
    }
    
    setSpan(getDateStr(), getTextStr());
    bindClick();
})