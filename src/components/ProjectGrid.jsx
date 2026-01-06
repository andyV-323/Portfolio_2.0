// components/ProjectGrid.jsx
const projects = [
	{
		title: "YouTube Clone",
		description: "Video streaming platform with search and playback",
		tech: ["React", "Material UI", "RapidAPI"],
		live: "https://...",
		github: "https://...",
		image: "/thumbnails/youtube.png",
		featured: true,
	},
	{
		title: "Fitness App",
		description: "Exercise library with muscle group targeting",
		tech: ["React", "ExerciseDB API"],
		live: "https://...",
		github: "https://...",
		image: "/thumbnails/fitness.png",
		featured: true,
	},
	{
		title: "Ghost Recon Tool",
		description: "Tactical squad management with permadeath tracking",
		tech: ["React", "Zustand", "Tailwind"],
		live: "https://...",
		github: "https://...",
		image: "/thumbnails/ghostrecon.png",
		featured: true,
	},
	// ... remaining 6 projects
];

export default function ProjectGrid({ onClose }) {
	const featured = projects.filter((p) => p.featured);
	const other = projects.filter((p) => !p.featured);

	return (
		<div className='bg-white/95 dark:bg-gray-900/95 p-6 rounded-xl max-h-[80vh] overflow-y-auto'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold dark:text-white'>Projects</h2>
				<button
					onClick={onClose}
					className='text-gray-500 hover:text-gray-800'>
					✕
				</button>
			</div>

			<h3 className='text-sm uppercase tracking-wide text-gray-500 mb-3'>
				Featured
			</h3>
			<div className='grid grid-cols-3 gap-4 mb-6'>
				{featured.map((project) => (
					<ProjectCard
						key={project.title}
						project={project}
					/>
				))}
			</div>

			<h3 className='text-sm uppercase tracking-wide text-gray-500 mb-3'>
				More Work
			</h3>
			<div className='grid grid-cols-3 gap-4'>
				{other.map((project) => (
					<ProjectCard
						key={project.title}
						project={project}
					/>
				))}
			</div>
		</div>
	);
}

function ProjectCard({ project }) {
	return (
		<div className='bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
			<img
				src={project.image}
				alt={project.title}
				className='w-full h-32 object-cover'
			/>
			<div className='p-3'>
				<h4 className='font-semibold dark:text-white'>{project.title}</h4>
				<p className='text-xs text-gray-600 dark:text-gray-400 mb-2'>
					{project.description}
				</p>
				<div className='flex flex-wrap gap-1 mb-2'>
					{project.tech.map((t) => (
						<span
							key={t}
							className='text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 rounded'>
							{t}
						</span>
					))}
				</div>
				<div className='flex gap-2'>
					{project.live && (
						<a
							href={project.live}
							target='_blank'
							rel='noopener noreferrer'
							className='text-xs text-blue-600'>
							Live
						</a>
					)}
					{project.github && (
						<a
							href={project.github}
							target='_blank'
							rel='noopener noreferrer'
							className='text-xs text-blue-600'>
							GitHub
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
