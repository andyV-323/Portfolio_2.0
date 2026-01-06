import Hanger from "./Hanger";
import Monitors from "./Monitors";
import MountArm from "./MountArm";
import Desk from "./Desk";

export default function LabRoom({ isDarkMode }) {
	return (
		<group>
			<Monitors />
			<Desk />
			{/*Left Arm top and bottom*/}
			<MountArm
				position={[-14, 8, -37.2]}
				rotation={[-Math.PI / 50, -Math.PI / 2, -Math.PI / 2]}
				ringOffsetZ={1} // your left versions used +1
			/>

			<MountArm
				position={[-14, 1, -37.2]}
				rotation={[-Math.PI / 50, -Math.PI / 2, -Math.PI / 2]}
				ringOffsetZ={1}
			/>

			{/*right arm top and bottom*/}
			<MountArm
				position={[14, 8, -37.7]}
				rotation={[-Math.PI / 50, -Math.PI / 2, -Math.PI / 2]}
				ringOffsetZ={-1} // your right versions used -1
			/>

			<MountArm
				position={[14, 1, -37.7]}
				rotation={[-Math.PI / 50, -Math.PI / 2, -Math.PI / 2]}
				ringOffsetZ={-1}
			/>

			{/* 4 ceiling hangers  */}
			<Hanger
				x={-15}
				z={-37.5}
				topY={20}
				bottomY={-6.0}
				r={0.35}
			/>

			<Hanger
				x={15}
				z={-38}
				topY={20}
				bottomY={-6.0}
				r={0.35}
			/>

			<Hanger
				x={-29}
				z={-22}
				topY={20}
				bottomY={-6.0}
				r={0.35}
			/>
			<Hanger
				x={-29}
				z={-36}
				topY={20}
				bottomY={-6.0}
				r={0.35}
			/>

			<Hanger
				x={29}
				z={-22}
				topY={20}
				bottomY={-6.0}
				r={0.35}
			/>

			<Hanger
				x={29}
				z={-36}
				topY={20}
				bottomY={-6.0}
				r={0.35}
			/>
		</group>
	);
}
