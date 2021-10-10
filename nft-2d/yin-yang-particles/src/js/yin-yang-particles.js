
if (!Detector.webgl) Detector.addGetWebGLMessage();
var renderer, scene, camera, stats;
var sphere;
var noise = [];
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var amount = 100000;
var radius = 200;

var radiusBig, radiusSmall;
var radiusBig2, radiusSmall2;

var linkDownloadImage;
var settings = {
    static: false,
    // static = true
    angle: 0,
    
    // static = false
    clockwise: true,
    speed: 0.01
};

function isInCircle(x, y) {
    return Math.pow(x, 2) + Math.pow(y, 2) <= radiusBig2;
}

function updateSettings(options) {
    if (options) {
        if (options.static !== undefined)
            settings.static = options.static;
        if (options.angle !== undefined)
            settings.angle = options.angle;

        if (options.clockwise !== undefined)
            settings.clockwise = options.clockwise;
        if (options.speed !== undefined)
            settings.speed = options.speed;
    }
}

function init(options) {
    updateSettings(options);

    if (WIDTH > HEIGHT)
        radiusBig = HEIGHT / 2;
    else
        radiusBig = WIDTH / 2;

    // test
    //var countInside = 0, countOutside = 0;

    camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 1, 10000);
    camera.position.z = 600;

    //var tmp = new THREE.Vector3(radiusBig, 0, 0);
    ////console.log(tmp);
    //var world = tmp.unproject(camera);
    ////console.log(world);

    //radiusBig = world.x;
    radiusBig = radius;
    radiusSmall = radiusBig / 2;
    radiusBig2 = Math.pow(radiusBig, 2);
    radiusSmall2 = Math.pow(radiusSmall, 2);

    scene = new THREE.Scene();
    var positions = new Float32Array(amount * 3);
    var colors = new Float32Array(amount * 3);
    var sizes = new Float32Array(amount);
    var vertex = new THREE.Vector3();
    var color = new THREE.Color(0xffffff);
    for (var i = 0; i < amount; i++) {
        vertex.x = (Math.random() * 2 - 1) * radius;
        vertex.y = (Math.random() * 2 - 1) * radius;
        vertex.z = (Math.random() * 2 - 1) * radius;

        //vertex.x = random(-radiusBig, radiusBig);
        //vertex.y = random(-radiusBig, radiusBig);
        //vertex.z = random(-radiusBig, radiusBig);

        vertex.toArray(positions, i * 3);
        
        var x = vertex.x;
        var y = vertex.y;

        var x2 = Math.pow(x, 2);
        var y2 = Math.pow(y, 2);
        //inCircle = sphMain.containsPoint(vertex);

        if (x2 + y2 <= radiusBig2) { // 在大圆内才属于八卦的一部分
            //countInside++;
            var yang = false;
            if (x > 0 && y > 0) { // 一象限: yang
                yang = true;
            }
            else if (x < 0 && y < 0) { // 三象限: yin
            }
            else if (x < 0 && y > 0) { // 二象限
                if (x2 + Math.pow(y - radiusSmall, 2) < radiusSmall2) { // yang
                    yang = true;
                }
                //else { // yin
                //}
            }
            else { // 四象限
                if (x2 + Math.pow(y + radiusSmall, 2) < radiusSmall2) { // yin
                }
                else { // yang
                    yang = true;
                }
            }

            if (yang) {
                color.setHSL(0.5 + 0.1 * (i / amount), 0.7, 0.5);
            } else {
                color.setHSL(0.0 + 0.1 * (i / amount), 0.9, 0.5);
            }
        }
        else { // 八卦圆外
            //countOutside++;
            color.setHSL(0.13, 0.13, 0.13);
        }
        
        color.toArray(colors, i * 3);
        sizes[i] = 10;
    }
    //console.log("In: " + countInside + "Out: " + countOutside);

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
    //
    var material = new THREE.ShaderMaterial({
        uniforms: {
            amplitude: { value: 1.0 },
            color: { value: new THREE.Color(0xffffff) },
            texture: { value: new THREE.TextureLoader().load("./assets/textures/sprites/spark1.png") }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });
    //
    sphere = new THREE.Points(geometry, material);
    scene.add(sphere);
    //
    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    //stats = new Stats();
    //container.appendChild(stats.dom);
    //
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    //stats.update();
}

function render() {
    var time = Date.now() * 0.005;
    if (settings.static) { // static
        sphere.rotation.z = -1 * settings.angle * Math.PI / 180;
    }
    else { // spining
        let z = settings.speed * time;
        if (settings.clockwise) // clockwise
            sphere.rotation.z = -1 * z;
        else // anticlockwise
            sphere.rotation.z = z;
    }

    var geometry = sphere.geometry;
    var attributes = geometry.attributes;
    for (var i = 0; i < attributes.size.array.length; i++) {
        attributes.size.array[i] = 14 + 13 * Math.sin(0.1 * i + time);
    }
    attributes.size.needsUpdate = true;
    renderer.render(scene, camera);
}

///////////// update

function increaseAngle(delta = 1){
    settings.angle = settings.angle + delta;
    Metro.toast.create("Angle increased to: " + settings.angle, null, 700);
}

function decreaseAngle(delta = 1){
    settings.angle = settings.angle - delta;
    Metro.toast.create("Angle decreased to: " + settings.angle, null, 700);
}

function exportPng(){
    let filename = settings.angle + ".png";

    // let eleContainer = document.getElementById("container");
    // let eleCanvas = eleContainer.children[0];

    try {
        let imgData = renderer.domElement.toDataURL();      
        
        let link = document.createElement('a');
        link.setAttribute('href', imgData);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', filename);
        link.click();
        document.removeChild(link);
    } 
    catch(e) {
        console.log("Browser does not support taking screenshot of 3d context");
        return;
    }
}