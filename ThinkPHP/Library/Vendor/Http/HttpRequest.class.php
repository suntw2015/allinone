<?php
namespace Vendor\Http;
class HttpRequest extends  CurlRequest{
    public function __construct(){

    }

    public function send($HttpMethod,$url,$data=array(),$options=array())
    {
        $res=$this->_send($HttpMethod,$url,$data,$options);
        return $res['body'];
    }
}