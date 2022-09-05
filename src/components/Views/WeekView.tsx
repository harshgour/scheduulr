import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getWeek } from "../../utils";
import WeekDay from "../WeekDay";

type Props = {};

const WeekView = (props: Props) => {
	const { currentWeek } = useContext(GlobalContext);

	return (
		<div className='w-full grid grid-cols-7'>
			{currentWeek.map((day: any, idx: number) => {
				return <WeekDay day={day} dayIdx={idx} key={idx} />;
			})}
		</div>
	);
};

export default WeekView;
