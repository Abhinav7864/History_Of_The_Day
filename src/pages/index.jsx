import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TodayCard from '../components/home/TodayCard';
import { historyService } from '../services/historyService';

export default function HomePage() {
	const navigate = useNavigate();
	const [todaysEvent, setTodaysEvent] = useState(null);

	useEffect(() => {
		const now = new Date();
		const currentMonth = now.getMonth() + 1;
		const currentDay = now.getDate();

		historyService.getEventsByDate(currentMonth, currentDay).then(events => {
			if (events && events.length > 0) {
				setTodaysEvent(events[0]);
			}
		});
	}, []);

	return (
		<div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
			{/* Central "Poster" Container */}
			<div className="relative w-full max-w-7xl bg-ink text-paper p-1 shadow-2xl">

				{/* The Blackboard Frame */}
				<div className="border-[16px] border-gold-dipped p-8 md:p-12 relative overflow-hidden">

					{/* Internal Border Decoration */}
					<div className="absolute top-4 left-4 right-4 bottom-4 border border-paper opacity-20 pointer-events-none"></div>

					{/* Hero Content */}
					<div className="relative z-10 flex flex-col items-center text-center space-y-5">

						{/* Vintage Logo / Top Label */}
						<div className="flex flex-col items-center">
							<span className="text-gold uppercase tracking-[0.5em] text-xs md:text-sm font-bold border-b border-gold pb-2 mb-2">
								Est. 2025
							</span>
							<h1 className="text-6xl md:text-8xl font-display text-gold-muted text-shadow-vintage leading-none">
								History<br /><span className="text-4xl md:text-6xl text-paper opacity-90 block mt-2">of the Day</span>
							</h1>
						</div>

						{/* Separator */}
						<div className="w-24 h-1 bg-gold opacity-50 my-6"></div>

						{/* Description */}
						<p className="text-lg md:text-xl font-body italic text-paper-dark leading-relaxed">
							"Unearth the forgotten chronicles of the past. A journey through time, etched in digital stone."
						</p>

						{/* History of the Day Feature */}
						{todaysEvent && (
							<div className="w-full max-w-3xl mt-8 animate-fade-in-up">
								<TodayCard event={todaysEvent} />
							</div>
						)}

						{/* CTA Buttons */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg mt-8">
							<button
								onClick={() => navigate('/explore')}
								className="group relative px-6 py-3 bg-paper text-ink font-display uppercase tracking-widest border-2 border-transparent hover:border-gold transition-all duration-300"
							>
								<span className="relative z-10">Explore Timeline</span>
								<div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0"></div>
							</button>

							<button
								onClick={() => navigate('/map')}
								className="group relative px-6 py-3 bg-transparent text-gold border-2 border-gold font-display uppercase tracking-widest hover:text-ink transition-all duration-300"
							>
								<span className="relative z-10 group-hover:text-ink transition-colors">Navigate City</span>
								<div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0"></div>
							</button>
						</div>

					</div>

					{/* Background Gradient Blend */}
					<div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,220,196,0.1)_0%,transparent_70%)] pointer-events-none"></div>

				</div>
			</div>
		</div>
	);
}
