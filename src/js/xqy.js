jQuery(function($){
    var params = decodeURI(location.search);
        params = params.slice(1).split("&");
        
        var shangpin = {};
           // 遍历params数组，拆分成二维数组
    params.forEach(function(item){
        var arr = item.split('=');
        // 商品信息写入数组
        shangpin[arr[0]] = decodeURI(arr[1]);
    });

   
    var bigimg = document.getElementsByClassName('bigimg')[0];
    var img = document.createElement("img");
    img.src = `../img/${shangpin.img}`;
    bigimg.append(img);
       
});