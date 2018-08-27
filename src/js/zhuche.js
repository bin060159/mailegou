jQuery(function ($) {
    var zc = document.getElementById('zhuche');
    zc.onclick = function (e) {
        e = e || window.event;

        // 用户名
        let uname = document.getElementById('uname').value;
        if (!/^[a-z][\w\-]{5,19}$/.test(uname)) {
            // console.log(uname)
            alert('您输入的用户名不合法');

            // e.preventDefault();
            // return;
            return false;
        }


        // 手机号码
        let phone = document.getElementById('phone').value;
        if (!/^1[3-9]\d{9}$/.test(phone)) {
            alert('手机号不合法');
            return false;
        }

        // console.log(phone)
        // 密码
        let password = document.getElementById('password').value;
        if (!/^\S{6,20}$/.test(password)) {
            alert('密码为6-20个字符');
            return false;
        }
        // 再次确认密码
        var confirm_pwd = document.getElementById('confirm_pwd').value;
        if (confirm_pwd != password) {
            alert('两次输入密码不一致');
            return false;
        }

        // 验证码
        var shuruyz = document.getElementById('shuruyz').value;
        if (rNumber != shuruyz) {
            alert('验证码错误');
            return false;
        }

        var tongyi = document.getElementById('tongyi').checked;
        if (tongyi != true) {
            alert('请阅读交易条款');
            return false;
        }

        alert('wrfswaed')
        let xhr = new XMLHttpRequest();
        let status = [200, 304];
        xhr.onload = () => {
            if (status.indexOf(xhr.status) >= 0) {
                if (xhr.responseText == 'success') {
                    alert('注册成功')
                    // location.href = 'http://localhost:1000/mailegou/src/html/denglu.html';
                    location.href = '../html/denglu.html';
                }


            }
        }

        xhr.open('post', '../api/reg.php', true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`username=${uname}&password=${password}&phone = ${phone}`);




    }

    //   验证用户名是否存在
    var uname1 = document.getElementById('uname');
    var yhm = document.getElementById('yhm')
    let isok = false;
    uname1.onblur = function () {
        let uname = uname1.value;

        let xhr = new XMLHttpRequest();
        let status = [200, 304];
        xhr.onload = () => {
            if (status.indexOf(xhr.status) >= 0) {
                if (xhr.responseText == 'yes') {

                    alert('此用户名可用')
                }
                else if (xhr.responseText == 'no') {
                    // isok=false;
                    alert('此用户名已存在')
                }
            }
        }

        xhr.open('get', '../api/zhue.php?username=' + uname, )
        xhr.send();


    }











    var sjyzm = document.getElementById("sjyzm");

    rNumber = randomNumber(1, 10000);
    sjyzm.innerText = rNumber;
    console.log(password.value)


});