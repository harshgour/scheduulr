import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../store";
import { EventStateType, EventType } from "../types";
import { initEvents } from "../utils/events.helper";

const initialState: EventStateType = {
	savedEvents: initEvents(),
	selectedEvent: null!,
	filteredEvents: [],
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		setSelectedEvent: (state, action) => {
			state.selectedEvent = action.payload;
		},
		pushEvent: (state, action) => {
			state.savedEvents = [...state.savedEvents, action.payload];
		},
		updateEvent: (state, action) => {
			state.savedEvents = state.savedEvents.map((evt: EventType) => {
				return evt.id === action.payload.id ? action.payload : evt;
			});
		},
		deleteEvent: (state, action) => {
			state.savedEvents = state.savedEvents.filter(
				(evt: EventType) => evt.id !== action.payload.id,
			);
		},
		setFilteredEvents: (state, action) => {
			state.filteredEvents = action.payload;
		},
		resetSavedEvents: (state, action) => {
			state.savedEvents = [];
			state.filteredEvents = [];
			localStorage.removeItem("savedEvents");
		},
	},
});

export const {
	setSelectedEvent,
	pushEvent,
	updateEvent,
	deleteEvent,
	setFilteredEvents,
	resetSavedEvents,
} = eventSlice.actions;

export const selectSavedEvents = (state: RootStateType) =>
	state.event.savedEvents;
export const selectFilteredEvents = (state: RootStateType) =>
	state.event.filteredEvents;
export const selectSelectedEvent = (state: RootStateType) =>
	state.event.selectedEvent;

export default eventSlice.reducer;
