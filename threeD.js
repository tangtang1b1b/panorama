const scene = new THREE.Scene();
const boxElement = document.getElementById('box');
const camera = new THREE.PerspectiveCamera( 75, boxElement.clientWidth / boxElement.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( boxElement.clientWidth, boxElement.clientHeight );

boxElement.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('img/17_2.jpg');


const sphereGeometry = new THREE.SphereGeometry( 500, 60, 40 );
sphereGeometry.scale(-1, 1, 1);
const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
let degreesToRotate = -90;
sphere.rotation.y = (degreesToRotate * Math.PI) / 180; //弧度 = (度數 * π) / 180，因為用弧度覺得旋轉
let touchX = 0;
let touchY = 0;

function handleTouchStart(event) {
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    const deltaX = event.touches[0].clientX - touchX;
    const deltaY = event.touches[0].clientY - touchY;
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
    sphere.rotation.y -= deltaX * 0.003;//乘以0.003因為弧度太大會導致旋轉過快
    sphere.rotation.x -= deltaY * 0.003;
    // 限制上下移動的範圍，避免翻轉過度
    sphere.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, sphere.rotation.x));
}

boxElement.addEventListener('touchstart', handleTouchStart, false);
boxElement.addEventListener('touchmove', handleTouchMove, false);


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
