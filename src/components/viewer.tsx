"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useSearchParams } from 'next/navigation'

export const Viewer = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const imageName = searchParams.get("fileName");
    
    useEffect(() => {
        if (!mountRef.current) {
            return;
        }

        const params = {
            autoRotate: true,
            metalness: 1.0,
            roughness: 0.0,
            exposure: 1.0,
            resolution: '2k',
            type: 'HalfFloatType'
        };

        let renderer: THREE.WebGLRenderer;
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let controls: OrbitControls;
        let torusMesh: THREE.Mesh;
        let loader: THREE.TextureLoader;
        let gui: GUI;
        let animationFrameId: number;

        const init = () => {
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            mountRef.current?.appendChild(renderer.domElement);

            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = params.exposure;
            renderer.setAnimationLoop(render);

            scene = new THREE.Scene();

            torusMesh = new THREE.Mesh(
                new THREE.TorusKnotGeometry(1, 0.4, 128, 128, 1, 3),
                new THREE.MeshStandardMaterial({ roughness: params.roughness, metalness: params.metalness })
            );
            scene.add(torusMesh);

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
            camera.position.set(0.0, 0.0, -6.0);
            controls = new OrbitControls(camera, renderer.domElement);

            loader = new THREE.TextureLoader();
            loadEnvironment(params.resolution, params.type);

            gui = new GUI();
            gui.add(params, 'autoRotate');
            gui.add(params, 'metalness', 0, 1, 0.01);
            gui.add(params, 'roughness', 0, 1, 0.01);
            gui.add(params, 'exposure', 0, 4, 0.01);
            gui.add(params, 'resolution', ['2k', '4k']).onChange((value) => loadEnvironment(value, params.type));
            gui.add(params, 'type', ['HalfFloatType', 'FloatType']).onChange((value) => loadEnvironment(params.resolution, value));
            gui.open();

            window.addEventListener('resize', onWindowResize);
        };
    
        if (!imageName) {
            return;
        }
        
        const loadEnvironment = (resolution: string, type: string) => {
            loader.load(`/uploads/${imageName}`, (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                texture.needsUpdate = true;
                scene.background = texture;
                scene.environment = texture;
                console.log(`Successfully loaded texture: ${texture}`);
            });
        };

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const render = () => {
            if (torusMesh) {
                (torusMesh.material as THREE.MeshStandardMaterial).roughness = params.roughness;
                (torusMesh.material as THREE.MeshStandardMaterial).metalness = params.metalness;

                if (params.autoRotate) {
                    torusMesh.rotation.y += 0.005;
                }
            }

            renderer.toneMappingExposure = params.exposure;
            controls.update();
            renderer.render(scene, camera);
        };

        init();
        
        return () => {
            window.removeEventListener('resize', onWindowResize);
            renderer.setAnimationLoop(null);
            gui.destroy();
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };

    }, []);

    return (
        <div ref={mountRef} className="viewer-container" />
    );
};