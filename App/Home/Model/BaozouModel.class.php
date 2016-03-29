<?php
/**
 * Date:        2015/6/26
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:BaozouModel.class.php
 */

namespace Home\Model;
use Think\Model;

class BaozouModel extends \Lib\Model\AppModel{
    protected $trueTableName = "bz_article";

	public function __construct($a){
		$a = date("Y-m-d",strtotime($a));
		$this->trueTableName .=$a;
		//判断表是否存在，不存在则创建一张表
		$this->_check();
		parent::__construct();
	}

	private function _check(){
		$conn = mysql_connect(C("DB_HOST").":".C("DB_PORT"),C("DB_USER"),C("DB_PWD"));
		if($conn){
			mysql_select_db(C("DB_NAME"),$conn);
			$res=mysql_query("show tables;",$conn);
			$tables="";
			while($row = mysql_fetch_row($res)){
				$tables .=$row[0];
			}
			if(strpos($tables,$this->trueTableName)===false){
				$sql = sprintf("create table `%s` (
								`id` 			int(11) not null auto_increment primary key,
								`articleid` 	int(11) not null default 0 ,
								`seriesid` 		int(11) not null default 0 ,
								`title`			varchar(255) not null default '',
								`image`			varchar(255) not null default '',
								`height`		int(11) not null default 0,
								`width` 		int(11) not null default 0,
								`smallimage`	varchar(255) not null default '',
								`group`			varchar(255) not null default '',
								`createon`    	datetime ,
								`syncon`		datetime ,
								`userid`		int(11) not null default 0,
								`username`		varchar(255) not null default '',
								`useravatar`		varchar(255) not null default ''
								)engine=MyISAM default charset=utf8;",$this->trueTableName);
				$resul = mysql_query($sql,$conn);
				if(!$resul){
//					echo "database create failed!";exit;
					throw_exception("databases is not exists and create failed");
				}
			}
			mysql_free_result($conn);
		}
	}

    public function getArticles($pageindex,$pagesize){
        $start = ($pagesize-1)*$pagesize;
        return $this->Model->limit($start,$pagesize)->select();
    }
}