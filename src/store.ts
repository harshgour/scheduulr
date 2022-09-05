import { configureStore } from "@reduxjs/toolkit";
import calSliceReducer from "./reducers/calSlice";
import eventSliceReducer from "./reducers/eventSlice";
import restSliceReducer from "./reducers/restSlice";

export const store = configureStore({
	reducer: {
		cal: calSliceReducer,
		event: eventSliceReducer,
		rest: restSliceReducer,
	},
});

export type RootStateType = ReturnType<typeof store.getState>;
