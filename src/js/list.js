jQuery(function($){
	let ul = document.getElementById('goods');


	var xhr = new XMLHttpRequest();//readyState=0

	xhr.onreadystatechange = function () {
		// console.log(xhr.readyState)
		if (xhr.readyState === 4) {
			// 确认数据接收完毕
			// 在次获取数据：responseText
			let data = JSON.parse(xhr.responseText);
			// console.log(data)
			let cont = '';
			for (let i = 0; i < data.length; i++) {
				cont += `
					<li data-guid="${data[i].id}">
					<a href="javascript:;" class="lia"><img src="../img/${data[i].img}"></a>
					<p class="jg"><span>${data[i].jiage}</span><del>价格${data[i].yuanjia}</del></p>
					<p>${data[i].title}<p/>	
					<div>
					<a href="javascript:;" class='btn'>加入购物车</a>
				
					</div>
					</li>
				`
			}
			// console.log(ul)
			ul.innerHTML = cont;

			let ul1 = document



			var li = document.querySelectorAll('#goods li .lia');
			for(var i=0;i<li.length;i++){
				li[i].idx = i;
				li[i].onclick = function(){
					// 通过索引值获取商品信息
					var good = data[this.idx];
	
					// Object->String（id=001&name=ip7&price=...）
					var params = '';
					for(var key in good){
						params += key + '=' + good[key] + '&'
					}
	
					// 去除多余的&
					params = params.slice(0,-1);
	
					// 修改href属性
					// this.href = '06goods.html?'+params 
					
					location.href = 'xiangqingye.html?' + params;
	
					console.log(params);
				}
			}

			// 写入cookie
			 $('goods li').click(function(){
				var index = $("ul li").index(this);
				alert(index);
			
			 })

		}
	}

	// 配置参数，建立与服务器连接
	xhr.open('get', '../api/goods.json');//readyState=1

	// 发起请求
	xhr.send();//readyState=2

})