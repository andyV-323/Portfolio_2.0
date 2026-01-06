import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { Macbook } from "../models";
import ProjectGrid from "./ProjectGrid";

const Laptop = ({ onPointerOver, onPointerOut, onFocus, isFocused }) => {
	console.log("Laptop component rendering");
	const [macAnimation, setMacAnimation] = useState("Idle");

	const adjustMacbookForScreenSize = () => {
		let screenScale, screenPosition;

		if (window.innerWidth < 768) {
			screenScale = [0.9, 0.9, 0.9];
			screenPosition = [0, -10.5, 6.5]; // moved into view
		} else {
			screenScale = [1, 1, 1];
			screenPosition = [0, -10.5, 6.5]; // moved into view
		}

		return [screenScale, screenPosition];
	};

	const [macbookScale, macbookPosition] = adjustMacbookForScreenSize();

	const handleMacClick = () => {
		if (macAnimation === "Idle" || macAnimation === null) {
			setMacAnimation("Animation");
		} else if (!isFocused) {
			// Second click when open but not focused: zoom in
			onFocus?.("laptop");
		}
	};

	return (
		<>
			<mesh
				onClick={handleMacClick}
				position={macbookPosition}>
				<boxGeometry args={[3, 1, 1.5]} />
				<meshBasicMaterial
					transparent
					opacity={0}
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

			{/* Screen content - only interactive when focused */}
			{macAnimation === "Animation" && (
				<Html
					transform
					position={[
						macbookPosition[0],
						macbookPosition[1] + 1.8,
						macbookPosition[2] - 0.8,
					]}
					rotation={[-0.3, 0, 0]}
					scale={0.25}
					style={{
						width: "600px",
						pointerEvents: isFocused ? "auto" : "none",
						opacity: isFocused ? 1 : 0,
						transition: "opacity 0.3s",
					}}>
					<ProjectGrid
						onClose={() => {
							onFocus?.(null);
							setMacAnimation("Idle");
						}}
					/>
				</Html>
			)}
		</>
	);
};

export default Laptop;
