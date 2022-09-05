export const initEvents = () => {
	const storageEvents = localStorage.getItem("savedEvents");
	const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
	return parsedEvents;
};
