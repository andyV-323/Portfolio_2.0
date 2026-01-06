// components/LabScreens.jsx
import { Html } from "@react-three/drei";

function Panel({ title, imgSrc, w, h }) {
	return (
		<div
			style={{
				width: w,
				height: h,
				borderRadius: 10,
				overflow: "hidden",
				border: "1px solid rgba(120,200,255,0.22)",
				background: "rgba(4,8,14,0.55)",
				boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
				backdropFilter: "blur(10px)",
				fontFamily: "ui-sans-serif, system-ui",
				color: "#d9ecff",
			}}>
			<div
				style={{
					padding: "8px 10px",
					fontSize: 11,
					letterSpacing: 0.7,
					borderBottom: "1px solid rgba(120,200,255,0.16)",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					background: "rgba(0,0,0,0.22)",
				}}>
				<span style={{ opacity: 0.95 }}>{title}</span>
			</div>

			<img
				src={imgSrc}
				alt={title}
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
					display: "block",
				}}
				loading='lazy'
				decoding='async'
			/>
		</div>
	);
}

export default function LabScreens() {
	// Rack anchor: [0, 2.5, -38.5]
	return (
		<>
			{/* Top big center */}
			<Html
				position={[0, 2.5 + 9.2, -38.5 + 1.2]}
				transform
				prepend
				occlude={false}
				distanceFactor={13}
				zIndexRange={[100, 0]}
				style={{ pointerEvents: "none" }}>
				<Panel
					title='OVERVIEW'
					imgSrc='/ui/screens/overview.png'
					w={560}
					h={170}
				/>
			</Html>

			{/* Middle small left */}
			<Html
				position={[-12.5, 2.5 + 2.1, -38.5 + 1.2]}
				transform
				prepend
				occlude={false}
				distanceFactor={16}
				zIndexRange={[100, 0]}
				style={{ pointerEvents: "none" }}>
				<Panel
					title='PROJECTS'
					imgSrc='/ui/screens/projects.png'
					w={260}
					h={150}
				/>
			</Html>

			{/* Middle small right */}
			<Html
				position={[12.5, 2.5 + 2.1, -38.5 + 1.2]}
				transform
				prepend
				occlude={false}
				distanceFactor={16}
				zIndexRange={[100, 0]}
				style={{ pointerEvents: "none" }}>
				<Panel
					title='ABOUT'
					imgSrc='/ui/screens/about.png'
					w={260}
					h={150}
				/>
			</Html>

			{/* Center bigger */}
			<Html
				position={[0, 2.5 - 4.4, -38.5 + 1.2]}
				transform
				prepend
				occlude={false}
				distanceFactor={14}
				zIndexRange={[100, 0]}
				style={{ pointerEvents: "none" }}>
				<Panel
					title='RESUME / SKILLS'
					imgSrc='/ui/screens/resume.png'
					w={460}
					h={220}
				/>
			</Html>

			{/* Left side screen */}
			<Html
				position={[-24.5, 2.5 - 2.0, -38.5 + 1.2]}
				transform
				prepend
				occlude={false}
				distanceFactor={15}
				zIndexRange={[100, 0]}
				style={{ pointerEvents: "none" }}>
				<Panel
					title='CONTACT'
					imgSrc='/ui/screens/contact.png'
					w={300}
					h={200}
				/>
			</Html>

			{/* Right side screen */}
			<Html
				position={[24.5, 2.5 - 2.0, -38.5 + 1.2]}
				transform
				prepend
				occlude={false}
				distanceFactor={15}
				zIndexRange={[100, 0]}
				style={{ pointerEvents: "none" }}>
				<Panel
					title='SYSTEMS'
					imgSrc='/ui/screens/systems.png'
					w={300}
					h={200}
				/>
			</Html>

			{/* Table UI (under rack) */}
			<Html
				position={[0, -7.8 + 1.05, -28]}
				rotation={[-Math.PI / 2, 0, 0]}
				transform
				prepend
				occlude={false}
				distanceFactor={18}
				zIndexRange={[100, 0]}
				style={{ pointerEvents: "none" }}>
				<Panel
					title='COMMAND TABLE'
					imgSrc='/ui/screens/table-ui.png'
					w={460}
					h={260}
				/>
			</Html>
		</>
	);
}
