import dayjs from "dayjs";
import React, {
	ChangeEvent,
	FormEvent,
	SyntheticEvent,
	useEffect,
	useState,
} from "react";
import {
	IoClose,
	IoTime,
	IoCall,
	IoCheckmark,
	IoBookmark,
	IoTrash,
} from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectDaySelected, selectSelectedTime } from "../reducers/calSlice";
import {
	deleteEvent,
	pushEvent,
	selectFilteredEvents,
	selectSavedEvents,
	selectSelectedEvent,
	updateEvent,
} from "../reducers/eventSlice";
import { setShowEventModal } from "../reducers/restSlice";
import { EventType, FormDataType } from "../types";

type Props = {};

type FakeEventType = {
	currentTarget: {
		name: string;
		value: string;
	};
};

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const times = ["9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8"];

const EventModal = (props: Props) => {
	const daySelected = useSelector(selectDaySelected);
	const selectedEvent = useSelector(selectSelectedEvent);
	const savedEvents = useSelector(selectSavedEvents);
	const selectedTime = useSelector(selectSelectedTime);
	const dispatch = useDispatch();

	const availTimes = () => {
		const events = savedEvents.map((evt: EventType) => {
			if (
				dayjs(evt.day).format("DD-MM-YY") ===
				dayjs(daySelected).format("DD-MM-YY")
			)
				return evt.time;
		});
		let availableTimes = times.filter((time) => !events.includes(time));
		return availableTimes;
	};

	const [availableTimes, setAvailableTimes] = useState<string[]>([]);
	const [formData, setFormData] = useState<FormDataType>({
		title: selectedEvent?.title || "",
		description: selectedEvent?.description || "",
		contact: selectedEvent?.contact || "",
		selectedLabel:
			selectedEvent?.label || labelsClasses[Math.floor(Math.random() * 6)],
		time:
			selectedEvent?.time ||
			selectedTime ||
			availTimes()[Math.floor(Math.random() * availTimes().length)],
	});

	useEffect(() => {
		setAvailableTimes(availTimes());
	}, []);

	const handlePropagation = (e: SyntheticEvent) => e.stopPropagation();
	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | FakeEventType,
	) => {
		const target = e.currentTarget;
		const { name, value } = target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};
	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		const scheduledEvent = {
			title: formData.title || "Add title",
			description: formData.description || "Add a description",
			contact: formData.contact || "Add phone",
			label: formData.selectedLabel,
			day: daySelected.valueOf(),
			time: formData.time,
			id: selectedEvent?.id || Date.now(),
		};

		if (selectedEvent) {
			dispatch(updateEvent(scheduledEvent));
		} else {
			dispatch(pushEvent(scheduledEvent));
		}
		dispatch(setShowEventModal(false));
	};
	const handleEventDelete = (e: FormEvent) => {
		dispatch(deleteEvent(selectedEvent));
		dispatch(setShowEventModal(false));
	};
	const getLabelColorClass = (label: string) => {
		return `bg-${label}-500`;
	};

	return (
		<div
			className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-opacity-50 bg-gray-400 z-10'
			onClick={() => dispatch(setShowEventModal(false))}>
			<form
				className='bg-white rounded-lg shadow-2xl w-[90%] sm:w-3/5 lg:w-2/5 2xl:w-1/3'
				onClick={handlePropagation}>
				<header className='bg-gray-100 px-4 py-2 flex justify-between items-center rounded-t-lg'>
					<span>Add Event</span>
					<div className='flex gap-3'>
						{selectedEvent && (
							<span
								className='text-gray-400 cursor-pointer text-lg'
								onClick={handleEventDelete}>
								<IoTrash />
							</span>
						)}
						<span
							className='text-gray-400 cursor-pointer text-xl'
							onClick={() => dispatch(setShowEventModal(false))}>
							<IoClose />
						</span>
					</div>
				</header>
				<div className='p-3'>
					<div className='grid grid-cols-1/5 gap-y-5 items-center'>
						<div></div>
						<input
							type='text'
							name='title'
							placeholder='Add title'
							required
							className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
							value={formData.title}
							onChange={handleInputChange}
						/>
						<span className='text-gray-400 cursor-pointer text-2xl'>
							<IoTime />
						</span>
						<div className='flex flex-col items-start sm:items-center sm:flex-row'>
							<p className='text-slate-500 mr-4 sm:border-r-2 pr-4'>
								{dayjs(daySelected).format("dddd, MMMM DD")}
							</p>
							<div>
								<span className='text-slate-500 mr-2'>Time:</span>

								{selectedEvent ? (
									<span className='hidden sm:inline-block'>
										{selectedEvent.time} - {Number(selectedEvent.time) + 1}{" "}
										{Number(selectedEvent.time) < 9 ||
										Number(selectedEvent.time) === 12
											? "PM"
											: "AM"}
									</span>
								) : (
									<select
										name='time'
										className='border border-[#e5e7eb] text-sm sm:text-md rounded py-1 mr-2 focus:ring-0 focus:border-[#e5e7eb] ml-2'
										value={formData.time}
										onChange={handleInputChange}>
										{availableTimes.map((time, index, arr) => {
											return (
												<option value={time} key={index}>
													{time} - {arr[index + 1] || Number(time) + 1}
												</option>
											);
										})}
									</select>
								)}
							</div>
						</div>
						<span className='text-gray-400 cursor-pointer text-2xl pt-3'>
							<IoCall />
						</span>
						<input
							type='text'
							name='contact'
							placeholder='E.g. 99999XXXXX'
							required
							className='pt-3 border-0 text-gray-600 text-md font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder:text-sm'
							value={formData.contact}
							onChange={handleInputChange}
						/>
						<span className='text-gray-400 cursor-pointer text-2xl pt-3'>
							<MdDescription />
						</span>
						<textarea
							name='description'
							placeholder='Add a description'
							className='pt-3 border-0 text-gray-600 text-md font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder:text-sm'
							value={formData.description}
							onChange={handleInputChange}
						/>
						<span className='text-gray-400 cursor-pointer text-2xl'>
							<IoBookmark />
						</span>
						<div className='flex'>
							{labelsClasses.map((lblClass, idx) => {
								return (
									<span
										key={idx}
										className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer mx-1 ${getLabelColorClass(
											lblClass,
										)}`}
										onClick={() =>
											handleInputChange({
												currentTarget: {
													name: "selectedLabel",
													value: lblClass,
												},
											})
										}>
										{formData.selectedLabel === lblClass && (
											<i className='text-white'>
												<IoCheckmark />
											</i>
										)}
									</span>
								);
							})}
						</div>
					</div>
				</div>
				<footer className='flex justify-end border-t p-3 mt-5'>
					<button
						type='submit'
						className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'
						onClick={handleFormSubmit}>
						Save
					</button>
				</footer>
			</form>
		</div>
	);
};

export default EventModal;
