import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectLabels, setLabels } from "../reducers/restSlice";
import { LabelType } from "../types";

type Props = {};

const LabelSelector = (props: Props) => {
	const labels = useSelector(selectLabels);
	const dispatch = useDispatch();

	return (
		<div className='border-t mt-6'>
			{labels.length > 0 && (
				<>
					<p className='text-gray-500 font-bold mt-6'>Labels</p>
					{labels.map((lbl: LabelType, idx: number) => {
						return (
							<label key={idx} className='block mt-3 items-center'>
								<input
									type='checkbox'
									checked={lbl.checked}
									className={`form-checkbox h-5 w-5 rounded focus:ring-0 cursor-pointer`}
									style={{ color: lbl.label }}
									onChange={(e) =>
										dispatch(
											setLabels(
												labels.map((label: LabelType) =>
													label.label === lbl.label
														? { ...label, checked: !lbl.checked }
														: label,
												),
											),
										)
									}
								/>
								<span className='ml-2 text-gray-700 capitalize'>
									{lbl.label}
								</span>
							</label>
						);
					})}
				</>
			)}
		</div>
	);
};

export default LabelSelector;
