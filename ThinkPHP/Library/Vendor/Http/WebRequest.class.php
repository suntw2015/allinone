<?php
namespace Vendor\Http;
class WebRequest extends  CurlRequest{
    public function __construct(){

    }

    public function send($HttpMethod,$url,$data=array(),$options=array(),$cookiefile=null)
    {
        $res=$this->_send($HttpMethod,$url,$data,$options,$cookiefile);
        $body=$res['body'];
        $res['body']=$body;
        return $res;
    }
}