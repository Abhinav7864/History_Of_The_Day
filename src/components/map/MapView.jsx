// India's approximate bounding box for coordinate mapping
const INDIA_BOUNDS = {
	minLat: 8,   // Southern tip (Kanyakumari)
	maxLat: 37,  // Northern tip (Kashmir)
	minLng: 68,  // Western tip (Gujarat)
	maxLng: 97   // Eastern tip (Arunachal)
};

// Convert lat/lng to screen percentage positions
function latLngToPosition(lat, lng) {
	// Map latitude to vertical position (inverted: higher lat = lower top%)
	const top = 100 - ((lat - INDIA_BOUNDS.minLat) / (INDIA_BOUNDS.maxLat - INDIA_BOUNDS.minLat)) * 100;
	// Map longitude to horizontal position
	const left = ((lng - INDIA_BOUNDS.minLng) / (INDIA_BOUNDS.maxLng - INDIA_BOUNDS.minLng)) * 100;

	// Clamp to safe bounds with padding
	return {
		left: `${Math.min(90, Math.max(10, left))}%`,
		top: `${Math.min(85, Math.max(10, top))}%`
	};
}

export default function MapView({ sites, selectedId, onSelect }) {
	// Get pin position from actual coordinates or fallback to center
	const getPinPosition = (site) => {
		if (site.lat && site.lng) {
			return latLngToPosition(site.lat, site.lng);
		}
		// Fallback for sites without coordinates - center of map
		return { left: '50%', top: '50%' };
	};

	return (
		<div className="w-full h-full relative overflow-hidden">
			{/* Map Background with Vintage Texture */}
			<div className="absolute inset-0 bg-ink-light">
				{/* Vintage Map Image Overlay */}
				<div
					className="absolute inset-0 opacity-20 bg-cover bg-center"
					style={{
						backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Indo-Persian_Map.jpg')",
						filter: 'grayscale(100%) sepia(30%)'
					}}
				/>

				{/* Grid Overlay */}
				<div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage: 'linear-gradient(rgba(201, 169, 97, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 97, 0.3) 1px, transparent 1px)',
						backgroundSize: '60px 60px'
					}}
				/>

				{/* Vignette */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(26,26,26,0.8)_100%)]" />
			</div>

			{/* Map Title Watermark */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="text-center opacity-5">
					<h3 className="text-paper text-6xl md:text-8xl font-display uppercase -rotate-6">
						Chronicles
					</h3>
					<p className="text-paper text-xl font-body tracking-[0.5em] uppercase mt-2">
						of India
					</p>
				</div>
			</div>

			{/* Pins - Limited to 6 max */}
			{sites.slice(0, 6).map((site, index) => {
				const position = getPinPosition(site);
				const isSelected = site.id === selectedId;

				return (
					<button
						key={site.id}
						onClick={() => onSelect(site)}
						style={{ left: position.left, top: position.top }}
						aria-label={`View ${site.title}`}
						className={`
							absolute transform -translate-x-1/2 -translate-y-full
							transition-all duration-300 group z-10
							${isSelected ? 'z-50 scale-110' : 'hover:scale-105'}
						`}
					>
						{/* Pin Marker */}
						<div className="relative flex flex-col items-center">
							{/* Pin Head */}
							<div className={`
								w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg transition-all
								${isSelected
									? 'bg-gold border-ink text-ink scale-110'
									: 'bg-paper border-gold-dipped text-ink hover:bg-gold hover:border-ink'
								}
							`}>
								<span className="font-display text-xs uppercase">
									{site.year ? String(site.year).slice(-2) : '••'}
								</span>
							</div>

							{/* Pin Stem */}
							<div className={`
								w-0.5 h-4 transition-colors
								${isSelected ? 'bg-gold' : 'bg-gold-dipped'}
							`} />

							{/* Pin Point */}
							<div className={`
								w-2 h-2 rounded-full transition-colors
								${isSelected ? 'bg-gold' : 'bg-gold-dipped'}
							`} />
						</div>

						{/* Hover Label */}
						<div className={`
							absolute top-full left-1/2 -translate-x-1/2 mt-2
							bg-paper border-2 border-ink px-3 py-1 shadow-lg
							whitespace-nowrap max-w-[200px] truncate
							transition-opacity duration-200
							${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
						`}>
							<span className="font-display text-ink text-xs uppercase tracking-wider">
								{site.title}
							</span>
						</div>
					</button>
				);
			})}

			{/* Empty State */}
			{sites.length === 0 && (
				<div className="absolute inset-0 flex items-center justify-center">
					<p className="text-gold-muted font-body italic text-lg">
						Loading historical sites...
					</p>
				</div>
			)}

			{/* Compass Rose Decoration */}
			<div className="absolute bottom-6 left-6 opacity-20 pointer-events-none">
				<div className="w-16 h-16 border-2 border-gold-dipped rounded-full flex items-center justify-center">
					<div className="text-gold-dipped font-display text-xs">N</div>
				</div>
			</div>
		</div>
	);
}
