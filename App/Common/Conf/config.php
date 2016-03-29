<?php
return array(
	//'配置项'=>'配置值'
    'MULTI_MODULE'          =>  true,
    'MODULE_ALLOW_LIST'    =>    array('Api','Home','Admin'),

    //数据库配置信息
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => '127.0.0.1', // 服务器地址
    'DB_NAME'   => 'allinone', // 数据库名
    'DB_USER'   => 'allinone', // 用户名
    'DB_PWD'    => 'allinonepwd', // 密码
    'DB_PORT'   => 3306, // 端口
    'DB_PREFIX' => '', // 数据库表前缀
    'DB_CHARSET'=>'utf8',

    "BAOZOU_ACCOUNT" => array(
        "client_id"         =>  "10230158",
        "user_id"           =>  "3722100",
        "access_token"      =>  "4302a7122db3dbb77ee4a216b432fe2e60f0e6f2",
        "ignore_for_mobile" =>  "true",
    ),
    "BAOZOU_API" => array(
        "recent_hot"    =>  "api.ibaozou.com/api/v2/groups/19/recent_hot/page/{pageindex}/{pagesize}?client_id=10230158&access_token=4302a7122db3dbb77ee4a216b432fe2e60f0e6f2&user_id=3722100&ignore_for_mobile=true",
    ),
	"TTPOD_API" => array(
		"search_all" => "so.ard.iyyin.com/sug/sugAll?q={search}",
		"search_music" => "so.ard.iyyin.com/s/song_with_out?size={pagesize}&page={pageindex}&q={search}",
	),

    "QINIU" => array(
        "accessKey"     => "RjfhTxz_fQ0soeScP_HN-1kmfuo1MPg3bZxbj-_c",
        "secrectKey"    => "uCL3X-X-yaUjgcHkcA6OMatbFOj1OVW9PUKojseP",
        "domain"        => "7xkkig.com1.z0.glb.clouddn.com",
        "bucket"        => "allinone",
    ),

    "QQMUSICSERVICE" => array(
        "fcgi_bin"          =>  "http://soso.music.qq.com/fcgi-bin",
        "search_album"      =>  "http://soso.music.qq.com/fcgi-bin/music_json.fcg?w={keyword}&num={pagesize}&t=8&p={pageindex}&platform=yqq&utf8=1",
        "search_song"       =>  "http://soso.music.qq.com/fcgi-bin/search_cp?w={keyword}&n={pagesize}&p={pageindex}&format=json&platform=yqq",
        "search_lyric"      =>  "http://soso.music.qq.com/fcgi-bin/search_cp?w={keyword}&n={pagesize}&t=7&p={pageindex}&platform=yqq",
        "search_mv"         =>  "http://soso.music.qq.com/fcgi-bin/music_json.fcg?w={keyword}&num={pagesize}&t=12&p={pageindex}&platform=yqq&utf8=1&format=json",
        "vkey"              =>  "http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg?json=3&guid={guid}&format=jsonp&platform=yqq",
        "stream"            =>  "http://cc.stream.qqmusic.qq.com/C200{songmid}.m4a?vkey={vkey}&guid={guid}&fromtag=0",
        "expurl"            =>  "http://dl.stream.qqmusic.qq.com/C200{songmid}.m4a?vkey={vkey}&guid={guid}&fromtag=0",
        "mvurl"             =>  "http://vv.video.qq.com/geturl?otype=json&charge=0&vid={vid}",
        "albumpic"          =>  array(
            "picnormal"     =>  "http://i.gtimg.cn/music/photo/album/{albumidmod100}/{picsize}_albumpic_{albumid}_0.jpg",
            "pic300"        =>  "http://i.gtimg.cn/music/photo/album_300/{albumidmod100}/300_albumpic_{albumid}_0.jpg",
            "picmid"        =>  "http://i.gtimg.cn/music/photo/mid_album_{picsize}/{s1}/{s2}/{albummid}.jpg",
            "picrtn"        =>  "http://i.gtimg.cn/mediastyle/y/img/cover_mine_130.jpg",
        ),
        "singerpic"         =>  array(
            "picnormal"     =>  "http://i.gtimg.cn/music/photo/singer/{singeridmod100}/{picsize}_singerpic_{singerid}_0.jpg",
            "pic300"        =>  "http://i.gtimg.cn/music/photo/singer_300/{singeridmod100}/300_singerpic_{singerid}_0.jpg",
            "picmid"        =>  "http://i.gtimg.cn/music/photo/mid_singer_{picsize}/{s1}/{s2}/{singermid}.jpg",
            "picrtn"        =>  "http://i.gtimg.cn/mediastyle/y/img/cover_mine_130.jpg",
        ),
        "albumlist"         =>  "http://i.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid={albummid}&format=jsonp&platform=yqq",

        //歌单列表
        "songtable"         =>  "http://i.y.qq.com/s.plcloud/fcgi-bin/songlist_list.fcg?uin={uin}&g_tk={g_tk}",

        //歌单中的歌曲列表 dirid:歌单id  from:索引开始 to:索引结束 miniportal:1为显示详细
        "songlist"          =>  "http://i.y.qq.com/s.plcloud/fcgi-bin/fcg_musiclist_getinfo_cp.fcg?uin={uin}&dirid={dirid}&from={from}&to={to}&g_tk={g_tk}&miniportal=1",

        //请求参数
        "uin"               =>  "631884352",
        "g_tk"              =>  "1120873758",

        //请求cookie
        "cookie"            =>  "uin=o0631884352; skey=@17YMR5Qne",
    ),

    "LOLSERVICE"     =>   array(
        "champions" => "http://lol.qq.com/biz/hero/champion.js",
        "items"     => "http://lol.qq.com/biz/hero/item.js",
        'skins'     => "http://lol.qq.com/biz/hero/skins.js",
    ),
    "QQCONNECT"     =>  array(
        "appid"         =>  "101256779",
        "appkey"        =>  "3ea39e277da9b63155c4c34b4b63b6e3",
        "callback"      =>  "example/oauth/callback.php",
        "scope"         =>  "get_user_info,
                         add_share,
                         list_album,
                         add_album,
                         upload_pic,
                         add_topic,
                         add_one_blog,
                         add_weibo,
                         check_page_fans,
                         add_t,
                         add_pic_t,
                         del_t,
                         get_repost_list,
                         get_info,
                         get_other_info,
                         get_fanslist,
                         get_idolist,
                         add_idol,
                         del_idol,
                         get_tenpay_addr",
        "errorReport"   =>   true,
        "storageType"   =>  "file",
        "host"          =>  "localhost",
        "user"          =>  "root",
        "password"      =>  "root",
        "database"      =>  "test",
    ),

    //微信配置
    'WECHAT_OPTIONS' => array(
        'token' => 'justdoit', // 填写应用接口的Token
        'encodingaeskey' => 'hiIxjLtUu186KsEhrtQ65CGZFxc2EJc2LSPSO2RpOgZ', // 填写加密用的EncodingAESKey
        'appid' => 'wx4ffa4689bfcd769b', // 填写高级调用功能的app id
        'appsecret' => '8f5b7fb2c77f864c330d16c71a41f161', // 填写高级调用功能的密钥
        'partnerid' => '0', // 财付通商户身份标识
        'partnerkey' => '0', // 财付通商户权限密钥Key
        'paysignkey' => '0', // 商户签名密钥Key
        'debug' => false, // 调试开关
        'logcallback' => 'logg', // 调试输出方法，需要有一个string类型的参数
    ),

    //douyu

    "DOUYUSERVICE" => array(
        "follow"    => "http://www.douyutv.com/member/cp/get_follow_list",
        "cookie"    => "acf_auth=894bIf19wKaUgs%2B9YdHNSvZlsNEvFjkPDJXV9UE%2FZB7fuvQmlr%2FUAox4Mi9nh4oJ485%2B3DvOifbX6cTZS7q534tGaIwbiX%2FjLDOm7oNAclp3F38cZkktB8aJlOKsFAA",
    ),

    "WXTOKEN"   => "justdoit",

    //路径配置
    'TMPL_PARSE_STRING'=>array(
        '__PUBLIC__'=>'Public',
        '__JS__'=>'/js',
        '__CSS__'=>'/css',
        '__IMAGE__'=>'/images',
    ),

    "WECHAT_MSGTPL" => array(
        "text" => "<xml><ToUserName><![CDATA[%s]]></ToUserName><FromUserName><![CDATA[%s]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[%s]]></MsgType><Content><![CDATA[%s]]></Content><FuncFlag>0</FuncFlag></xml>",
    )

);