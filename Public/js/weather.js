/**
 * Created by Administrator on 2016/3/31.
 */

var url = {
    'area'      : 'http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade={type}&_jsonp=',
    'weather'   : 'http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=s&code={code}',
};

var baseurl = "";

function loadProvince(data){
    var tpl = ""
    for(item in data){
        tpl += "<option value='"+data[item][1]+"'>" + data[item][0] + "</option>"
    }

    $("#province").html(tpl);
    var pid = $("#province").find("option:selected").val();
    loaddata("city",pid);
}

function loadCity(data){
    var tpl = ""
    for(item in data){
        tpl += "<option value='"+data[item][1]+"'>" + data[item][0] + "</option>"
    }

    $("#city").html(tpl);
    var cid = $("#city").find("option:selected").val();
    loaddata("town",cid);
}

function loadTown(data){
    var tpl = ""
    for(item in data){
        tpl += "<option value='"+data[item][1]+"'>" + data[item][0] + "</option>"
    }

    $("#town").html(tpl);
}

function loaddata(type,id){console.log(type);
    var callback = '';
    baseurl = url.area.replace('{type}',type);
    switch(type){
        case 'province' : callback = 'loadProvince';break;
        case 'city'     : callback = 'loadCity&code='+id;break;
        case 'town'     : callback = 'loadTown&code='+id;break;
        default:return false;
    }

    $.ajax({
        "url":baseurl+callback,
        "method" : "GET",
        "dataType": "jsonp"
    });
}

function loadweather($tid){
    var callback = 'dealweather';
    baseurl = url.weather.replace('{code}',$tid);
    $.ajax({
        "url":baseurl,
        "method" : "GET",
        "dataType": "jsonp"
    })
}

function dealweather($data){

}

$("#province").change(function(){
    var pid = $("#province").val();
    loaddata("city",pid);
});

$("#city").change(function(){
    var cid = $("#city").val();
    loaddata("town",cid);
});

$("#town").change(function(){
    var tid = $("#town").val();

})

loaddata("province");