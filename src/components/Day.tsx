import dayjs from "dayjs";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDaySelected, setSelectedView } from "../reducers/calSlice";
import { selectFilteredEvents, setSelectedEvent } from "../reducers/eventSlice";
import { setShowEventModal } from "../reducers/restSlice";
import { EventType } from "../types";

type Props = {
	day: dayjs.Dayjs;
	rowIdx: number;
};

const Day = (props: Props) => {
	const filteredEvents = useSelector(selectFilteredEvents);
	const [dayEvents, setDayEvents] = useState<EventType[]>(filteredEvents);
	const dispatch = useDispatch();

	useEffect(() => {
		const events = filteredEvents.filter(
			(evt: EventType) =>
				dayjs(evt.day).format("DD-MM-YY") ===
				dayjs(props.day).format("DD-MM-YY"),
		);
		setDayEvents(events);
	}, [filteredEvents, props.day]);

	const getCurrentDayClass = () => {
		return dayjs(props.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
			? "bg-blue-600 text-white rounded-full w-7"
			: "";
	};

	const getLabelColorClass = (label: string) => {
		return `bg-${label}-500`;
	};

	const handleDayClick = (day: dayjs.Dayjs) => {
		dispatch(setDaySelected(day.valueOf()));
		dispatch(setShowEventModal(true));
	};

	const handleEventClick = (event: EventType) => {
		dispatch(setSelectedEvent(event));
	};

	const handleMoreClick = (e: SyntheticEvent) => {
		e.stopPropagation();
		dispatch(setDaySelected(props.day.valueOf()));
		dispatch(setSelectedView("week"));
	};

	return (
		<div className='border-b border-r border-gray-200 flex flex-col'>
			<header className='flex flex-col items-end'>
				{props.rowIdx === 0 && (
					<p className='text-sm self-center border-b w-full text-right p-2'>
						{dayjs(props.day).format("dd")}
					</p>
				)}
				<p
					className={`text-sm p-1 mx-2 my-2 text-center ${getCurrentDayClass()}`}>
					{dayjs(props.day).format("DD")}
				</p>
			</header>
			<div
				className='flex-1 cursor-pointer flex flex-col'
				onClick={() => handleDayClick(props.day)}>
				{dayEvents.slice(0, 2).map((event: EventType, idx) => {
					return (
						<div
							key={idx}
							className={`p-1 mt-1 mx-1 sm:mx-3 text-white text-sm rounded mb-1 truncate ${getLabelColorClass(
								event.label,
							)}`}
							onClick={() => handleEventClick(event)}>
							<span className='text-xs font-bold'>
								{event.time}
								{Number(event.time) < 9 || Number(event.time) === 12
									? " PM "
									: " AM "}
							</span>
							: {event.title}
						</div>
					);
				})}
				{dayEvents.length > 2 && (
					<span
						className='rounded-full text-xs font-semibold self-center sm:self-end sm:mr-3 text-gray-600 py-2 hover:text-blue-500 hover:font-bold'
						onClick={handleMoreClick}>
						+{dayEvents.length - 2} more
					</span>
				)}
			</div>
		</div>
	);
};

export default Day;
