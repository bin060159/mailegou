document.addEventListener('DOMContentLoaded', function () {
    var denglubtn = document.getElementById('denglubtn');



    denglubtn.onclick = function () {
        let user = document.getElementsByClassName('user')[0].value;
        let psw = document.getElementById('psw').value;
        console.log(psw)

        let xhr = new XMLHttpRequest();
        let status = [200, 304];
        xhr.onload = () => {
            if (status.indexOf(xhr.status) >= 0) {
                if (xhr.responseText == 'ok') {
                    // location.href = 'http://localhost:1000/mailegou/src/html/index.html';
                    location.href = '../html/index.html';

                } else {
                    alert('登录名或密码错误')
                }
            }
        }

        xhr.open('get', '../api/denglu.php?username=' + user + '&password=' + psw)
        xhr.send();


    }
})