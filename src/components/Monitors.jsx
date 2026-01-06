import React from "react";
import * as THREE from "three";
const Monitors = ({ isDarkMode }) => {
	const wallMat = new THREE.MeshStandardMaterial({
		color: isDarkMode ? "#0b0f16" : "#e8eef7",
		roughness: 0.95,
		metalness: 0,
	});

	const floorMat = new THREE.MeshStandardMaterial({
		color: isDarkMode ? "#06070a" : "#dfe6ef",
		roughness: 0.98,
		metalness: 0,
	});

	const metalMat = new THREE.MeshStandardMaterial({
		color: isDarkMode ? "#0f1622" : "#cfd8e6",
		roughness: 0.7,
		metalness: 0.15,
	});

	const frameMat = new THREE.MeshStandardMaterial({
		color: isDarkMode ? "#0a0f18" : "#0a0f18",
		roughness: 0.55,
		metalness: 0.1,
	});

	const screenGlowMat = new THREE.MeshStandardMaterial({
		color: isDarkMode ? "#07121f" : "#0b1a2a",
		emissive: isDarkMode ? "#1296ff" : "#1a4cff",
		emissiveIntensity: isDarkMode ? 0.18 : 0.08,
		roughness: 0.35,
		metalness: 0,
	});
	return (
		<group>
			{/* Floor */}
			<mesh
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -10, 0]}
				receiveShadow>
				<planeGeometry args={[140, 140]} />
				<primitive
					object={floorMat}
					attach='material'
				/>
			</mesh>

			{/* Room shell */}
			<mesh
				position={[0, 5, -42]}
				receiveShadow>
				<boxGeometry args={[140, 32, 2]} />
				<primitive
					object={wallMat}
					attach='material'
				/>
			</mesh>
			<mesh
				position={[-70, 5, 0]}
				receiveShadow>
				<boxGeometry args={[2, 32, 140]} />
				<primitive
					object={wallMat}
					attach='material'
				/>
			</mesh>
			<mesh
				position={[70, 5, 0]}
				receiveShadow>
				<boxGeometry args={[2, 32, 140]} />
				<primitive
					object={wallMat}
					attach='material'
				/>
			</mesh>
			<mesh
				position={[0, 21, 0]}
				receiveShadow>
				<boxGeometry args={[140, 2, 140]} />
				<primitive
					object={wallMat}
					attach='material'
				/>
			</mesh>

			{/* Monitor wall rack (single monitor only) */}
			<group position={[0, 2.5, -38.5]}>
				{/* Rack backplate */}
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[62, 26, 1.2]} />
					<primitive
						object={metalMat}
						attach='material'
					/>
				</mesh>

				{/* top monitor left (frame + screen) */}
				{/* Frame */}
				<mesh
					position={[-6.5, 6, 2]}
					rotation={[0, Math.PI / 16, 0]}
					castShadow
					receiveShadow>
					<boxGeometry args={[12.5, 7, 0.6]} />
					<primitive
						object={frameMat}
						attach='material'
					/>
				</mesh>

				{/* Screen plane (slightly smaller, slightly in front) */}
				<mesh
					position={[-6.5, 6, 2.5]}
					rotation={[0, Math.PI / 16, 0]}>
					<planeGeometry args={[11.5, 6.25]} />
					<primitive
						object={screenGlowMat}
						attach='material'
					/>
				</mesh>
				{/* top monitor right (frame + screen) */}
				{/* Frame */}
				<mesh
					position={[6.5, 6, 2]}
					rotation={[0, -Math.PI / 16, 0]}
					castShadow
					receiveShadow>
					<boxGeometry args={[12.5, 7, 0.6]} />
					<primitive
						object={frameMat}
						attach='material'
					/>
				</mesh>

				{/* Screen plane (slightly smaller, slightly in front) */}
				<mesh
					position={[6.5, 6, 2.5]}
					rotation={[0, -Math.PI / 16, 0]}>
					<planeGeometry args={[11.5, 6.25]} />
					<primitive
						object={screenGlowMat}
						attach='material'
					/>
				</mesh>

				{/* Bottom monitor left (frame + screen) */}
				{/* Frame */}
				<mesh
					position={[-6.5, -1.5, 2]}
					rotation={[0, Math.PI / 16, 0]}
					castShadow
					receiveShadow>
					<boxGeometry args={[12.5, 7, 0.6]} />
					<primitive
						object={frameMat}
						attach='material'
					/>
				</mesh>

				{/* Screen plane (slightly smaller, slightly in front) */}
				<mesh
					position={[-6.5, -1.5, 2.5]}
					rotation={[0, Math.PI / 16, 0]}>
					<planeGeometry args={[11.5, 6.25]} />
					<primitive
						object={screenGlowMat}
						attach='material'
					/>
				</mesh>
				{/* bottom monitor right (frame + screen) */}
				{/* Frame */}
				<mesh
					position={[6.5, -1.5, 2]}
					rotation={[0, -Math.PI / 16, 0]}
					castShadow
					receiveShadow>
					<boxGeometry args={[12.5, 7, 0.6]} />
					<primitive
						object={frameMat}
						attach='material'
					/>
				</mesh>

				{/* Screen plane (slightly smaller, slightly in front) */}
				<mesh
					position={[6.5, -1.5, 2.5]}
					rotation={[0, -Math.PI / 16, 0]}>
					<planeGeometry args={[11.5, 6.25]} />
					<primitive
						object={screenGlowMat}
						attach='material'
					/>
				</mesh>
				{/*  right monitor (frame + screen) */}
				{/* Frame */}
				<mesh
					position={[21.5, -2.5, 8]}
					rotation={[0, -Math.PI / 4, 0]}
					castShadow
					receiveShadow>
					<boxGeometry args={[14.5, 7, 0.6]} />
					<primitive
						object={frameMat}
						attach='material'
					/>
				</mesh>

				{/* Screen plane (slightly smaller, slightly in front) */}
				<mesh
					position={[21.5, -2.5, 8.5]}
					rotation={[0, -Math.PI / 4, 0]}>
					<planeGeometry args={[13.5, 6.25]} />
					<primitive
						object={screenGlowMat}
						attach='material'
					/>
				</mesh>
				{/*  left monitor (frame + screen) */}
				{/* Frame */}
				<mesh
					position={[-21.5, -2.5, 8]}
					rotation={[0, Math.PI / 4, 0]}
					castShadow
					receiveShadow>
					<boxGeometry args={[14.5, 7, 0.6]} />
					<primitive
						object={frameMat}
						attach='material'
					/>
				</mesh>

				{/* Screen plane (slightly smaller, slightly in front) */}
				<mesh
					position={[-21.5, -2.5, 8.5]}
					rotation={[0, Math.PI / 4, 0]}>
					<planeGeometry args={[13.5, 6.25]} />
					<primitive
						object={screenGlowMat}
						attach='material'
					/>
				</mesh>
			</group>
		</group>
	);
};

export default Monitors;
