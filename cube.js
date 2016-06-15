let scene,
	camera,
	renderer,
	cube

const init = () => {
	scene = new THREE.Scene()
	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 20000)
	camera.position.set(0,0,50)
	scene.add(camera)

	let cubeShape = new THREE.boxGeometry(25,25,25)
	let cubeMaterial = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5})

	for(let i = 0; i < cubeShape.faces.length; i += 2) {
		let hex = Math.random() * 0xffffff
		cubeShape.faces[i].color.setHex(hex)
		cubeShape.faces[i+1].color.setHex(hex)
	}

	cube = new THREE.Mesh(cubeShape, cubeMaterial)
	scene.add(cube)

	directionalLight = THREE.directionalLight(0xffffff)
	directionalLight.position.set(0,3,3).normalize()
	scene.add(directionalLight)

	window.addEventListener('resize', () => {
		let newWidth = window.innerWidth
		let newHeight = window.innerHeight
		renderer.setSize(newWidth,newHeight)
		camera.aspect = newWidth/newHeight
		camera.updateProjectionMatrix()
	})
}

const animate = () => {
	requestAnimationFrame(animate)
	cube.rotation.x += 0.02
	cube.rotation.y += 0.02
	renderer.render(scene,camera)
}
