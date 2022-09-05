import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMonthIndex } from "../../reducers/calSlice";
import { getMonth } from "../../utils/day.helper";
import Day from "../Day";

type Props = {};

const MonthView = (props: Props) => {
	const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth());
	const monthIndex = useSelector(selectMonthIndex);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);
	return (
		<div className='flex-1 grid grid-cols-7 grid-rows-5 py-4 sm:p-4 sm:max-h-[94vh] overflow-hidden'>
			{currentMonth.map((row, i) => {
				return (
					<React.Fragment key={i}>
						{row.map((day, idx) => {
							return <Day day={day} key={idx} rowIdx={i} />;
						})}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default MonthView;
