import dayjs from "dayjs";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { getWeek } from "../utils";
import GlobalContext from "./GlobalContext";

type Props = {
	children: React.ReactNode;
};

export type EventPayload = {
	id: string;
	title: string;
	description: string;
	contact: string;
	label: string;
	day: dayjs.Dayjs;
	time: string;
};

type ActionType = {
	type: string;
	payload: EventPayload;
};

const savedEventsReducer = (state: any, { type, payload }: ActionType) => {
	console.log(type, payload);
	switch (type) {
		case "push":
			return [...state, payload];
		case "update":
			return state.map((evt: any) => {
				return evt.id === payload.id ? payload : evt;
			});
		case "delete":
			return state.filter((evt: any) => evt.id !== payload.id);
		default:
			throw new Error();
	}
};

const initEvents = () => {
	if (process.env.NODE_ENV === "production") {
		return [];
	}

	const storageEvents = localStorage.getItem("savedEvents");
	const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
	return parsedEvents;
};

const ContextWrapper = (props: Props) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [showEventModal, setShowEventModal] = useState(false);
	const [daySelected, setDaySelected] = useState<dayjs.Dayjs>(dayjs());
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [labels, setLabels] = useState<Array<any>>([]);
	const [selectedView, setSelectedView] = useState("week");
	const [currentWeek, setCurrentWeek] = useState<dayjs.Dayjs[]>(getWeek());
	const [selectedTime, setSelectedTime] = useState<any>();

	const [savedEvents, dispatchCalEvent] = useReducer(
		savedEventsReducer,
		[],
		initEvents,
	);

	const filteredEvents = useMemo(() => {
		return savedEvents.filter((event: EventPayload) =>
			labels
				.filter((lbl) => lbl.checked)
				.map((lbl) => lbl.label)
				.includes(event.label),
		);
	}, [savedEvents, labels]);

	useEffect(() => {
		if (savedEvents) {
			localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
		}
	}, [savedEvents]);

	useEffect(() => {
		setLabels((prevLabels) => {
			return Array.from(
				new Set(savedEvents.map((evt: EventPayload) => evt.label)),
			).map((label) => {
				const currentLabel = prevLabels.find((lbl) => lbl.label === label);
				return {
					label,
					checked: currentLabel?.checked || true,
				};
			});
		});
	}, [savedEvents]);

	useEffect(() => {
		if (!showEventModal) {
			setSelectedEvent(null);
			setSelectedTime(null);
		}
	}, [showEventModal]);

	const updateLabel = (payload: any) => {
		setLabels(
			labels.map((lbl) => (lbl.label === payload.label ? payload : lbl)),
		);
	};

	return (
		<GlobalContext.Provider
			value={{
				monthIndex,
				setMonthIndex,
				daySelected,
				setDaySelected,
				showEventModal,
				setShowEventModal,
				savedEvents,
				dispatchCalEvent,
				selectedEvent,
				setSelectedEvent,
				labels,
				setLabels,
				updateLabel,
				filteredEvents,
				selectedView,
				setSelectedView,
				currentWeek,
				setCurrentWeek,
				selectedTime,
				setSelectedTime,
			}}>
			{props.children}
		</GlobalContext.Provider>
	);
};

export default ContextWrapper;
