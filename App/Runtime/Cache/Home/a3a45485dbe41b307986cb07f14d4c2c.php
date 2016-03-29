<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="/css/mobiscroll.custom-2.17.0.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
        <input id="demo" value="3" readonly />

    <script type="text/javascript" src="/js/jquery-1.9.1.js"></script>
    <script src="/js/mobiscroll.custom-2.17.0.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var i,
                datelist = ['\u5927\u7814\u53e4\u57ce','\u675f\u6cb3\u53e4\u57ce','11-06'],
                hourlist = ['1','2','3'],
                minutelist = ['00','20','40'],
                wheel1 = {label:['日期'], keys: [], values: [] },
                wheel2 = {label:['小时'], keys: [], values: [] },
                wheel3 = {label:['分钟'], keys: [], values: [] },
                wheels = [[wheel1]];

        for (i=0 ;i<datelist.length;i++){
            wheel1.keys.push(datelist[i]);
            wheel1.values.push(datelist[i]);
        }
        for (i=0 ;i<hourlist.length;i++){
            wheel2.keys.push(hourlist[i]);
            wheel2.values.push(hourlist[i]);
        }
        for (i=0 ;i<minutelist.length;i++){
            wheel3.keys.push(minutelist[i]);
            wheel3.values.push(minutelist[i]);
        }
        var cityindex,
//                    citylist   = <?php echo ($citylist); ?>,
                citylist = [{"cityid":5,"cityname":"大研古城","remarks":""},{"cityid":4,"cityname":"束河古城","remarks":""}],
                citywheel  = {label:['地点'], keys: [], values: []},
                citywheels = [[citywheel]];

        for(cityindex=0;cityindex<citylist.length;cityindex++){
            citywheel.keys.push(citylist[cityindex].cityid);
            citywheel.values.push(citylist[cityindex].cityname);
        }
        $(function () {

            $('#demo').mobiscroll().scroller({
                theme: 'android-holo',
                lang:'zh',
                mode:'mixed',
                rows:5,
                setText:'确认',
                cancelText:'取消',
                display: 'bottom',
                wheels:citywheels,
                onBeforeShow:function(inst){
                    inst.setValue(['束河古城'],true,2,true);
                },
                onChange:function(valueText,inst){
                    var value = valueText.split(' ');
                    var date = value[0];
                    if(date=="11-04"){
                        inst.setValue([date,value[1],value[2]]);
                    }
                },
                headerText: function (valueText) { //自定义弹出框头部格式
                    array = valueText.split(' ');
                    return array[0] + " " + array[1] + ":" + array[2];
                },
                onSelect:function(valueText,inst){
                    array = valueText.split(' ');
                    $("#selected_date").text(array[0] + " " + array[1] + ":" + array[2]);
                }
            });

            $('#show').click(function(){
                $('#demo').mobiscroll('show');
                return false;
            });

            $('#clear').click(function () {
                $('#demo').mobiscroll('clear');
                return false;
            });

        });

    </script>
</body>
</html>