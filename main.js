let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let capture = document.getElementById("capture");
let retry = document.getElementById("reset");
let finish = document.getElementById("finish");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let global_blob;
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function (strem) {
        video.srcObject = strem;
        video.play();
    });

    capture.addEventListener('click', function () {
        video.style.display = "none";
        canvas.style.display = "block";
        capture.style.display = "none";
        finish.style.display = "inline-block"
        retry.style.display = "inline-block"
        const blob = takeASnap();
        global_blob = blob;
    })

    retry.addEventListener('click', function () {
        video.style.display = "block";
        canvas.style.display = "none";
        finish.style.display = "none";
        capture.style.display = "inline-block";
        retry.style.display = "none"
    })

    finish.addEventListener('click', function(){
        download(global_blob.then(download));
    })  
    
    function takeASnap() {
        var Context = canvas.getContext('2d');
        Context.drawImage(video, 0, 0, 640, 480);
        return new Promise((res, rej) => {
            canvas.toBlob(res, 'images/jpeg');
        });
    }

    function download(blob) {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'screenshot.jpg';
        document.body.appendChild(a);
        a.click();
    }
}