import dayjs from "dayjs";

export type LabelType = {
	label: string;
	checked: boolean | undefined;
};

export type EventType = {
	id: string;
	title: string;
	description: string;
	contact: string;
	label: string;
	day: dayjs.Dayjs;
	time: string;
};

export type FormDataType = {
	title: string;
	description: string;
	contact: string;
	selectedLabel: string;
	time: string;
};

// redux state types
export type restStateType = {
	labels: LabelType[];
	showEventModal: Boolean;
};

export type EventStateType = {
	savedEvents: EventType[];
	selectedEvent: EventType;
	filteredEvents: EventType[];
};

export type calStateType = {
	monthIndex: number;
	daySelected: number;
	selectedView: string;
	currentWeek: number[];
	selectedTime: string | null;
};
