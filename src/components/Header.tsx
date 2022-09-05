import dayjs from "dayjs";
import { ChangeEvent } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
	nextMonth,
	prevMonth,
	selectCurrentWeek,
	selectMonthIndex,
	selectSelectedView,
	setCurrentWeek,
	setMonth,
	setSelectedView,
} from "../reducers/calSlice";
import { getWeek } from "../utils/day.helper";

const Header = () => {
	const monthIndex = useSelector(selectMonthIndex);
	const currentWeek = useSelector(selectCurrentWeek);
	const selectedView = useSelector(selectSelectedView);
	const dispatch = useDispatch();

	const handleChange = (change: string) => {
		switch (change) {
			case "prev":
				{
					if (selectedView === "week") {
						dispatch(
							setCurrentWeek(
								getWeek(dayjs(currentWeek[0]).subtract(1, "day").valueOf()),
							),
						);
					} else {
						dispatch(prevMonth({}));
					}
				}
				break;
			case "next":
				{
					if (selectedView === "week") {
						dispatch(
							setCurrentWeek(
								getWeek(dayjs(currentWeek[6]).add(1, "day").valueOf()),
							),
						);
					} else {
						dispatch(nextMonth({}));
					}
				}
				break;
		}
	};
	const handleReset = () => {
		dispatch(setMonth(dayjs().month()));
		dispatch(setCurrentWeek(getWeek()));
	};
	const handleViewChange = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSelectedView(e.target.value));
		handleReset();
	};

	return (
		<div className='flex flex-col sticky top-0 shadow-sm'>
			<header className='p-2 sm:hidden border-b bg-white'>
				<div className='flex items-center justify-center'>
					<span className='text-xl sm:text-5xl text-orange-300 mr-2'>
						<AiOutlineSchedule />
					</span>
					<h1 className=' text-md sm:text-xl text-gray-500 font-bold'>
						Scheduulr
					</h1>
				</div>
			</header>
			<header className='px-2 sm:px-4 py-4 sm:py-2 flex justify-between items-center sticky top-0 bg-white shadow-md sm:shadow-none border-b'>
				<div className='flex items-center'>
					<button
						className='border rounded py-1 px-4 hidden sm:block'
						onClick={handleReset}>
						Today
					</button>
					<button
						className='sm:mx-2 text-xl sm:text-md text-gray-600'
						onClick={() => handleChange("prev")}>
						<span>
							<IoChevronBack />
						</span>
					</button>
					<button
						className='sm:mx-2 text-xl sm:text-md text-gray-600'
						onClick={() => handleChange("next")}>
						<span>
							<IoChevronForward />
						</span>
					</button>
					<h2 className='mx-2 text-sm sm:text-xl text-gray-500 font-bold'>
						{dayjs(
							new Date(
								dayjs().year(),
								selectedView === "week"
									? dayjs(currentWeek[0]).month()
									: monthIndex,
							),
						).format("MMM YYYY")}
					</h2>
				</div>
				<div className='flex items-center'>
					<select
						className='border border-[#e5e7eb] rounded py-1 mr-2 text-xs sm:text-base focus:ring-0 focus:border-[#e5e7eb]'
						onChange={handleViewChange}
						value={selectedView}>
						<option value='week'>Week</option>
						<option value='month'>Month</option>
					</select>
				</div>
			</header>
		</div>
	);
};

export default Header;
