// components/Floor.jsx
import * as THREE from "three";
import { useDarkMode } from "./DarkModeContext";

export default function Floor() {
	const { isDarkMode } = useDarkMode();

	return (
		<mesh
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, -10, 0]}
			receiveShadow>
			<planeGeometry args={[500, 500]} />
			<meshStandardMaterial
				color={isDarkMode ? "#0b0b0b" : "#d9d9d9"}
				roughness={0.9}
				metalness={0}
			/>
		</mesh>
	);
}
