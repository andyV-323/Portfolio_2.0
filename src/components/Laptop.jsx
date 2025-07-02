import React, { useState } from "react";
import { Macbook } from "../models";

const Laptop = ({ onPointerOver, onPointerOut }) => {
	const [macAnimation, setMacAnimation] = useState("Idle");

	const adjustMacbookForScreenSize = () => {
		let screenScale, screenPosition;

		if (window.innerWidth < 768) {
			screenScale = [0.9, 0.9, 0.9];
			screenPosition = [0, -10.5, 6.5];
		} else {
			screenScale = [1, 1, 1];
			screenPosition = [0, -10.5, 6.5];
		}

		return [screenScale, screenPosition];
	};

	const [macbookScale, macbookPosition] = adjustMacbookForScreenSize();

	const handleMacClick = () => {
		setMacAnimation((prev) => (prev === "Idle" ? "Animation" : "Idle"));
	};

	return (
		<>
			<mesh
				onClick={handleMacClick}
				position={macbookPosition}>
				<boxGeometry args={[3, 1, 1.5]} />
				<meshBasicMaterial
					transparent
					opacity={1}
					visible={false}
				/>
			</mesh>
			<Macbook
				position={macbookPosition}
				scale={macbookScale}
				macAnimation={macAnimation}
				onPointerOver={onPointerOver}
				onPointerOut={onPointerOut}
				castShadow
			/>
		</>
	);
};

export default Laptop;
