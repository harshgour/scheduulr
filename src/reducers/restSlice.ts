import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../store";
import { restStateType } from "../types";

const initialState: restStateType = {
	showEventModal: false,
	labels: [],
};

const restSlice = createSlice({
	name: "rest",
	initialState,
	reducers: {
		setShowEventModal: (state, action) => {
			state.showEventModal = action.payload;
		},
		setLabels: (state, action) => {
			state.labels = action.payload;
		},
	},
});

export const { setShowEventModal, setLabels } = restSlice.actions;

export const selectShowEventModal = (state: RootStateType) =>
	state.rest.showEventModal;
export const selectLabels = (state: RootStateType) => state.rest.labels;

export default restSlice.reducer;
