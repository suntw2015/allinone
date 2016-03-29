<?php
	/**
	 * Created by Tianwen Sun.
	 * Date: 2015/9/8
	 * Time: 15:18
	 * Project: allinone
	 */

namespace Api\Controller;
use Think\Controller;

class LolController extends \Lib\Controller\BaseController{
	public function asyncchampion(){

		$lolService = new \Service\LOLService\LOLService();
		$res = $lolService->champion();

		$championModel = new \Api\Model\ChampionModel();
		$championModel->doAdds($res);
	}

	public function asyncitem(){
		$lolService = new \Service\LOLService\LOLService();
		$res = $lolService->item();

		$championModel = new \Api\Model\ItemModel();
		$championModel->doAdds($res);
	}

	public function asyncskin(){
		$lolService = new \Service\LOLService\LOLService();
		$res = $lolService->skin();

		$skinModel = new \Api\Model\SkinModel();
		$championModel = new \Api\Model\ChampionModel();
		foreach($res as $key => $value){
			$championinfo = $championModel->getChampionByKey($value["championkey"]);
			$res[$key]["championname"] = $championinfo["name"];
			if($value["skinname"] == "default"){
				$res[$key]["skinname"] = $championinfo["name"];
			}
		}
		$skinModel->doAdds($res);
	}
}