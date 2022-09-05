import dayjs from "dayjs";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { EventPayload } from "../context/ContextWrapper";
import GlobalContext from "../context/GlobalContext";

type Props = {
	day: dayjs.Dayjs;
	dayIdx: number;
};

const WeekDay = (props: Props) => {
	const [dayEvents, setDayEvents] = useState([]);

	const {
		setDaySelected,
		setShowEventModal,
		filteredEvents,
		setSelectedEvent,
		setSelectedTime,
	} = useContext(GlobalContext);

	useEffect(() => {
		const events = filteredEvents.filter(
			(evt: any) =>
				dayjs(evt.day).format("DD-MM-YY") ===
				dayjs(props.day).format("DD-MM-YY"),
		);
		setDayEvents(events);
	}, [filteredEvents, props.day]);

	const getCurrentDateClass = (day: any) => {
		return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
			? "bg-blue-600 text-white rounded-full px-2 color-blue-600"
			: "";
	};

	const getCurrentDayClass = (day: any) => {
		return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
			? "text-blue-600"
			: "";
	};

	const getLabelColorClass = (label: string) => {
		return `bg-${label}-500`;
	};

	const handleEventClick = (e: SyntheticEvent, event: EventPayload) => {
		e.stopPropagation();
		setDaySelected(dayjs(event.day));
		setShowEventModal(true);
		setSelectedEvent(event);
	};

	const handleDayTimeClick = (index: number) => {
		if (
			dayEvents.filter(
				(item: any) =>
					Number(item.time) === (index + 9 === 12 ? 12 : (index + 9) % 12),
			).length
		) {
			return;
		}
		setDaySelected(dayjs(props.day));
		setShowEventModal(true);
		setSelectedTime(`${index + 9 === 12 ? 12 : (index + 9) % 12}`);
	};

	return (
		<div className='flex flex-col items-center justify-start'>
			<div className='flex flex-col items-center w-full px-2 py-4 sm:px-6'>
				<div className={`uppercase text-xs ${getCurrentDayClass(props.day)}`}>
					{props.day.format("ddd")}
				</div>
				<div
					className={`text-2xl w-12 h-12 flex items-center justify-center ${getCurrentDateClass(
						props.day,
					)}`}>
					{props.day.format("D")}
				</div>
			</div>
			<div className='flex-1 mt-4 w-full border-r'>
				<div className='time-rows h-max'>
					{new Array(12).fill([]).map((item, index) => (
						<div
							className='p-2 h-[8vh] sm:h-[6.5vh] w-full border-b cursor-pointer flex flex-col sm:flex-row'
							key={index}
							onClick={() => handleDayTimeClick(index)}>
							{props.dayIdx === 0 && (
								<span className='text-xs text-slate-500 sm:mr-2'>
									{index + 9 === 12 ? 12 : (index + 9) % 12}{" "}
									{index < 9 || index === 12 ? "PM" : "AM"}
								</span>
							)}
							{dayEvents.map((event: EventPayload, idx) => {
								return (
									Number(event.time) ===
										(index + 9 === 12 ? 12 : (index + 9) % 12) && (
										<div
											key={idx}
											className={`p-1 mx-1 text-white text-sm rounded flex-1 mb-1 truncate cursor-pointer font-medium ${getLabelColorClass(
												event.label,
											)}`}
											onClick={(e) => handleEventClick(e, event)}>
											{event.title}
										</div>
									)
								);
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default WeekDay;
