// components/MonitorCables.jsx
import React, { useMemo } from "react";
import * as THREE from "three";
import CableSag from "./CableSag";

export default function MonitorCables() {
	// This MUST match your monitor rack group position:
	// <group position={[0, 2.5, -38.5]}>
	const rackPos = useMemo(() => new THREE.Vector3(0, 2.5, -38.5), []);

	// These MUST match your ceiling cable box positions in Cables.jsx
	// (use the actual ones you want to connect to)
	const ceilBoxL = { pos: [-12, 18.5, -35], size: [3, 5, 1] };
	const ceilBoxR = { pos: [12, 18.5, -35], size: [3, 5, 1] };

	// A "bottom port" on the ceiling box to plug into
	const ceilPort = (box, xOffset = 0) => {
		const [bx, by, bz] = box.pos;
		const [w, h, d] = box.size;

		return [
			bx + xOffset,
			by - h / 2 - 0.05, // slightly below box
			bz, // center in Z
		];
	};

	// Your exact monitors (FRAME meshes) inside the rack group:
	// NOTE: these are LOCAL to the rack group, so we add rackPos to get world.
	const monitors = useMemo(
		() => [
			// 4 center monitors
			{
				id: "TL",
				pos: [-6.5, 6, 2],
				yaw: Math.PI / 16,
				size: [12.5, 7, 0.6],
				side: "L",
			},
			{
				id: "TR",
				pos: [6.5, 6, 2],
				yaw: -Math.PI / 16,
				size: [12.5, 7, 0.6],
				side: "R",
			},
			{
				id: "BL",
				pos: [-6.5, -1.5, 2],
				yaw: Math.PI / 16,
				size: [12.5, 7, 0.6],
				side: "L",
			},
			{
				id: "BR",
				pos: [6.5, -1.5, 2],
				yaw: -Math.PI / 16,
				size: [12.5, 7, 0.6],
				side: "R",
			},

			// side monitors
			{
				id: "LEFT",
				pos: [-21.5, -2.5, 8],
				yaw: Math.PI / 4,
				size: [14.5, 7, 0.6],
				side: "L",
			},
			{
				id: "RIGHT",
				pos: [21.5, -2.5, 8],
				yaw: -Math.PI / 4,
				size: [14.5, 7, 0.6],
				side: "R",
			},
		],
		[]
	);

	// "Port" on the BACK of the monitor, accounting for yaw
	const monitorBackPortWorld = (m) => {
		const localPos = new THREE.Vector3(...m.pos);

		// back offset in monitor-local space (toward wall)
		// depth = m.size[2] (0.6). back = -Z (because your screens are in front at z=2.5)
		const backOffset = new THREE.Vector3(0, 0, -m.size[2] / 2 - 0.08);

		// rotate the back offset by the monitor yaw so the port stays behind the screen
		backOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), m.yaw);

		// local port position
		const portLocal = localPos.clone().add(backOffset);

		// convert to WORLD (rack has only a position offset)
		const portWorld = portLocal.add(rackPos);

		return [portWorld.x, portWorld.y, portWorld.z];
	};

	// Spread ports across each ceiling box (6 monitors total; 3 per side looks good)
	const ceilOffsetsL = [-0.7, 0, 0.7];
	const ceilOffsetsR = [-0.7, 0, 0.7];

	// Choose which ceiling port each monitor should target
	// Left side: TL, BL, LEFT
	// Right side: TR, BR, RIGHT
	const leftTargets = ["TL", "BL", "LEFT"];
	const rightTargets = ["TR", "BR", "RIGHT"];

	return (
		<group>
			{/* LEFT MONITOR CABLES */}
			{leftTargets.map((id, i) => {
				const m = monitors.find((x) => x.id === id);
				if (!m) return null;

				return (
					<CableSag
						key={`MC-L-${id}`}
						start={monitorBackPortWorld(m)}
						end={ceilPort(ceilBoxL, ceilOffsetsL[i])}
						// tweak these to taste
						sag={3.2 + i * 0.25}
						kick={0.55}
						kickUp={0.02}
						radius={0.07}
					/>
				);
			})}

			{/* RIGHT MONITOR CABLES */}
			{rightTargets.map((id, i) => {
				const m = monitors.find((x) => x.id === id);
				if (!m) return null;

				return (
					<CableSag
						key={`MC-R-${id}`}
						start={monitorBackPortWorld(m)}
						end={ceilPort(ceilBoxR, ceilOffsetsR[i])}
						sag={3.2 + i * 0.25}
						kick={0.55}
						kickUp={0.02}
						radius={0.07}
					/>
				);
			})}
		</group>
	);
}
