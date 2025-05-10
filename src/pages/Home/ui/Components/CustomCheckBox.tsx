import React, { useEffect, useState } from 'react'

import { useFilterStore } from '../store/filterStore'

type CustomCheckboxProps = {
	filterId: string
	optionId: string
}
const CustomCheckboxComponent: React.FC<CustomCheckboxProps> = ({
	filterId,
	optionId
}) => {
	const [isChecked, setIsChecked] = useState(false)

	const draftFilters = useFilterStore(state => state.draftFilters)
	const updateDraftFilter = useFilterStore(state => state.updateDraftFilter)

	useEffect(() => {
		const isSelected = draftFilters[filterId]?.includes(optionId) || false
		if (isChecked !== isSelected) {
			setIsChecked(isSelected)
		}
	}, [draftFilters, filterId, optionId, isChecked])

	const handleChange = () => {
		const currentValues = draftFilters[filterId] || []
		const updatedValues = isChecked
			? currentValues.filter(id => id !== optionId)
			: [...currentValues, optionId]

		updateDraftFilter(filterId, updatedValues)

		setIsChecked(!isChecked)
	}

	return (
		<div className="mr-[16px]">
			<input
				type="checkbox"
				className="hidden"
				checked={isChecked}
				onChange={handleChange}
			/>
			<span className="w-[24px] h-[24px] flex items-center justify-center border-2 border-[#31393c] rounded-[4px] cursor-pointer transition-all duration-300 ease-in-out hover:border-black">
				{isChecked ? (
					<svg
						className="w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#31393c"
						strokeWidth="5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#31393c"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4 visible"
					/>
				)}
			</span>
		</div>
	)
}

const CustomCheckbox = React.memo(CustomCheckboxComponent)
CustomCheckbox.displayName = 'CustomCheckbox'

export default CustomCheckbox
