<?php
	/**
	 * Created by Tianwen Sun.
	 * Date: 2015/9/8
	 * Time: 14:24
	 * Project: allinone
	 */

namespace Service\LOLService;
use Org\Net\Http;
use Vendor\Http\HttpMethod;
use Vendor\Http\HttpRequest;

class LOLService{

	protected $lolservice = "";

	public function __construct(){
		$this->lolservice = C("LOLSERVICE");
	}

	public function champion(){
		$championurl =  $this->lolservice["champions"];

		$httpRequest = new HttpRequest();
		$res = $httpRequest->send(HttpMethod::GET,$championurl);
		$res = substr($res,strpos($res,"champion")+strlen("champion")+1,-1);
		$res = json_decode($res,true);

		$champions = array();
		foreach($res["data"] as $key=>$value){
			$tags = "";
			foreach($value["tags"] as $k=>$v){
				$tags = sprintf("%s%s,",$tags,$v);
			}
			$champions[] = array(
				"key"   =>  $value["key"],
				"engname" =>  $value["id"],
				"name"  =>  $value["name"],
				"title" =>  $value["title"],
				"tags"  =>  substr($tags,0,-1),
				"imagefull" =>  $value["image"]["full"],
				"imagesprite"   =>  $value["image"]["sprite"],
				"imagegroup"    =>  $value["image"]["group"],
				"x"             =>  $value["image"]["x"],
				"y"             =>  $value["image"]["y"],
				"w"             =>  $value["image"]["w"],
				"h"             =>  $value["image"]["h"],
			);
		}

		return $champions;
	}

	public function item(){
		$split = "LOLitemjs=";
		$itemurl = $this->lolservice["items"];

		$httpRequest = new HttpRequest();
		$res = $httpRequest->send(HttpMethod::GET,$itemurl);
		$res = substr($res,strpos($res,$split)+strlen($split),-1);
		$res = json_decode($res,true);

		$items = array();
		foreach($res["data"] as $key=>$value){
			$pinyins = explode(";",$value["colloq"]);
			$ttags   =
			$items[] = array(
				"key"           =>  $key,
				"name"          =>  $value["name"],
				"group"         =>  $value["group"],
				"description"   =>  $value["description"],
				"pinyin"        =>  $pinyins[1],
				"suopinyin"     =>  $pinyins[2],
				"msg"           =>  $value["plaintext"],
				"into"          =>  ArrayToString($value["into"]),
				"imagefull"     =>  $value["image"]["full"],
				"imagesprite"   =>  $value["image"]["sprite"],
				"imagegroup"    =>  $value["image"]["group"],
				"x"             =>  $value["image"]["x"],
				"y"             =>  $value["imgae"]["y"],
				"w"             =>  $value["imgae"]["w"],
				"h"             =>  $value["imgae"]["h"],
				"baseprice"     =>  $value["gold"]["base"],
				"canbuy"        =>  $value["gold"]["purchasable"],
				"totalprice"    =>  $value["gold"]["total"],
				"sellprice"     =>  $value["gold"]["sell"],
				"tags"          =>  ArrayToString($value["tags"]),
				"status"        =>  ArrayToString($value["stats"],1),
			);
		}
		return $items;
	}

	public function skin(){
		$split = "skins=";
		$itemurl = $this->lolservice["skins"];

		$httpRequest = new HttpRequest();
		$res = $httpRequest->send(HttpMethod::GET,$itemurl);
		$res = substr($res,strpos($res,$split)+strlen($split),-1);
		$res = json_decode($res,true);
		$skins = array();
		$champions = array();
		foreach($res["keys"] as $key => $value){
			$champions[$value] = $key;
		}

		foreach($res["data"] as $key => $value){
			foreach($value as $k => $v){
				$v["championkey"] = $champions[$key];
				$v["championengname"]  = $key;
				$skins[] = array(
					"skinid"            => $v["id"],
					"championkey"       => $champions[$key],
					"championengname"   => $key,
					"skinname"          => $v["name"],
					"skinindex"         => $v["num"],
					"chromas"           => $v["chromas"],
				);
			}
		}
		return $skins;
	}
}