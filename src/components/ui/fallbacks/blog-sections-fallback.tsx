export default function BlogSectionsFallback() {
	return (
		<div className="mt-8 mb-4 w-11/12 rounded-lg border border-white/10 bg-white/30 p-4 backdrop-blur-md sm:w-5/6 md:w-3/4 lg:w-2/3">
			<h1 className="wrap-break-words flex items-center justify-center gap-2 text-center text-5xl">
				Loading{' '}
				<div className="flex items-center justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-black border-b-2"></div>
				</div>
			</h1>
		</div>
	)
}
