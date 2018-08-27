(function(){
   var cookies= Cookie.get('goodslist');
//    console.log(typeof(cookies))
    cookies=JSON.parse(cookies);
   var table = document.getElementById('table');
   var tbody1 = document.getElementById('tbody1');
   var cont = '';
    for(var i =0;i<cookies.length;i++){
        cont+=`
        <tr>
        <td><img src='../img/${cookies[i].img}' />${cookies[i].title}</td>
        <td>${cookies[i].jiage}</td>
        <td>${cookies[i].qty}</td>
        </tr>
        `
    }
tbody1.innerHTML=cont;
})();