<?php
	/**
	 * Created by Tianwen Sun.
	 * Date: 2015/9/8
	 * Time: 15:20
	 * Project: allinone
	 */

namespace Api\Model;
use THink\Model;

class ChampionModel extends \Lib\Model\AppModel{
	protected $trueTableName = "lol_champion";

	public function getChampionByKey($key){
		$conditions = array("key"=>$key);

		return $this->Model->where($conditions)->find();
	}
}