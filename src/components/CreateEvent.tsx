import React, { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import GlobalContext from "../context/GlobalContext";

type Props = {};

const CreateEvent = (props: Props) => {
	const { setShowEventModal } = useContext(GlobalContext);
	const handleModal = () => {
		setShowEventModal(true);
	};
	return (
		<button
			className='border py-2 px-4 rounded-full flex items-center shadow-md hover:shadow-xl w-full justify-center mt-6'
			onClick={handleModal}>
			<span className='mr-2 text-xl'>
				<IoAdd />
			</span>
			Create
		</button>
	);
};

export default CreateEvent;
