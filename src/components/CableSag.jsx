import React, { useMemo } from "react";
import * as THREE from "three";

function CableSag({
	start,
	end,
	sag = 2.2,
	radius = 0.08,
	tubularSegments = 48,
	radialSegments = 8,

	// NEW knobs
	kick = 0.7, // how far it sticks out before drooping
	kickUp = 0.0, // tiny lift if you want it (often 0)
	ease = 0.5, // catmull tension (0.0-1.0)
}) {
	const curve = useMemo(() => {
		const s = new THREE.Vector3(...start);
		const e = new THREE.Vector3(...end);

		// Direction the cable should "exit" the wall box.
		// In your setup, outward from wall = +Z.
		const out = new THREE.Vector3(0, 0, 1);

		// 1) small rigid segment right out of the wall
		const k1 = s.clone().add(out.clone().multiplyScalar(kick * 0.55));
		k1.y += kickUp;

		const k2 = s.clone().add(out.clone().multiplyScalar(kick));
		k2.y += kickUp * 0.5;

		// 2) sagging control points between (after the kick)
		const p1 = k2.clone().lerp(e, 0.33);
		const p2 = k2.clone().lerp(e, 0.66);

		// sag begins AFTER the kick
		p1.y -= sag;
		p2.y -= sag * 0.9;

		return new THREE.CatmullRomCurve3(
			[s, k1, k2, p1, p2, e],
			false,
			"catmullrom",
			ease
		);
	}, [start, end, sag, kick, kickUp, ease]);

	return (
		<mesh
			castShadow
			receiveShadow>
			<tubeGeometry
				args={[curve, tubularSegments, radius, radialSegments, false]}
			/>
			<meshStandardMaterial
				color='#1c2638'
				roughness={0.45}
				metalness={0.6}
			/>
		</mesh>
	);
}

export default CableSag;
