import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getMonth } from "./utils";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";
import EventModal from "./components/EventModal";
import MonthView from "./components/Views/MonthView";
import WeekView from "./components/Views/WeekView";

type Props = {};

const App = (props: Props) => {
	const { showEventModal, selectedView } = useContext(GlobalContext);

	return (
		<>
			{showEventModal && <EventModal />}
			<div className='min-h-screen flex'>
				<Sidebar />
				<div className='flex flex-1 flex-col'>
					<Header />
					{selectedView === "week" && <WeekView />}
					{selectedView === "month" && <MonthView />}
				</div>
			</div>
		</>
	);
};

export default App;
