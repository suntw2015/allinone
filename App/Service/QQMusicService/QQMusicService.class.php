<?php
	/**
	 * Created by Tianwen Sun.
	 * Date: 2015/8/24
	 * Time: 18:17
	 * Project: allinone
	 */

namespace Service\QQMusicService;
use Org\Net\Http;
use Vendor\Http\HttpMethod;
use Vendor\Http\HttpRequest;

class QQMusicService{

	protected $pgv_pvid = "";
	protected $lasttime = "";
	protected $vkey     = "";
	protected $g_tk     = "";
	protected $qqmusicService = "";

	public function __construct(){
		$this->qqmusicService = C("QQMUSICSERVICE");
		$this->createkey();
		$this->createg_tk();
	}

	public function info(){
		return array(
			"pgv_pvid" => $this->pgv_pvid,
			"vkey"     => $this->vkey,
		);
	}

	public function search($keyword){
		$qqmusicService = C("QQMUSICSERVICE");
	}

	public function lyric($keyword,$pageindex=1,$pagesize=10){
		$keyword = str_replace(" ","%20",$keyword);
		$lyricurl = $this->qqmusicService["search_lyric"];
		$lyricurl = str_replace(array("{keyword}","{pageindex}","{pagesize}"),array($keyword,$pageindex,$pagesize),$lyricurl);

		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$lyricurl);

		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);

		$res = json_decode($res,true);
		$res = $res["data"]["lyric"]["list"];
		$lyriclist = array();
		foreach($res as $key=>$value){
			$lyriclist[] = array(
				"content" => strip_tags(htmlspecialchars_decode($value["content"],"<hr/>")),
			);
		}

		return $lyriclist;
	}

	public function song($keyword,$pageindex=1,$pagesize=10){
		$keyword = str_replace(" ","%20",$keyword);
		$songurl = $this->qqmusicService["search_song"];
		$songurl = str_replace(array("{keyword}","{pageindex}","{pagesize}"),array($keyword,$pageindex,$pagesize),$songurl);

		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$songurl);

		$realurl = $this->qqmusicService["stream"];
		$realurl = str_replace(array("{vkey}","{guid}"),array($this->vkey,$this->pgv_pvid),$realurl);

		$expurl  = $this->qqmusicService["expurl"];
		$expurl  = str_replace(array("{vkey}","{guid}"),array($this->vkey,$this->pgv_pvid),$expurl);

		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);
		$res = json_decode($res,true);
		$res = $res["data"]["song"]["list"];
		$songlist = array();
		foreach($res as $key=>$value){
			$singname = array();
			foreach($value["singer"] as $k=>$v){
				array_push($singname,$v["name"]);
			}
			$songlist[] = array(

				"singername"    =>  $value["singer"][0]["name"],
				"albumid"   =>  $value["albumid"],
				"albummid"  =>  $value["albummid"],
				"albumname" =>  $value["albumname"],
				"songid"    =>  $value["songid"],
				"songmid"   =>  $value["songmid"],
				"songname"  =>  $value["songname"],
				"stream"    =>  $value["stream"],
				"vid"       =>  $value["vid"],
				"url"       =>  str_replace("{songmid}",$value["songmid"],$realurl),
				"expurl"    =>  str_replace("{songmid}",$value["songmid"],$expurl),
			);
		}

		return $songlist;
	}

	public function album($keyword,$pageindex=1,$pagesize=10){
		$keyword = str_replace(" ","%20",$keyword);
		$albumurl = $this->qqmusicService["search_album"];
		$albumurl = str_replace(array("{keyword}","{pageindex}","{pagesize}"),array($keyword,$pageindex,$pagesize),$albumurl);
		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$albumurl);

		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);

		$res = iconv("gbk","utf-8",$res);
		$res = strip_tags(htmlspecialchars_decode($res));
		$res = preg_replace_callback("/(\w+):/is",function ($match){return '"'.substr($match[0],0,-1).'":';},$res);
		$res = str_replace(array('""','http"',"'"),array('"','http','"'),$res);
		$res = json_decode($res,true);
		$res= $res["list"];

		$albumlist = array();
		foreach($res as $key=>$value){
			$albumlist[] = array(
				"albumid"   =>  $value["albumID"],
				"albummid"  =>  $value["albumMID"],
				"albumname" =>  $value["albumName"],
				"albumpic"  =>  $this->getalbumpic($value["albumMID"],"150"),
				"singerid"  =>  $value["singerID"],
				"singermid" =>  $value["singerMID"],
				"singername"=>  $value["singerName"],
				"singerpic" =>  $this->getsingerpic($value["singerMID"],"150"),
				"publictime"=>  $value["publicTime"],
			);
		}

		return $albumlist;
	}

	public function mv($keyword,$pageindex=1,$pagesize=10){
		$keyword = str_replace(" ","%20",$keyword);
		$songurl = $this->qqmusicService["search_mv"];
		$songurl = str_replace(array("{keyword}","{pageindex}","{pagesize}"),array($keyword,$pageindex,$pagesize),$songurl);
		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$songurl);

		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);
		$res = iconv("gbk","utf-8",$res);
		$res = strip_tags(htmlspecialchars_decode($res));
		$res = preg_replace_callback("/(\w+):/is",function ($match){return '"'.substr($match[0],0,-1).'":';},$res);
		$res = str_replace(array('""','http"',"'"),array('"','http','"'),$res);
		$res = json_decode($res,true);
		$res= $res["list"];

		$songlist = array();

		foreach($res as $key=>$value){
			$songlist[] = array(
				"mvid"  =>  $value["mv_id"],
				"vid"   =>  $value["v_id"],
				"mvpic" =>  $value["mv_pic_url"],
				"mvurl" =>  $this->getmvurl($value["v_id"]),
				"mvname"=>  $value["mv_name"],
				"singername"    =>  $value["singer_name"],
				"singerid"      =>  $value["singerid"],
				"singermid"     =>  $value["singerMID"],
			);
		}

		return $songlist;
	}

	public function albuminfo($albummid){
		$albumlisturl = $this->qqmusicService["albumlist"];
		$albumlisturl = str_replace("{albummid}",$albummid,$albumlisturl);
		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$albumlisturl);

		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);
		$res =json_decode($res,true);
		$res =$res["data"];

		$albuminfo = array(
			"createon"  =>  $res["cDate"],
			"company"   =>  $res["company"],
			"desc"      =>  $res["desc"],
			"id"        =>  $res["id"],
			"lang"      =>  $res["lan"],
			"albummid"  =>  $res["mid"],
			"albumname" =>  $res["name"],
			"singerid"  =>  $res["singerid"],
			"singermid" =>  $res["singermid"],
			"singername"=>  $res["singername"],
			"total"     =>  $res["total"],
		);

		foreach($res["list"] as $key=>$value){
			$albuminfo["list"][] = array(
				"albumid"   =>  $value["albumid"],
				"albummid"  =>  $value["albummid"],
				"albumname" =>  $value["albumname"],
				"songid"    =>  $value["songid"],
				"songmid"   =>  $value["songmid"],
				"songname"  =>  $value["songname"],
				"srtmediamid"=> $value["strMediaMid"],
				"vid"       =>  $value["vid"],
				"url"       =>  $this->getsongurl($value["songmid"]),
			);
		}

		dump($albuminfo);
		return $albuminfo;
	}

	//create the pgv_pvid
	private function createpvid(){
		if(time()-$this->lasttime>=60*30){
			$this->pgv_pvid = getUTCMilliseconds();
			$this->lasttime = time();
		}
	}

	//create the vkey
	private function createkey(){

		$vkeyurl = $this->qqmusicService["vkey"];
		if(empty($this->pgv_pvid)){
			$this->createpvid();
		}

		$vkeyurl = str_replace("{guid}",$this->pgv_pvid,$vkeyurl);
		$res = get($vkeyurl);
		$startindex = strpos($res,"{");
		$endindex   = strpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);
		$res = json_decode($res,true);
		$this->vkey = $res["key"];
	}

	private function createguid($len=0){
		$len = empty($len) ? 32: $len;
		$guid = "";
		for($i=1;$i<=$len;$i++){
			$n = floor(rand(0,100)/100*16.0);
			$guid .= dechex($n);
		}
		return $guid;
	}

	//get the realurl of mv
	public function getmvurl($vid){
		$mvurl = $this->qqmusicService["mvurl"];
		$mvurl = str_replace("{vid}",$vid,$mvurl);

		$httprequest = new HttpRequest();
		$res = $httprequest->send(HttpMethod::GET,$mvurl);

		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);
		$res = json_decode($res,true);

		$urllist = array();
		$res= $res["vd"]["vi"];

		foreach($res as $key =>$value){
			array_push($urllist,$value["url"]);
		}

		return $urllist;
	}

	public function getsongurl($songmid){
		$realurl = $this->qqmusicService["stream"];
		$realurl = str_replace(array("{vkey}","{guid}","{songmid}"),array($this->vkey,$this->pgv_pvid,$songmid),$realurl);
		return $realurl;
	}

	public function getalbumpic($albummid,$type){
		$mid = $albummid;

		$albumpicurl = $this->qqmusicService["albumpic"];
		$picnormalurl   =   $albumpicurl["picnormal"];
		$pic300url      =   $albumpicurl["pic300"];
		$picmid         =   $albumpicurl["picmid"];
		$picrtn         =   $albumpicurl["picrtn"];

		$s1 = substr($mid,strlen($mid)-2,1);
		$s2 = substr($mid,strlen($mid)-1,1);
		$type = empty($type) ? 300 : $type;
		$picrtn = str_replace(array("{picsize}","{s1}","{s2}","{albummid}"),array($type,$s1,$s2,$mid),$picmid);

		return$picrtn;
	}

	public function getsingerpic($singermid,$type){
		$mid = $singermid;

		$albumpicurl = $this->qqmusicService["singerpic"];
		$picnormalurl   =   $albumpicurl["picnormal"];
		$pic300url      =   $albumpicurl["pic300"];
		$picmid         =   $albumpicurl["picmid"];
		$picrtn         =   $albumpicurl["picrtn"];

		$s1 = substr($mid,strlen($mid)-2,1);
		$s2 = substr($mid,strlen($mid)-1,1);
		$type = empty($type) ? 300 : $type;
		$picrtn = str_replace(array("{picsize}","{s1}","{s2}","{singermid}"),array($type,$s1,$s2,$mid),$picmid);

		return$picrtn;
	}

	public function getsongtable($uin="",$g_tk=""){
		$uin  = empty($uin) ? $this->qqmusicService["uin"]  : $uin;
		$g_tk = empty($g_tk)? $this->qqmusicService["g_tk"] : $g_tk;

		$cookie       = $this->qqmusicService["cookie"];
		$songtableurl = $this->qqmusicService["songtable"];

		$songtableurl = str_replace(array("{uin}","{g_tk}"),array($uin,$g_tk),$songtableurl);

		$res = get($songtableurl,$cookie);

		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);
		$res = iconv("gbk","utf-8",$res);
		$res = preg_replace_callback("/(\w+):/is",function ($match){return '"'.substr($match[0],0,-1).'":';},$res);
		$res = str_replace(array('""','http"',"'"),array('"','http','"'),$res);
		$res = str_replace(array('""','http"',"'"),array('"','http','"'),$res);

		$res = json_decode($res,true);
		return $res;
	}

	public function getsonglist($dirid,$from=0,$to=50){
		$uin  = $this->qqmusicService["uin"];
		$g_tk = $this->g_tk;

		$cookie       = $this->qqmusicService["cookie"];
		$songlisturl = $this->qqmusicService["songlist"];

		$songlisturl = str_replace(array("{uin}","{g_tk}","{from}","{to}","{dirid}"),array($uin,$g_tk,$from,$to,$dirid),$songlisturl);

		$res = get($songlisturl,$cookie);
		$startindex = strpos($res,"{");
		$endindex   = strrpos($res,"}");
		$res = substr($res,$startindex,$endindex-$startindex+1);

		$res = preg_replace_callback("/(\w+):/is",function ($match){return '"'.substr($match[0],0,-1).'":';},$res);
		$res = str_replace(array('""http"','http"',"'"),array('"http','http','"'),$res);

		$res = json_decode($res,true);

		$songlist = array(
				"uin"       => $res["nin"],
				"nickname"	=> $res["NickName"],
				"tag"       => $res["tagList"],
				"picurl"    => $res["PicUrl"],
				"desc"      => $res["Desc"],
				"title"     => $res["title"],
				"dirid"     => $res["DirID"],
				"createon"  => $res["createon"],
				"songcount" => $res["SongCount"],
				"totalcount"=> $res["TotalSongNum"],
				"songlist"  => array(),
		);

		foreach($res["SongList"] as $key=>$value){
			$songlist["songlist"][] = array(
					"type"      => $value["type"],
					"id"        => $value["id"],
					"mid"       => $value["mid"],
					"albumid"   => $value["data"]["albumid"],
					"albummid"  => $value["data"]["albummid"],
					"albumname" => $value["data"]["albumname"],
					"singerid"  => $value["data"]["singer"]["id"],
					"singermid" => $value["data"]["singer"]["mid"],
					"singername"=> $value["data"]["singer"]["name"],
					"size128"   => $value["data"]["size128"],
					"size320"   => $value["data"]["size320"],
					"sizeape"   => $value["data"]["sizeape"],
			);
		}
		return $res;
	}

	public function test($keyword,$pageindex,$pagesize){
		return $this->song($keyword,$pageindex,$pagesize);
	}

	//登录获取skey

	public function login($account,$password){

	}

	//生成g_tk
	private function createg_tk($skey=""){
		$skey = empty($skey) ? $this->qqmusicService["skey"] : $skey;
		return $this->_dbj($skey);
	}

	private function _dbj($str){
		$hash = 5381;
		$value = 0;

		for($i=0;$i<strlen($str);$i++){
			$value += $hash<<5 + charCodeAt($str,$i);
		}

		return $hash & 2147483647;
	}
}