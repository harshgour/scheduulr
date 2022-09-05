import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	selectCurrentWeek,
	selectDaySelected,
	setCurrentWeek,
} from "../../reducers/calSlice";
import { getWeek } from "../../utils/day.helper";
import WeekDay from "../WeekDay";

const WeekView = () => {
	const currentWeek = useSelector(selectCurrentWeek);
	const daySelected = useSelector(selectDaySelected);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setCurrentWeek(getWeek(daySelected)));
	}, [daySelected]);
	return (
		<div className='w-full grid grid-cols-7'>
			{currentWeek.map((day: dayjs.Dayjs | number, idx: number) => {
				return <WeekDay day={day} dayIdx={idx} key={idx} />;
			})}
		</div>
	);
};

export default WeekView;
