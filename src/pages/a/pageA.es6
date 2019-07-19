import {getDateStr} from '../../modules/date.es6';
import {getTextStr} from '../../modules/text.es6';
import {getDataSync, getDataWithPromise, getDataWithAsync} from '../../modules/data.es6';
import {MyTable} from '../../components/table/table.es6';

import './a.scss';

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

        $('#changePic').click(()=>{
            let picMap = [require('../../assets/images/adv_course.png'), require('../../assets/images/adv_realscreen.png')], 
            url = picMap[Math.round(Math.random(1))];
            $('img')[0].src = url;//require(url);
        });

        $('#getRemoteList').click(()=>{
            $.ajax({
                type: 'GET',
                url: '/stock/mall?fmt=json&size=9&page=1&order=quarter_return&asc=0',
                processData: false
            }).always(function (data) {
                var cnt = $('div.remote-list'), lists;
                data = JSON.parse(data);
                lists = data.data.strategy_list || [];
                cnt.empty();
                lists.forEach(strategy => {
                    let item = '<p>'+strategy.name+'\t'+strategy.quarter_return+'\t'+strategy.annual_return+'</p>';
                    cnt.append(item)
                });
            });
        });
    }
    
    setSpan(getDateStr(), getTextStr());
    bindClick();
})