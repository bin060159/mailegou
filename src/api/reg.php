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
$username = isset($_POST['username']) ? $_POST['username'] : null; 
$password = isset($_POST['password']) ? $_POST['password'] : null; 
$phone = isset($_POST['phone']) ? $_POST['phone'] : null; 


// 查找数据库中是否存在同名用户
$sql = "insert into zhuche(name,password,phone) values('$username','$password','$phone')";

// 执行sql语句
$result = $conn->query($sql);


if($result){
    echo "success";
}else{
    echo "fail";
}

?>