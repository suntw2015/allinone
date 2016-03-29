<?php
/**
 * Date:        2015/4/24
 * @author:     tianwen.Sun
 * @copyright   2015 daxidi All rights reserved.
 * @description:AppModel.class.php
 */

namespace Lib\Model;
use Think\Model;

class AppModel extends Model{
    protected $Model=null;

    public function __construct(){
        parent::__construct();
        if(!empty($this->trueTableName)){
            $this->Model=M($this->trueTableName);
        }
    }

    public function doAdd($data){
        return $this->Model->add($data);
    }

    public function doDelete($condition=array()){
        return $this->Model->where($condition)->delete();
    }

    public function doDeleteById($id){
        return $this->Model->delete($id);
    }
    public function doUpdate($where,$data){
        return $this->Model->where($where)->save($data);
    }

    public function updateById($id,$data){
        $conditions=array("id"=>$id);
        return $this->doUpdate($conditions,$data);
    }

	public function doAdds($data){
		foreach($data as $k=>$v){
			$this->doAdd($v);
		}
	}

	public function getByCondition($conditions){
		return $this->Model->where($conditions)->select();
	}
}