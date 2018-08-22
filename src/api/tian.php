<?php
    // 引入connect.php
    include 'common.php';

    $sql = "select * from tiantianqiang";


     


    $result = mysqli_query($conn,$sql);
    if(!$result){
        printf("error:%s\n",mysqli_error($conn));
        exit();
    }

    $jarr = array();
    while($rows = mysqli_fetch_array($result,MYSQL_ASSOC)){
        $count = count($rows);
        for($i = 0;$i<$count;$i++){
            unset($rows[$i]);
        }
        array_push($jarr,$rows);
    }

    echo $str = json_encode($jarr,JSON_UNESCAPED_UNICODE);

?>