<?php
/**
 * Created by Tianwen.Sun.
 * Mail: suntw@miot.cn
 * Date: 2015/7/10 12:28
 * Description:allinone
 */

namespace Home\Model;
use Think\Model;

class SongModel extends \Lib\Model\AppModel{
	protected $trueTableName = "ttpod_song";

	public function getSongByName($name=""){
		$conditions =array("song_name"=>$name);
		$sql = "select * from ttpod_song where song_name regexp '[$name]{strlen($name)}'";
//		return $this->Model->where($conditions)->select();
		return $this->Model->query($sql);
	}

	public function getAll(){
		return $this->Model->select();
	}

	public function getSongByPage($name="",$index=1,$size=10){
		$start = ($index-1)*$size;

		$conditions=array();
		if(!empty($name)){
			$conditions["song_name"]=$name;
		}

//		return $this->Model->where($conditions)->limit($start,$size)->select();
		$sql = sprintf("select * from ttpod_song where song_name regexp '[%s]{%d}' limit %d,%d",$name,mb_strlen($name,"UTF-8"),$start,$size);
		return $this->Model->query($sql);
	}

	public function getCount(){
		return $this->Model->count();
	}
}