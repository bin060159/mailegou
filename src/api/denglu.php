<?php
// 引入connect.php
include 'common.php';
/*
		接口功能：用户注册
		所需参数：
            * username、
            *password
            *phone
	 */
$username = isset($_GET['username']) ? $_GET['username'] : null; 
$password = isset($_GET['password']) ? $_GET['password'] : null; 



// 查找数据库中是否存在同名用户
// $sql = "insert into zhuche(name,password,phone) values('$username','$password')";
    $sql="select * from zhuche where name='$username' and password='$password'";

// 执行sql语句
$result = $conn->query($sql);
if($result->num_rows>0){
    echo "ok";
}else{
    echo "fail";
}


?>