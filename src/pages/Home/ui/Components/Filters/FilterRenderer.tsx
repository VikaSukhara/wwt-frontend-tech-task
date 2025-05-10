import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'
import { camelCase } from 'lodash'

import { FilterChooseOption, FilterItem } from '@/shared/api/types/Filter'

import CustomCheckbox from '../CustomCheckBox'

type FilterProps = {
	filterId: string
	filterKey: string
}

type LocalizedOption = Omit<FilterChooseOption, 'id'>

interface LocalizedFilter {
	name: string
	description?: string
	options: Record<string, LocalizedOption> // ключ — це id (наприклад, "breakfast")
}

interface FilterData {
	filterItems: FilterItem[]
}

const fetchFilterData = async (): Promise<FilterData> => {
	const response = await fetch('src/shared/temp/filterData.json')

	if (!response.ok) {
		throw new Error('Failed to fetch filter data')
	}

	return response.json()
}

const FilterRendereComponent = ({ filterId, filterKey }: FilterProps) => {
	const { t: tModal } = useTranslation('modal')

	const { t: tFilter } = useTranslation('filter')

	const {
		data: filterData,
		isLoading,
		isError
	} = useQuery<FilterData>({
		queryKey: ['filters'],
		queryFn: fetchFilterData
	})

	if (isLoading) {
		return <div>{tModal('loading')}</div>
	}

	if (isError) {
		return <div>{tModal('error')}</div>
	}

	if (!filterData || !filterData.filterItems) {
		return <div>{tModal('noFilters')}</div>
	}

	const filterTranslations = tFilter(filterKey, {
		returnObjects: true
	}) as LocalizedFilter

	const filterOptions = filterData.filterItems.find(
		item => item.id === filterId
	) as FilterItem | undefined

	if (!filterOptions) {
		console.warn(`${filterId} not found in filterData`)
		return null
	}

	const renderedOptions: FilterChooseOption[] = filterOptions.options.map(
		option => {
			const translationKey =
				option.id === 'wi-fi' ? 'wifi' : camelCase(option.id)

			const translation = filterTranslations.options?.[translationKey]

			if (!translation) {
				console.warn(`Translation not found for option ID: ${option.id}`)
			}
			return {
				id: option.id,
				name: translation?.name || option.name,
				description: translation?.description || option.description
			}
		}
	)

	return (
		<div>
			<h3 className="font-medium text-2xl text-black-grey-500 mb-6">
				{filterTranslations.name}
			</h3>

			<div className="grid grid-cols-3 gap-4">
				{renderedOptions.map(option => (
					<label
						key={option.id}
						className="flex items-center space-x-2"
					>
						<CustomCheckbox
							filterId={filterId}
							optionId={option.id}
						/>
						<span className="font-normal text-base text-black-grey-500">
							{option.name}
						</span>
					</label>
				))}
			</div>

			<div className="w-full h-[2px] bg-gray-500 mt-[35px]"></div>
		</div>
	)
}

export default FilterRendereComponent
