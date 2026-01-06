// pages/Home.jsx
import * as THREE from "three";
import { useDarkMode } from "../components/DarkModeContext";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
	Andy,
	Laptop,
	Overlay,
	PerspectiveCam,
	Lighting,
	LabRoom,
	LabScreens,
} from "../components";
import { Context } from "../components/Context";

function CameraController({ focusTarget }) {
	const { camera } = useThree();

	useFrame(() => {
		if (!focusTarget) return;

		const targets = {
			default: { pos: [0, 2, 20], look: [0, -5, 0] },
			laptop: { pos: [0, -8, 9], look: [0, -9, 6.5] },
			projects: { pos: [-18, -6, 10], look: [-28, -9, 2] },
			about: { pos: [18, -6, 10], look: [28, -9, 2] },
		};

		const t = targets[focusTarget] || targets.default;

		camera.position.x += (t.pos[0] - camera.position.x) * 0.06;
		camera.position.y += (t.pos[1] - camera.position.y) * 0.06;
		camera.position.z += (t.pos[2] - camera.position.z) * 0.06;

		camera.lookAt(t.look[0], t.look[1], t.look[2]);
	});

	return null;
}

export default function Home() {
	const { isDarkMode } = useDarkMode();
	const shakeRef = useRef();
	const contextValue = useMemo(() => ({ shakeRef }), []);
	const [focusTarget, setFocusTarget] = useState(null);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setFocusTarget(null);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handlePointerOver = () => {
		document
			.querySelector(".canvas-container")
			?.classList.add("pointer-cursor");
	};

	const handlePointerOut = () => {
		document
			.querySelector(".canvas-container")
			?.classList.remove("pointer-cursor");
	};

	return (
		<section className='w-full h-screen relative'>
			<Canvas
				className='canvas-container'
				shadows
				dpr={[1, 1.5]}
				gl={{ antialias: true }}
				onCreated={({ gl }) => {
					gl.shadowMap.enabled = true;
					gl.shadowMap.type = THREE.PCFSoftShadowMap;
					gl.setClearColor(isDarkMode ? "#05060a" : "#eef3fb", 1);
				}}>
				<LabRoom isDarkMode={isDarkMode} />

				{/* Lights: one shadow-casting key + low ambient */}
				<ambientLight intensity={isDarkMode ? 0.35 : 0.6} />
				<directionalLight
					position={[12, 24, 10]}
					intensity={isDarkMode ? 1.6 : 1.2}
					castShadow
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
					shadow-camera-near={2}
					shadow-camera-far={120}
					shadow-camera-left={-60}
					shadow-camera-right={60}
					shadow-camera-top={60}
					shadow-camera-bottom={-60}
				/>

				<PerspectiveCam />
				<Lighting />

				{/* Lab environment */}
				<LabRoom isDarkMode={isDarkMode} />

				<CameraController focusTarget={focusTarget} />

				<OrbitControls
					makeDefault
					enabled={focusTarget === null}
					autoRotate={false}
					enableZoom={false}
					enablePan={false}
					minPolarAngle={Math.PI / 1.7}
					maxPolarAngle={Math.PI / 1.7}
				/>

				<Context.Provider value={contextValue}>
					{/* Hero */}
					<Andy
						onPointerOver={handlePointerOver}
						onPointerOut={handlePointerOut}
					/>

					{/* Projects console hitbox */}
					<mesh
						position={[-28, -7.8, 2]}
						onPointerOver={handlePointerOver}
						onPointerOut={handlePointerOut}
						onClick={() => setFocusTarget("projects")}
						castShadow>
						<boxGeometry args={[10, 3, 10]} />
						<meshStandardMaterial
							transparent
							opacity={0}
						/>
					</mesh>

					{/* About console hitbox */}
					<mesh
						position={[28, -7.8, 2]}
						onPointerOver={handlePointerOver}
						onPointerOut={handlePointerOut}
						onClick={() => setFocusTarget("about")}
						castShadow>
						<boxGeometry args={[10, 3, 10]} />
						<meshStandardMaterial
							transparent
							opacity={0}
						/>
					</mesh>

					<Overlay />
				</Context.Provider>
			</Canvas>

			{focusTarget && (
				<button
					onClick={() => setFocusTarget(null)}
					className='absolute top-4 left-4 z-50 px-4 py-2 bg-white/90 dark:bg-black/90 rounded-lg shadow-lg text-black dark:text-white'>
					← Back
				</button>
			)}
		</section>
	);
}
