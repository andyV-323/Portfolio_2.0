// components/MountArm.jsx
export default function MountArm({
	position = [0, 0, 0],
	rotation = [0, 0, 0],

	// bar sizing
	barLen = 3,
	barW = 0.6,
	barH = 0.1,
	gap = 0.9, // distance between the 3 bars

	// ring sizing
	ringR = 0.5,
	ringTube = 0.2,
	ringOffsetX = 1.8,
	ringOffsetZ = 1, // matches your left arms (+1) / right arms (-1)

	// colors/material
	barColor = "#24344f",
	ringColor = "#2f4a7a",

	// optional rod through
	rod = false,
	rodR = 0.12,
	rodLen = 4.2,
	rodColor = "#2f4a7a",
}) {
	return (
		<group
			position={position}
			rotation={rotation}
			castShadow
			receiveShadow>
			{/* 3 bars */}
			<mesh
				position={[-gap, 0, 0]}
				castShadow
				receiveShadow>
				<boxGeometry args={[barW, barH, barLen]} />
				<meshStandardMaterial
					color={barColor}
					roughness={0.6}
					metalness={0.25}
				/>
			</mesh>

			<mesh
				position={[0, 0, 0]}
				castShadow
				receiveShadow>
				<boxGeometry args={[barW, barH, barLen]} />
				<meshStandardMaterial
					color={barColor}
					roughness={0.6}
					metalness={0.25}
				/>
			</mesh>

			<mesh
				position={[gap, 0, 0]}
				castShadow
				receiveShadow>
				<boxGeometry args={[barW, barH, barLen]} />
				<meshStandardMaterial
					color={barColor}
					roughness={0.6}
					metalness={0.25}
				/>
			</mesh>

			{/* optional rod through the arm */}
			{rod && (
				<mesh
					position={[0, 0, 0]}
					castShadow
					receiveShadow>
					<cylinderGeometry args={[rodR, rodR, rodLen, 16]} />
					{/* cylinder is vertical by default, rotate to go "through" the arm */}
					<meshStandardMaterial
						color={rodColor}
						roughness={0.4}
						metalness={0.7}
					/>
				</mesh>
			)}

			{/* left ring */}
			<mesh
				position={[-ringOffsetX, 0, ringOffsetZ]}
				castShadow
				receiveShadow>
				<torusGeometry args={[ringR, ringTube, 20, 35]} />
				<meshStandardMaterial
					color={ringColor}
					roughness={0.4}
					metalness={0.7}
				/>
			</mesh>

			{/* right ring */}
			<mesh
				position={[ringOffsetX, 0, ringOffsetZ]}
				castShadow
				receiveShadow>
				<torusGeometry args={[ringR, ringTube, 20, 35]} />
				<meshStandardMaterial
					color={ringColor}
					roughness={0.4}
					metalness={0.7}
				/>
			</mesh>
		</group>
	);
}
