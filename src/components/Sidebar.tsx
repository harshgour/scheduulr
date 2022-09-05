import LabelSelector from "./LabelSelector";
import { AiOutlineSchedule } from "react-icons/ai";
import ColorLoader from "./ColorLoader";

type Props = {};

const Sidebar = (props: Props) => {
	return (
		<aside className='hidden sm:flex border-r p-5 pt-2 w-max flex-col shadow-md'>
			<ColorLoader />
			<div className='flex items-center justify-center'>
				<span className='text-xl sm:text-5xl text-orange-300 mr-2'>
					<AiOutlineSchedule />
				</span>
				<h1 className=' text-md sm:text-xl text-gray-500 font-bold'>
					Scheduulr
				</h1>
			</div>
			<LabelSelector />
		</aside>
	);
};

export default Sidebar;
