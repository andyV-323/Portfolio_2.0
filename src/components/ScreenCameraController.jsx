import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

export default function ScreenCameraController({ focusRef, enabled }) {
	const { camera } = useThree();

	const v = useMemo(() => new THREE.Vector3(), []);
	const q = useMemo(() => new THREE.Quaternion(), []);
	const forward = useMemo(() => new THREE.Vector3(0, 0, 1), []);
	const up = useMemo(() => new THREE.Vector3(0, 0, 0), []);
	const lookAt = useMemo(() => new THREE.Vector3(), []);

	useFrame(() => {
		if (!enabled || !focusRef?.current) return;

		const obj = focusRef.current;

		obj.updateWorldMatrix(true, false);
		obj.getWorldPosition(v);
		obj.getWorldQuaternion(q);

		// screen normal (points “out” of the monitor)
		const n = forward.clone().applyQuaternion(q).normalize();

		// distance back from screen (increase if still too close)
		const distance = 10;

		// slight upward offset so you’re not looking “too low”
		const yOffset = up.clone().applyQuaternion(q).multiplyScalar(1.2);

		const camPos = v.clone().add(n.multiplyScalar(distance)).add(yOffset);
		const target = v.clone().add(n.multiplyScalar(-2)); // look “into” screen a bit

		camera.position.lerp(camPos, 0.08);
		lookAt.lerp(target, 0.08);
		camera.lookAt(lookAt);
	});

	return null;
}
