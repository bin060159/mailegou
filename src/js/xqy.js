jQuery(function($){
    var params = decodeURI(location.search);
        params = params.slice(1).split("&");
        
        let shangpin = {};
           // 遍历params数组，拆分成二维数组
    params.forEach(function(item){
        var arr = item.split('=');
        // 商品信息写入数组
        shangpin[arr[0]] = decodeURI(arr[1]);
    });

    let arr=[];
    var bigimg = document.getElementsByClassName('bigimg')[0];
    var img = document.createElement("img");
    img.src = `../img/${shangpin.img}`;
    bigimg.append(img);
    var by
 let xqbtn = document.getElementsByClassName('xqbtn')[0];
 xqbtn.onclick=function(){
    by= document.getElementsByClassName('by')[0].value;
  
    var shangp = {
        id:shangpin.id,
        title:shangpin.title,
        img:shangpin.img,
        jiage:shangpin.jiage,
        qty:by
    };
    // arr.push(shangp);
    // console.log(Cookie)
    // Cookie.set('arr',JSON.stringify(arr),{path:'/'});
    // location.href="car.html"
    // $.cookie('arr', cookieStr, { expires: 30, path: '/mailegou/' });
    addCkie(shangp)
    location.href="car.html"
 }
   
 // 用户没登录商品信息存cookie
function addCkie(_goods){
    var goodslist = Cookie.get('goodslist');
    var id = _goods.id;
    if(goodslist.length > 0){
        goodslist = JSON.parse(goodslist)

        console.log(goodslist)
    }else{
        goodslist = []
    }

    var has = goodslist.some(function(_goods){
    var res = _goods.id === id;
    if(res){
        _goods.qty++
    }

    return res;

    });

    if(!has){
        var goods = {
         id:_goods.id,
        title:_goods.title,
        img:_goods.img,
        jiage:_goods.jiage,
        qty:by
        }

        goodslist.push(goods);
    }

    // 把商品信息写入cookie
    Cookie.set('goodslist',JSON.stringify(goodslist),{path:'/'});
    // document.cookie = 'goodslist=' + JSON.stringify(goodslist);
}

});