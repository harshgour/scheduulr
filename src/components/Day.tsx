import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { EventPayload } from "../context/ContextWrapper";
import GlobalContext from "../context/GlobalContext";

type Props = {
	day: dayjs.Dayjs;
	rowIdx: number;
};

const Day = (props: Props) => {
	const [dayEvents, setDayEvents] = useState([]);

	const {
		setDaySelected,
		setShowEventModal,
		filteredEvents,
		setSelectedEvent,
	} = useContext(GlobalContext);

	useEffect(() => {
		const events = filteredEvents.filter(
			(evt: any) =>
				dayjs(evt.day).format("DD-MM-YY") ===
				dayjs(props.day).format("DD-MM-YY"),
		);
		setDayEvents(events);
	}, [filteredEvents, props.day]);

	const getCurrentDayClass = () => {
		return props.day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
			? "bg-blue-600 text-white rounded-full w-7"
			: "";
	};

	const getLabelColorClass = (label: string) => {
		return `bg-${label}-500`;
	};

	const handleDayClick = (day: dayjs.Dayjs) => {
		setDaySelected(day);
		setShowEventModal(true);
	};

	const handleEventClick = (event: EventPayload) => {
		setSelectedEvent(event);
	};

	return (
		<div className='border-b border-r border-gray-200 flex flex-col'>
			<header className='flex flex-col items-end'>
				{props.rowIdx === 0 && (
					<p className='text-sm self-center border-b w-full text-right p-2'>
						{props.day.format("dd")}
					</p>
				)}
				<p
					className={`text-sm p-1 mx-2 my-2 text-center ${getCurrentDayClass()}`}>
					{props.day.format("DD")}
				</p>
			</header>
			<div
				className='flex-1 cursor-pointer'
				onClick={() => handleDayClick(props.day)}>
				{dayEvents.slice(0, 3).map((event: EventPayload, idx) => {
					return (
						<div
							key={idx}
							className={`p-1 mt-2 mx-3 text-white text-sm rounded mb-1 truncate ${getLabelColorClass(
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
				{dayEvents.length > 3 && (
					<span className='rounded-full text-xs font-semibold text-gray-600 float-right mr-3 py-2'>
						+{dayEvents.length - 3} more
					</span>
				)}
			</div>
		</div>
	);
};

export default Day;
