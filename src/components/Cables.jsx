import CableSag from "./CableSag";
export default function Cables() {
	const wallBoxL = { pos: [-20, 2, -37], size: [3, 5, 1] };
	const wallBoxR = { pos: [20, 2, -37], size: [3, 5, 1] };

	// Your ceiling boxes are at +/-12 x in your code
	const ceilBoxL = { pos: [-11, 18.5, -31], size: [3, 5, 1] };
	const ceilBoxR = { pos: [11, 18.5, -31], size: [3, 5, 1] };

	// Where cables "plug into" the boxes:
	// - wall box: inner face (towards +z), near top
	// - ceiling box: bottom face, near back (towards -z) OR center;
	const portWall = (box, xOffset = 0) => {
		const [bx, by, bz] = box.pos;
		const [w, h, d] = box.size;
		return [
			bx + xOffset,
			by + h / 2 - 0.5, // near top edge
			bz + d / 2 + 0.02, // inner face (towards room)
		];
	};

	const portCeil = (box, xOffset = 0) => {
		const [bx, by, bz] = box.pos;
		const [w, h, d] = box.size;
		return [
			bx + xOffset,
			by - h / 2 + 0.4, // near bottom edge
			bz - d / 2 - 0.02, // slightly "behind" the box face
		];
	};

	// 6 cables per side (fits inside a 3-unit wide box)
	const spacing = 0.45; // distance between adjacent cables
	const offsets = Array.from({ length: 6 }, (_, i) => (i - 2.5) * spacing);
	// offsets: [-1.125, -0.675, -0.225, 0.225, 0.675, 1.125]

	return (
		<group>
			{/*wall mount lefft */}
			<group position={[-20, 4, -37]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[4, 6, 0.1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*cable box left*/}
			<group position={[-20, 4, -37]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[3, 5, 1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*wall mount right*/}
			<group position={[20, 4, -35]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[4, 6, 0.1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*cable box right*/}
			<group position={[20, 4, -35]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[3, 5, 1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*ceiling mount right*/}
			<group
				position={[12, 18.5, -35]}
				rotation={[Math.PI / 2, 0, 0]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[4, 6, 0.1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*ceiling cable box right*/}
			<group
				position={[-12, 18.5, -35]}
				rotation={[Math.PI / 2, 0, 0]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[3, 5, 1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*ceiling mount left*/}
			<group
				position={[-12, 18.5, -35]}
				rotation={[Math.PI / 2, 0, 0]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[4, 6, 0.1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*ceiling csble box left*/}
			<group
				position={[12, 18.5, -35]}
				rotation={[Math.PI / 2, 0, 0]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[3, 5, 1]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>

			<group>
				{/* LEFT cables */}
				{offsets.map((o, idx) => (
					<CableSag
						key={`L-${idx}`}
						start={portWall(wallBoxL, o)}
						end={portCeil(ceilBoxL, o)}
						sag={3.0 + idx * 0.12}
						kick={0.9 + (idx % 2) * 0.15}
						kickUp={0.05}
						radius={0.085}
					/>
				))}

				{/* RIGHT cables (FIXED to use R boxes + R keys) */}
				{offsets.map((o, idx) => (
					<CableSag
						key={`R-${idx}`}
						start={portWall(wallBoxR, o)}
						end={portCeil(ceilBoxR, o)}
						sag={3.0 + idx * 0.12}
						kick={0.9 + (idx % 2) * 0.15}
						kickUp={0.05}
						radius={0.085}
					/>
				))}
			</group>
		</group>
	);
}
