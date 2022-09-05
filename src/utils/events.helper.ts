export const initEvents = () => {
	if (process.env.NODE_ENV === "production") {
		return [];
	}
	const storageEvents = localStorage.getItem("savedEvents");
	const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
	return parsedEvents;
};
