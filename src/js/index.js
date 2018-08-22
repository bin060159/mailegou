jQuery(function($){

	// 天天特卖加载mysql数据
    var xhr = new XMLHttpRequest();//readyState=0

			xhr.onreadystatechange = function(){
				// console.log(xhr.readyState)
				if(xhr.readyState === 4){
					// 确认数据接收完毕
					// 在次获取数据：responseText
					var data = JSON.parse(xhr.responseText);
					// console.log(data);
				var tt= document.getElementsByClassName('tt')[0];
				var cont='';
				for(var i = 0;i<data.length;i++){
					cont+=`<li>
					<div><a href="#"><img src="../img/${data[i].img}"></a></div>
					<div class='d2'>
					<p>${data[i].title}</p> <span>剩余${data[i].time}</span>
					<p>${data[i].dazhe}</p>
					</div>
					</li>`
				}
				tt.innerHTML = cont;
				}
			}

			// 配置参数，建立与服务器连接
			xhr.open('get','../api/tian.php',true);//readyState=1

			// 发起请求
			xhr.send();//readyState=2
			


	// ---------------------------------------------------猜你喜欢加载json数据
	var xhr1 = new XMLHttpRequest();//readyState=0

	xhr1.onreadystatechange = function(){
		// console.log(xhr.readyState)
		if(xhr1.readyState === 4){
			// 确认数据接收完毕
			// 在次获取数据：responseText
			var data1 = JSON.parse(xhr1.responseText);
			var ylike = document.getElementsByClassName('ylike')[0];
			console.log(ylike)
			var cont1 = '';
			for(var i=0;i<data1.length;i++){
				cont1+=`
				<li><a href="#"><img src="../img/${data1[i].img}">
				<div>${data1[i].title}
                    <p>￥${data1[i].yuanjia}</p>
				</div>
				</a>
                </li>`
			}
			
			ylike.innerHTML = cont1;
		}
	}

	// 配置参数，建立与服务器连接
	xhr1.open('get','../api/youlike.json');//readyState=1

	// 发起请求
	xhr1.send();//readyState=2
            
})