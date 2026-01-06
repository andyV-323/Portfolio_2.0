const Hanger = ({ x, z, topY = 20, bottomY = -6.0, r = 0.35 }) => {
	const h = topY - bottomY;
	return (
		<mesh
			position={[x, bottomY + h / 2, z]}
			castShadow
			receiveShadow>
			<cylinderGeometry args={[r, r, h, 14]} />

			<meshStandardMaterial
				color='#2f4a7a'
				roughness={0.4}
				metalness={0.7}
			/>
		</mesh>
	);
};

export default Hanger;
