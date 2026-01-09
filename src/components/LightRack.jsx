import React from "react";

export default function LightRack({ isDarkMode }) {
	return (
		<group>
			{/* rack body */}
			<group position={[0, 20, -35.5]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[58.5, 3, 30]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>

			{/* housing */}
			<group position={[0, 18, -25.5]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[14.5, 3, 7.5]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>

			{/* bulb assembly (local space) */}
			<group position={[0, 16, -25.5]}>
				{/* diffuser panel */}
				<mesh
					castShadow
					receiveShadow
					position={[0, 0.2, 0]}>
					<boxGeometry args={[12.5, 0.2, 6.5]} />
					<meshStandardMaterial
						color='#ffffff'
						emissive={isDarkMode ? "#ffffff" : "#000000"}
						emissiveIntensity={isDarkMode ? 2.5 : 0}
						roughness={0.1}
						metalness={0}
					/>
				</mesh>

				{/* actual light: sit just below diffuser and point DOWN */}
				{isDarkMode && (
					<rectAreaLight
						position={[0, -0.2, 0]}
						rotation={[Math.PI / 2, 0, 0]} // points toward -Y (down)
						width={12}
						height={6}
						intensity={18}
						color='#ffffff'
					/>
				)}
			</group>
		</group>
	);
}
