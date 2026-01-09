import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

function PanelCable({
	start,
	end,
	sag = 0.8,
	out = 6, // tiny "kick" outward so it doesn't look glued
	radius = 0.12,
}) {
	const curve = useMemo(() => {
		const s = new THREE.Vector3(...start);
		const e = new THREE.Vector3(...end);

		// kick outward (towards camera / +z in your scene usually)
		const k1 = s.clone().add(new THREE.Vector3(0, 0, -out));
		const k2 = e.clone().add(new THREE.Vector3(0, 0, -out * 0.35));

		// sag control points
		const p1 = k1.clone().lerp(k2, 0.33);
		const p2 = k1.clone().lerp(k2, 0.66);
		p1.y -= sag;
		p2.y -= sag * 0.9;

		return new THREE.CatmullRomCurve3(
			[s, k1, p1, p2, k2, e],
			false,
			"catmullrom",
			0.5
		);
	}, [start, end, sag, out]);

	return (
		<mesh
			castShadow
			receiveShadow>
			<tubeGeometry args={[curve, 48, radius, 10, false]} />
			<meshStandardMaterial
				color='#101826'
				roughness={0.55}
				metalness={0.45}
			/>
		</mesh>
	);
}
function ControlPanelWithUI({
	boxSize = [14.6, 2.5, 0.5],
	uiSize = [15.5, 5.6],
	uiTexture,
	position,
	rotation,
}) {
	return (
		<group
			position={position}
			rotation={rotation}>
			{/* Panel body */}
			<mesh
				castShadow
				receiveShadow>
				<boxGeometry args={boxSize} />
				<meshStandardMaterial
					color='#000000ff'
					roughness={0.6}
					metalness={0.25}
				/>
			</mesh>

			{/* UI screen */}
			<mesh position={[0, 0, boxSize[2] / 2 + 0.01]}>
				<planeGeometry args={uiSize} />
				<meshBasicMaterial
					map={uiTexture}
					transparent
					toneMapped={false}
				/>
			</mesh>
		</group>
	);
}

function ControlPanels() {
	const tacticalUI = useTexture("src/assets/LeftPanel.png");
	const commandUI = useTexture("src/assets/CenterPanel.png");
	const engineeringUI = useTexture("src/assets/RightPanel.png");

	return (
		<group>
			{/*Left Control Panel*/}
			<group
				position={[-18, -5, -27]}
				rotation={[-Math.PI / 6, Math.PI / 6, 0.3]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[15, 3, 0.5]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>

			{/*Right Control Panel*/}
			<group
				position={[18, -5, -27]}
				rotation={[-Math.PI / 7, -Math.PI / 6, 2.9]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[15, 3, 0.5]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/*Center Control Panel*/}
			<group
				position={[0, -5, -35]}
				rotation={[-Math.PI / 6, 0, 0]}>
				<mesh
					castShadow
					receiveShadow>
					<boxGeometry args={[19, 3, 0.5]} />
					<meshStandardMaterial
						color='#24344f'
						roughness={0.6}
						metalness={0.25}
					/>
				</mesh>
			</group>
			{/* LEFT -> CENTER (2 cables) */}
			<PanelCable
				start={[-12.0, -4.2, -31.2]} // left panel inner edge
				end={[-4.5, -4.2, -35.2]} // center panel left edge
				sag={0.9}
				radius={0.12}
			/>
			<PanelCable
				start={[-12.0, -5.2, -31.2]}
				end={[-4.5, -5.2, -35.2]}
				sag={1.1}
				radius={0.1}
			/>

			{/* CENTER -> RIGHT (2 cables) */}
			<PanelCable
				start={[5.5, -4.2, -35.2]} // center panel right edge
				end={[12.0, -4.2, -31.2]} // right panel inner edge
				sag={0.9}
				radius={0.12}
			/>
			<PanelCable
				start={[5.5, -5.2, -35.2]}
				end={[12.0, -5.2, -31.2]}
				sag={1.1}
				radius={0.1}
			/>
			<group>
				{/* LEFT */}
				<ControlPanelWithUI
					position={[-18, -4.8, -27]}
					rotation={[-Math.PI / 6, Math.PI / 6, 0.3]}
					uiTexture={tacticalUI}
				/>

				{/* CENTER */}
				<ControlPanelWithUI
					position={[0, -5, -35]}
					rotation={[-Math.PI / 6, 0, 0]}
					boxSize={[19, 3, 0.5]}
					uiSize={[19.3, 4.3]}
					uiTexture={commandUI}
				/>

				<ControlPanelWithUI
					position={[18, -4.9, -27]}
					rotation={[-Math.PI / 7, -Math.PI / 6, 2.9 - Math.PI]}
					uiTexture={engineeringUI}
					uiSize={[15.2, 4.3]}
				/>
			</group>
		</group>
	);
}

export default ControlPanels;
