import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getMonth } from "../../utils";
import Day from "../Day";

type Props = {};

const MonthView = (props: Props) => {
	const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth());
	const { monthIndex } = useContext(GlobalContext);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);
	return (
		<div className='flex-1 grid grid-cols-7 grid-rows-5 py-4 sm:p-4'>
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
