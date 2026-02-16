import eventsByDate from "../data/history/eventsByDate.json";

// Handle potential default export or direct object import
const monthRegistry = eventsByDate.default || eventsByDate;

export const historyService = {
  getEventsByDate: (month, day) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ensure month is treated as a key (could be number or string)
        const monthRecord = monthRegistry[month];

        if (!monthRecord || !monthRecord.data) {
          resolve([]);
          return;
        }

        const matches = monthRecord.data
          .filter((e) => parseInt(e.day) === parseInt(day))
          .map((e, index) => ({
            ...e,
            id: `${month}-${day}-${index}`,
            month: month,
            description: e.short_summary, // Map for compatibility
            imageUrl:
              e.imageUrl ||
              "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&q=80&w=1000", // Fallback vintage placeholder
          }));

        resolve(matches);
      }, 300);
    });
  },

  getAllEvents: () => {
    // Flatten all registered months for "all events"
    const allEvents = Object.keys(monthRegistry)
      .filter((key) => !isNaN(parseInt(key)))
      .flatMap((monthKey) => {
        const m = monthKey;
        return monthRegistry[m].data.map((e, index) => ({
          ...e,
          id: `${m}-${e.day}-${index}`,
          month: parseInt(m),
          description: e.short_summary,
          imageUrl:
            e.imageUrl ||
            "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&q=80&w=1000",
        }));
      });
    return Promise.resolve(allEvents);
  },
};
