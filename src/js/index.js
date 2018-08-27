jQuery(function ($) {

	// 天天特卖加载mysql数据
	var xhr = new XMLHttpRequest();//readyState=0

	xhr.onreadystatechange = function () {
		// console.log(xhr.readyState)
		if (xhr.readyState === 4) {
			// 确认数据接收完毕
			// 在次获取数据：responseText
			var data = JSON.parse(xhr.responseText);
			// console.log(data);
			var tt = document.getElementsByClassName('tt')[0];
			var cont = '';
			for (var i = 0; i < data.length; i++) {
				cont += `<li>
					<div><a href="#"><img src="../img/${data[i].img}"></a></div>
					<div class='d2'>
					<p>${data[i].title}</p> 剩余<span>${data[i].time}</span>
					<p>${data[i].dazhe}</p>
					</div>
					</li>`

			}
			tt.innerHTML = cont;

			// 天天特卖图片动画。因为图片是生成的所以下周ajax里面。写在外面获取不到元素
			var liw = $('.tt li');
			liw = liw.get();
			var liimg = $('.tt li div img');
			liimg = liimg.get();
			for (let i = 0; i < liw.length; i++) {
				liw[i].onmouseover = function () {
					// liimg[i].style.width='315px';
					// liimg[i].style.height='250px';
					animate(liimg[i], { width: 300, height: 248 });
				}

				liw[i].onmouseout = function () {
					// liimg[i].style.width='315px';
					// liimg[i].style.height='250px';
					animate(liimg[i], { width: 290, height: 230 });
				}

			}
			// liw.on('mouseenter',function(){
			// 	liw.each(function(idx,item){
			// 		liimg.eq(idx).animate({width:315,
			// 			height:250},
			// 			1000)
			// 	})
			//  })

		}
	}

	// 配置参数，建立与服务器连接
	xhr.open('get', '../api/tian.php', true);//readyState=1

	// 发起请求
	xhr.send();//readyState=2



	// ---------------------------------------------------猜你喜欢加载json数据
	var xhr1 = new XMLHttpRequest();//readyState=0

	xhr1.onreadystatechange = function () {
		// console.log(xhr.readyState)
		if (xhr1.readyState === 4) {
			// 确认数据接收完毕
			// 在次获取数据：responseText
			var data1 = JSON.parse(xhr1.responseText);
			var ylike = document.getElementsByClassName('ylike')[0];

			var cont1 = '';
			for (var i = 0; i < data1.length; i++) {
				cont1 += `
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
	xhr1.open('get', '../api/youlike.json');//readyState=1

	// 发起请求
	xhr1.send();//readyState=2




	// 、。。。。。。。。。。。。。。。。。。。。。。。。。。轮播图
	var Carousel = function (options) {
		// 属性
		// 默认值
		let defaults = {
			ele: '',//必填参数
			imgs: [],//必传参数
			width: 810,
			height: 320,
			index: 0,
			page: true,//是否显示分页
			button: true,//是否显示左右按钮
			type: 'vertical',//动画类型：vertical(垂直)，horizontal(水平),fade(淡入淡出)
			seamless: true,//是否无缝滚动,
			duration: 3000, //轮播间隔时间
		}

		// 扩展默认参数
		this.opt = Object.assign({}, defaults, options);
		this.len = this.opt.imgs.length;

		// 初始化并传递参数
		this.init();
	}


	// 方法：
	Carousel.prototype.init = function () {
		var opt = this.opt;
		/*
			* 获取/生成元素
			* 绑定事件
		 */

		var ele = document.querySelector(opt.ele);

		// 指定专有类型
		ele.classList.add('lx-carousel');

		// 设置样式（宽高）
		ele.style.width = opt.width + 'px';
		ele.style.height = opt.height + 'px';

		// 生成图片(ul,li,img)
		let ul = document.createElement('ul');

		// 给ul添加类型：设置轮播类型
		ul.className = opt.type;//horizontal,vertical,fade

		// 水平轮播需要给ul添加宽度
		if (opt.type === 'horizontal') {
			ul.style.width = opt.width * this.len + 'px';
		} else if (opt.type === 'fade') {
			ul.style.width = opt.width + 'px';
			ul.style.height = opt.height + 'px';
		}

		ul.innerHTML = opt.imgs.map(url => {
			return '<li><img src="' + url + '"/></li>';
		}).join('');

		// 写入页面
		ele.appendChild(ul);


		// 分页
		if (opt.page) {
			this.page = document.createElement('div');
			this.page.className = 'page';
			for (var i = 0; i < this.len; i++) {
				var span = document.createElement('span');
				span.innerText = i + 1;

				// 高亮
				if (i === opt.index) {
					span.className = 'active';
				}
				this.page.appendChild(span);
			}

			ele.appendChild(this.page);


		}

		// 左右按钮
		if (opt.button) {
			let btnPrev = document.createElement('span');
			btnPrev.className = 'btn-prev';
			btnPrev.innerHTML = '&lt;';

			let btnNext = document.createElement('span');
			btnNext.className = 'btn-next';
			btnNext.innerHTML = '&gt;';

			ele.appendChild(btnPrev);
			ele.appendChild(btnNext);
		}

		// 传递参数
		this.ul = ul;
		this.ele = ele;



		// 初始化
		// 页面进入自动轮播
		this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
		this.play();


		// 鼠标移入移出
		ele.onmouseover = () => {
			this.stop();
		}
		ele.onmouseout = () => {
			this.timer = setInterval(this.autoPlay.bind(this), opt.duration);
		}

		// 点击分页切换
		ele.onclick = e => {
			if (e.target.parentNode.className === 'page') {
				opt.index = e.target.innerText - 1;

				this.play();
			} else if (e.target.className === 'btn-prev') {
				opt.index--;
				this.play();
			} else if (e.target.className === 'btn-next') {
				opt.index++;
				this.play();
			}
		}


	}

	Carousel.prototype.autoPlay = function () {
		this.opt.index++;
		this.play();
	}

	// 播放
	Carousel.prototype.play = function () {
		let opt = this.opt;

		// 到达最后一张后重置到第一张
		if (opt.index >= this.len) {
			opt.index = 0;
		} else if (opt.index < 0) {
			opt.index = this.len - 1;
		}

		// var type = {vartical:'top',horizontal:'left',fade:'opacity'}

		var obj = {}

		// 水平
		if (opt.type === 'horizontal') {
			obj.left = -opt.index * opt.width;
			animate(this.ul, obj);
		} else if (opt.type === 'vertical') {
			obj.top = -opt.index * opt.height;
			animate(this.ul, obj);
		} else if (opt.type === 'fade') {
			for (var i = 0; i < this.len; i++) {
				animate(this.ul.children[i], { opacity: 0 });
			}
			animate(this.ul.children[opt.index], { opacity: 1 });

		}



		// 页码高亮
		if (this.page) {
			for (var i = 0; i < this.len; i++) {
				this.page.children[i].className = '';
			}
			this.page.children[opt.index].className = 'active';
		}
	}

	// 停止
	Carousel.prototype.stop = function () {
		clearInterval(this.timer);
	}

	new Carousel({
		ele: '.lunbo',
		width: 810,
		height: 480,
		index: 4,
		page: false,
		button: false,
		duration: 2000,
		type: 'fade',
		imgs: ["../img/banner_1.jpg", "../img/banner_2.jpg", "../img/banner_3.jpg", "../img/banner_4.jpg"]
	});

	new Carousel({
		ele: '.pinpai_lunbo',
		width: 177,
		height: 200,
		type: 'horizontal',
		duration: 2000,
		imgs: ["../img/lb-p1.png", "../img/lb-p2.png", "../img/lb-p3.png", "../img/lb-p4.png"]
	});

	new Carousel({
		ele: '.pinpai_lunbo1',
		width: 177,
		height: 200,
		type: 'horizontal',
		duration: 2000,
		imgs: ["../img/lb-p1.png", "../img/lb-p2.png", "../img/lb-p3.png", "../img/lb-p4.png"]
	});

	new Carousel({
		ele: '.pinpai_lunbo2',
		width: 177,
		height: 200,
		duration: 3000,
		type: 'horizontal',
		imgs: ["../img/lb-p1.png", "../img/lb-p2.png", "../img/lb-p3.png", "../img/lb-p4.png"]
	});



	$('.header-x').click(function () {
		$('.header-guanggao').hide();
	});

	// 导航栏	鼠标触碰右移效果
	$('.mlnav li').each(function (idx, item) {
		$(item).mouseover(function () {
			$(this).attr('id', 'ml');

		});
		$(item).mouseout(function () {
			$(this).attr('id', '');
		})
	})

	// 天天特卖动画


})