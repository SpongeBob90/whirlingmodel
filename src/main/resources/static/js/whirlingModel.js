//页面加载后执行，若直接放在外面，则会应为页面还没加载完成而报错
$(function () {
    humanRotate();
});

function humanRotate() {
    var scene = null, camera = null, renderer = null, mesh = null;
    //渲染器
    renderer = new THREE.WebGLRenderer({
        //画布
        canvas: document.getElementById('model')
    });
    //画布颜色
    renderer.setClearColor("#ffffff")
    //场景创建
    scene = new THREE.Scene();
    //正交投影照相机
    camera = new THREE.OrthographicCamera(window.innerWidth / -8, window.innerWidth / 8, window.innerHeight / 6, window.innerHeight / -6, 1, 1000);
    //相机的位置
    camera.position.set(0, 80, 70);
    //lookAt()设置相机所看的位置
    camera.lookAt(new THREE.Vector3(0, 80, 0));
    //把相机添加到场景中
    scene.add(camera);
    //模型加载“进度条回调”
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log("loading percent:"+percentComplete+"%");
        }
    };
    //模型加载“加载出错回调”
    var onError = function (xhr) {
        console.error(xhr);
    };
    var loader = new THREE.OBJLoader();
    loader.load('../image/TheAmazingSpider-Man.obj', function (obj) {
        //第一个表示模型路径，第二个表示完成导入后的回调函数，一般我们需要在这个回调函数中将导入的模型添加到场景
        obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.side = THREE.DoubleSide;
            }
        });
        //将导入的模型添加到场景中
        scene.add(obj)
        //储存到全局变量中
        mesh = obj;
    }, onProgress, onError);
    //光源颜色
    var light = new THREE.DirectionalLight(0xffffff);
    //光源位置
    light.position.set(20, 10, 5);
    //光源添加到场景中
    scene.add(light);
    //每隔5秒重绘一次
    setInterval(draw, 5);
    //我们在重绘函数中让模型旋转
    function draw() {
        //调用WebGLRenderer的render函数刷新场景
        renderer.render(scene, camera);
        if (mesh) {
            //添加动画
            mesh.rotation.y += 0.01;
            if (mesh.rotation.y > Math.PI * 2) {
                mesh.rotation.y -= Math.PI * 2;
            }
        }
    }
}