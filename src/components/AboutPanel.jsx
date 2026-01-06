// components/AboutPanel.jsx
export default function AboutPanel({ onClose }) {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='bg-white dark:bg-gray-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-8 m-4'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-2xl font-bold dark:text-white'>About Me</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-800 text-2xl'>
						✕
					</button>
				</div>

				{/* Your existing timeline content goes here */}
				{/* Migrate from About.jsx */}
			</div>
		</div>
	);
}
