import eventsByDate from '../data/history/eventsByDate.json';

const monthRegistry = eventsByDate;

export const historyService = {
	getEventsByDate: (month, day) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const monthRecord = monthRegistry[month];

				if (!monthRecord || !monthRecord.data) {
					resolve([]);
					return;
				}

				const matches = monthRecord.data
					.filter(e => e.day === day)
					.map((e, index) => ({
						...e,
						id: `${month}-${day}-${index}`,
						month: month,
						description: e.short_summary, // Map for compatibility
						imageUrl: e.imageUrl || "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&q=80&w=1000", // Fallback vintage placeholder
					}));

				resolve(matches);
			}, 300);
		});
	},

	getAllEvents: () => {
		// Flatten all registered months for "all events"
		const allEvents = Object.keys(monthRegistry).flatMap(monthKey => {
			const m = parseInt(monthKey);
			return monthRegistry[m].data.map((e, index) => ({
				...e,
				id: `${m}-${e.day}-${index}`,
				month: m,
				description: e.short_summary,
				imageUrl: e.imageUrl || "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&q=80&w=1000"
			}));
		});
		return Promise.resolve(allEvents);
	}
};
