import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EventModal from "./components/EventModal";
import MonthView from "./components/Views/MonthView";
import WeekView from "./components/Views/WeekView";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedView, setSelectedTime } from "./reducers/calSlice";
import {
	selectLabels,
	selectShowEventModal,
	setLabels,
} from "./reducers/restSlice";
import { useEffect, useMemo } from "react";
import {
	selectSavedEvents,
	setFilteredEvents,
	setSelectedEvent,
} from "./reducers/eventSlice";
import { EventType, LabelType } from "./types";

type Props = {};

const App = (props: Props) => {
	const showEventModal = useSelector(selectShowEventModal);
	const selectedView = useSelector(selectSelectedView);
	const savedEvents = useSelector(selectSavedEvents);
	const labels = useSelector(selectLabels);

	const dispatch = useDispatch();

	const filteredEvents = useMemo(() => {
		return savedEvents.filter((event: EventType) =>
			labels
				.filter((lbl: LabelType) => lbl.checked)
				.map((lbl: LabelType) => lbl.label)
				.includes(event.label),
		);
	}, [savedEvents, labels]);

	useEffect(() => {
		dispatch(setFilteredEvents(filteredEvents));
	}, [filteredEvents]);

	useEffect(() => {
		if (!showEventModal) {
			dispatch(setSelectedEvent(null));
			dispatch(setSelectedTime(null));
		}
	}, [showEventModal]);

	useEffect(() => {
		if (savedEvents.length) {
			localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
		}
	}, [savedEvents]);

	useEffect(() => {
		dispatch(
			setLabels(
				Array.from(new Set(savedEvents.map((evt: EventType) => evt.label))).map(
					(label) => {
						const currentLabel = labels.find(
							(lbl: LabelType) => lbl.label === label,
						);
						return {
							label,
							checked: currentLabel?.checked || true,
						};
					},
				),
			),
		);
	}, [savedEvents]);

	return (
		<>
			{showEventModal && <EventModal />}
			<div className='min-h-screen flex select-none'>
				<Sidebar />
				<div className='flex flex-1 flex-col'>
					<Header />
					{selectedView === "week" && <WeekView />}
					{selectedView === "month" && <MonthView />}
				</div>
			</div>
		</>
	);
};

export default App;
