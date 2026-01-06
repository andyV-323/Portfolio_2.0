import React from "react";
import * as THREE from "three";

const Desk = ({ isDarkMode }) => {
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
			{/*Middle*/}
			<group position={[0, -6.8, -35]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[25, 1.6, 7]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*Left */}
			<group position={[-20, -6.8, -27.5]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[15, 1.6, 17]} />
					<primitive
						object={metalMat}
						attach='material'
					/>
				</mesh>
			</group>
			{/*Left slanted*/}
			<group
				position={[-20, -6.8, -32.5]}
				rotation={[0, Math.PI / 4, 0]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[15, 1.6, 17]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*Right*/}
			<group position={[20, -6.8, -27.5]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[15, 1.6, 17]} />
					<primitive
						object={metalMat}
						attach='material'
					/>
				</mesh>
			</group>
			{/*Right slanted*/}
			<group
				position={[20, -6.8, -32.5]}
				rotation={[0, -Math.PI / 4, 0]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[15, 1.6, 17]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
		</group>
	);
};

export default Desk;
