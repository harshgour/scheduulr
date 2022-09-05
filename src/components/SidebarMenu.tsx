import React, { useState } from "react";
import { IoCalendarOutline, IoCall } from "react-icons/io5";

type Props = {};

const menuOptions = [
	{ name: "Calendar", value: "calendar", icon: <IoCalendarOutline /> },
	{ name: "Meetings", value: "meetings", icon: <IoCall /> },
];

const SidebarMenu = (props: Props) => {
	const [selected, setSelected] = useState("calendar");
	const getSelectedItemClasses = (value: string) => {
		return selected === value
			? "bg-orange-300 bg-opacity-50 border-r-4 border-orange-500"
			: "";
	};
	return (
		<>
			<ul className='flex flex-col items-left'>
				{menuOptions.map((option, idx) => {
					return (
						<li
							className={`px-6 py-3 flex items-center cursor-pointer ${getSelectedItemClasses(
								option.value,
							)}`}>
							<span className='text-orange-500 mr-2'>{option.icon}</span>
							{option.name}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default SidebarMenu;
