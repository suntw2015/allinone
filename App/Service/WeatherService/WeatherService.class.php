<?php

namespace Service\WeatherService;

Class WeatherService{
	
	protected $weatherService = array();

	public function __construct(){
		$this->weatherService = C("WEATHERSERVICE");
	}

	public function getProvenceList(){
		$provenceUrl = $this->weatherService['provence'];
		$res = get($provenceUrl);
		$res = substr($res, 3,-2);
		$res = json_decode($res,true);

		$newres =  array();
		foreach($res as $key=>$value){
			$newres[] = array(
				"pid"   => $value[1],
				"pname" => $value[0]
			);
		}
		return $newres;
	}

	public function getCityList($pid){
		$cityUrl =  $this->weatherService['city'];
		$cityUrl = str_replace("{code}",$pid,$cityUrl);
		$res = get($cityUrl);
		$res = substr($res, 3,-2);
		$res = json_decode($res,true);
		$newres = array();
		foreach($res as $key=>$value){
			$newres[] = array(
				"cid"	=> $value[1],
				"cname" => $value[0],
			);
		}

		return $newres;
	}

	public function getTownList($cid){
		$townUrl =  $this->weatherService['town'];
		$townUrl = str_replace("{code}",$cid,$townUrl);
		$res = get($townUrl);
		$res = substr($res, 3,-2);
		$res = json_decode($res,true);
		$newres = array();
		foreach($res as $key=>$value){
			$newres[] = array(
				"tid"	=> $value[1],
				"tname" => $value[0],
			);
		}

		return $newres;
	}

	public function getWeather($tid){
		$weatherUrl =  $this->weatherService['weather'];
		$weatherUrl = str_replace("{code}",$tid,$weatherUrl);
		$res = get($weatherUrl);
		$res = substr($res, 3,-2);
		$res = json_decode($res,true);

		return $res;
	}
}