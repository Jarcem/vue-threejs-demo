import * as THREE from "./js/three.js";
import * as OrbitControls from "./js/controls/OrbitControls.js";
let scene;
let camera;
let container;
let renderer;
let controls;

console.warn(
  "THREE.WebGL: As part of the transition to ES6 Modules, the files in 'examples/js' were deprecated in May 2020 (r117) and will be deleted in December 2020 (r124). You can find more information about developing using ES6 Modules in https://threejs.org/docs/#manual/en/introduction/Installation."
);

THREE.WEBGL = {
  isWebGLAvailable: function() {
    try {
      var canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  },

  isWebGL2Available: function() {
    try {
      var canvas = document.createElement("canvas");
      return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
    } catch (e) {
      return false;
    }
  },

  getWebGLErrorMessage: function() {
    return this.getErrorMessage(1);
  },

  getWebGL2ErrorMessage: function() {
    return this.getErrorMessage(2);
  },

  getErrorMessage: function(version) {
    var names = {
      1: "WebGL",
      2: "WebGL 2",
    };

    var contexts = {
      1: window.WebGLRenderingContext,
      2: window.WebGL2RenderingContext,
    };

    var message =
      'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';

    var element = document.createElement("div");
    element.id = "webglmessage";
    element.style.fontFamily = "monospace";
    element.style.fontSize = "13px";
    element.style.fontWeight = "normal";
    element.style.textAlign = "center";
    element.style.background = "#fff";
    element.style.color = "#000";
    element.style.padding = "1.5em";
    element.style.width = "400px";
    element.style.margin = "5em auto 0";

    if (contexts[version]) {
      message = message.replace("$0", "graphics card");
    } else {
      message = message.replace("$0", "browser");
    }

    message = message.replace("$1", names[version]);

    element.innerHTML = message;

    return element;
  },
};

function detection() {
  if (THREE.WEBGL.isWebGL2Available() === false) {
    document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
  } else {
    console.log("current borwser support WebGL");
  }
}

function init(containerName = "container") {
  container = document.getElementById(containerName);
  scene = new THREE.Scene();

  let AxisHelper = new THREE.AxesHelper(10);
  scene.add(AxisHelper);

  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    1,
    100
  );
  camera.position.z = 50;
  camera.position.y = 15;
  camera.lookAt(0, 0, 0);

  let pointLight = new THREE.PointLight(0xffffff, 1, 150);
  pointLight.position.set(50, 50, 50);
  pointLight.castShadow = true;
  scene.add(pointLight);

  let geometry = new THREE.BoxGeometry(10, 10, 10);
  let material = new THREE.MeshLambertMaterial();
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  let lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(new THREE.Vector3(20, 0, 0));
  lineGeometry.vertices.push(new THREE.Vector3(0, 20, 0));
  lineGeometry.vertices.push(new THREE.Vector3(0, 0, 20));
  let line = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(line);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);
}

function render() {
  renderer.render(scene, camera);
}

function animation() {
  requestAnimationFrame(animation);
  scene.rotation.y += 0.005;
  renderer.render(scene, camera);
  controls.addEventListener("change", render);
}

export default {
  detection,
  init,
  render,
  animation,
  THREE,
};
