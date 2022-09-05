import dayjs from "dayjs";
import { createSlice } from "@reduxjs/toolkit";
import { calStateType } from "../types";
import { getWeek } from "../utils/day.helper";
import { RootStateType } from "../store";

const initialState: calStateType = {
	monthIndex: dayjs().month(),
	daySelected: dayjs().valueOf(),
	currentWeek: getWeek(),
	selectedTime: null,
	selectedView: "month",
};

const appSlice = createSlice({
	name: "month",
	initialState,
	reducers: {
		setMonth: (state, action) => {
			state.monthIndex = action.payload;
		},
		prevMonth: (state, action) => {
			state.monthIndex -= 1;
		},
		nextMonth: (state, action) => {
			state.monthIndex += 1;
		},
		setDaySelected: (state, action) => {
			state.daySelected = action.payload;
		},
		setCurrentWeek: (state, action) => {
			state.currentWeek = action.payload.map((item: dayjs.Dayjs) =>
				item.valueOf(),
			);
		},
		setSelectedTime: (state, action) => {
			state.selectedTime = action.payload;
		},
		setSelectedView: (state, action) => {
			state.selectedView = action.payload;
		},
	},
});

export const {
	setMonth,
	prevMonth,
	nextMonth,
	setDaySelected,
	setCurrentWeek,
	setSelectedTime,
	setSelectedView,
} = appSlice.actions;

export const selectMonthIndex = (state: RootStateType) => state.cal.monthIndex;
export const selectDaySelected = (state: RootStateType) =>
	state.cal.daySelected;
export const selectCurrentWeek = (state: RootStateType) =>
	state.cal.currentWeek;
export const selectSelectedTime = (state: RootStateType) =>
	state.cal.selectedTime;
export const selectSelectedView = (state: RootStateType) =>
	state.cal.selectedView;

export default appSlice.reducer;
