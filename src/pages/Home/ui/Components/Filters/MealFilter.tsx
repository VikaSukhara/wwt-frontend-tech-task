import FilterRendereComponent from './FilterRenderer'

const MealFilter = () => {
	return (
		<div>
			<div className="w-full h-[2px] bg-gray-500 mb-[64px]"></div>
			<FilterRendereComponent
				filterId="MEAL_OPTIONS"
				filterKey="filterItems.mealOptions"
			/>
		</div>
	)
}

export default MealFilter
