import React, { forwardRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const Screen = forwardRef(function Screen(
	{
		id,
		position,
		rotation,
		w,
		h,
		df,
		focusedId,
		setFocusedId,
		Preview,
		Content,
		planeW,
		planeH,
	},
	ref
) {
	const isFocused = focusedId === id;

	const focus = (e) => {
		e?.stopPropagation?.();
		if (!isFocused) setFocusedId(id);
	};

	const stopAll = (e) => {
		// Prevent OrbitControls and canvas handlers from receiving these events
		e.preventDefault?.();
		e.stopPropagation?.();
	};

	return (
		<group
			ref={ref}
			position={position}
			rotation={rotation}>
			{/* Reliable 3D click target (helps when HTML isn't clicked directly) */}
			<mesh
				position={[0, 0, 0.15]}
				onPointerDown={(e) => focus(e)}>
				<planeGeometry args={[planeW ?? 11.5, planeH ?? 6.25]} />
				<meshBasicMaterial
					transparent
					opacity={0}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Preview label */}
			{!isFocused && (
				<Html
					position={[0, 0, 0.151]}
					transform
					occlude={false}
					distanceFactor={df}
					style={{ pointerEvents: "auto" }}>
					<div
						style={{ width: w, height: h }}
						onPointerDown={stopAll}
						onClick={(e) => focus(e)}>
						{Preview ? (
							<Preview
								w={w}
								h={h}
							/>
						) : null}
					</div>
				</Html>
			)}

			{/* Focused interactive content */}
			{isFocused && (
				<Html
					position={[0, 0, -151]}
					transform
					occlude={false}
					// render at higher pixel density when focused
					distanceFactor={df * 4}
					style={{ pointerEvents: "auto" }}>
					<div
						onPointerDown={stopAll}
						onPointerMove={stopAll}
						onPointerUp={stopAll}
						onWheel={stopAll}
						style={{
							// more pixels, same physical size (because df is also multiplied)
							width: w * 4,
							height: h * 4,

							overflow: "hidden",
							borderRadius: 10,
							background: "rgba(0, 0, 0, 100)",
							border: "1px solid rgba(120,200,255,0.18)",
							boxShadow:
								"0 0 24px rgba(120,200,255,0.15), 0 12px 40px rgba(0,0,0,0.55)",

							WebkitFontSmoothing: "antialiased",
							MozOsxFontSmoothing: "grayscale",
							textRendering: "optimizeLegibility",
						}}>
						{/* keep content normal size, but now it has way more pixels */}
						<div
							style={{
								width: "100%",
								height: "100%",
								overflow: "auto",
							}}>
							<Content />
						</div>
					</div>
				</Html>
			)}
		</group>
	);
});

export default Screen;
