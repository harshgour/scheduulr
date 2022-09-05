import dayjs from "dayjs";
import React from "react";
import { EventPayload } from "./ContextWrapper";

type ActionType = {
	type: string;
	payload: EventPayload;
};

const GlobalContext = React.createContext<any>({
	monthIndex: 0,
	setMonthIndex: (index: number) => {},
	daySelected: dayjs(),
	setDaySelected: (day: dayjs.Dayjs) => {},
	showEventModal: false,
	setShowEventModal: (value: boolean) => {},
	savedEvents: [],
	dispatchCalEvent: ({ type, payload }: ActionType) => {},
	selectedEvent: null,
	setSelectedEvent: (evt: EventPayload) => {},
	labels: [],
	updateLabel: (payload: any) => {},
	filteredEvents: [],
	selectedView: "week",
	setSelectedView: (view: string) => {},
	currentWeek: [],
	setCurrentWeek: (week: []) => {},
	selectedTime: null,
	setSelectedTime: (time: string) => {},
});

export default GlobalContext;
