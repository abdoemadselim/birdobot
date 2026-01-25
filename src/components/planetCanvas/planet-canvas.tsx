'use client'

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

const createPlanet = () => {
    const sphereGeometry = new THREE.SphereGeometry(6, 30, 30)
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load("/textures/earth.webp")
    texture.colorSpace = THREE.SRGBColorSpace

    const sphereMat = new THREE.MeshStandardMaterial({
        map: texture
    })

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMat)

    return sphereMesh
}

export default function PlanetCanvas() {
    const canvas = useRef(null)

    useEffect(() => {
        // scene
        const scene = new THREE.Scene()
        const earth = createPlanet()
        scene.add(earth)

        const sizes = {
            width: window.innerWidth / 2,
            height: window.innerHeight / 2
        }

        if (window.innerWidth < 700) {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight / 2
        }

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
        directionalLight.position.set(2, 5, 0)
        scene.add(directionalLight)

        // Camera
        const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height, 0.1, 1000)
        camera.position.z = 11

        scene.add(camera)

        // Orbit
        const controls = new OrbitControls(camera, canvas.current)
        controls.enableDamping = true
        controls.enableZoom = false

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas.current!,
            alpha: true
        })

        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        animate()

        renderer.setSize(sizes.width, sizes.height)

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth / 2
            sizes.height = window.innerHeight / 2

            if (window.innerWidth < 700) {
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight / 2
            }

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
    }, [])

    return (
        <canvas ref={canvas} />
    )
}
