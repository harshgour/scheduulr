import LabelSelector from "./LabelSelector";
import { AiOutlineSchedule } from "react-icons/ai";
import ColorLoader from "./ColorLoader";
import { IoTrashBinOutline } from "react-icons/io5";
import SidebarMenu from "./SidebarMenu";
import { useDispatch } from "react-redux";
import { resetSavedEvents } from "../reducers/eventSlice";

type Props = {};

const Sidebar = (props: Props) => {
	const dispatch = useDispatch();
	const handleEventsReset = () => {
		dispatch(resetSavedEvents({}));
	};
	return (
		<aside className='hidden sm:flex border-r pt-2 w-max flex-col shadow-md justify-between'>
			<div className='flex flex-col w-max'>
				<ColorLoader />
				<div className='flex items-center justify-center p-5 mb-4 pt-2'>
					<span className='text-xl sm:text-5xl text-orange-300 mr-2'>
						<AiOutlineSchedule />
					</span>
					<h1 className=' text-md sm:text-xl text-gray-500 font-bold'>
						Scheduulr
					</h1>
				</div>
				<SidebarMenu />
				<LabelSelector />
			</div>
			<div
				className='border-t p-6 cursor-pointer flex items-center'
				onClick={handleEventsReset}>
				<span className='mr-3 text-red-600'>
					<IoTrashBinOutline />
				</span>
				Reset Data
			</div>
		</aside>
	);
};

export default Sidebar;
