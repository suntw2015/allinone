<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link href="/css/bootstrap.min.css" rel="stylesheet">

    <title>微信消息发送</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/weixin.css" rel="stylesheet">

</head>
<body>

    <div class="page-header">
        <div class="container">
            <h1>微信功能测试</h1>
        </div>
    </div>
    <div class="container">
        <h2>用户列表</h2>
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <td>openid</td>
                    <td>headimg</td>
                    <td>nickname</td>
                    <td>sex</td>
                    <td>language</td>
                    <td>city</td>
                    <td>province</td>
                    <td>country</td>
                    <td>groupid</td>
                </tr>
            </thead>
            <tbody>
                <?php if(is_array($userlist)): foreach($userlist as $key=>$user): ?><tr>
                        <td><?php echo ($user["openid"]); ?></td>
                        <td><img src="<?php echo ($user['headimgurl']); ?>" class="img-circle" style="width: 50px;height: 50px;;"></td>
                        <td><?php echo ($user["nickname"]); ?></td>
                        <td><?php echo ($user["sex"]); ?></td>
                        <td><?php echo ($user["language"]); ?></td>
                        <td><?php echo ($user["city"]); ?></td>
                        <td><?php echo ($user["province"]); ?></td>
                        <td><?php echo ($user["country"]); ?></td>
                        <td><?php echo ($user["groupid"]); ?></td>
                    </tr><?php endforeach; endif; ?>
            </tbody>
        </table>

        <h2>发送模板消息</h2>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">微信号</span>
            <input type="text" class="form-control" id="wxid" placeholder="微信号">
        </div>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon2">微信号</span>
            <input type="text" class="form-control" id="tmpid" placeholder="模板号">
        </div>
        <button class="btn btn-default btn-block" id="sendmsg">发送消息</button>
    </div>

<script type="text/javascript" src="/js/jquery-2.1.4.min.js"></script>
<!--<script src="//code.jquery.com/jquery-1.10.2.js"></script>-->
<script src="/js/bootstrap.min.js"></script>
</body>
</html>

    <script type="text/javascript">
        $(document).ready(function(){
            $("#sendmsg").click(function(){
                var wxid  = $("#wxid").val();
                var tmpid = $("#tmpid").val();

                if(wxid.length<1){
                    return false;
                }

                if(tmpid.length<1){
                    return false;
                }

                $.get(
                        "/Home/Index/sendtplmsg/",
                        {"openid": wxid,"tplid":tmpid},
                        function (res) {
                            if(res.status=="success"){
                                var alertbox = $('<div class="alert alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><p></p></div>').insertAfter($("#sendmsg"));
                                alertbox.addClass("alert-success").find("p").text("发送成功");
                            }else{
                                var alertbox = $('<div class="alert alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><p></p></div>').insertAfter($("#sendmsg"));
                                alertbox.addClass("alert-danger").find("p").text(res.msg);
                            }
                        }
                )
            })
        })
    </script>