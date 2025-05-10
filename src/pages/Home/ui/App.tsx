import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { AnimatePresence } from 'framer-motion'

import { FilterType } from '@/shared/api/types/Filter'
import {
	SearchRequestFilter,
	SearchRequestOptions
} from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import Filter from './Components/Filter'
import Modal from './Components/Modal'
import { useFilterStore } from './store/filterStore'

export const App = () => {
	const { t } = useTranslation('homepage')
	const selectedFilters = useFilterStore(state => state.selectedFilters)

	const hasActiveFilters = Object.values(selectedFilters).some(
		arr => arr.length > 0
	)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen)
	}

	const mappedFilters: SearchRequestFilter = Object.entries(selectedFilters)
		.filter(([, options]) => options.length > 0)
		.map(
			([id, optionsIds]): SearchRequestOptions => ({
				id,
				type: FilterType.OPTION,
				optionsIds
			})
		)

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center gap-4">
			<h1 className="text-6xl text-gray-600 mb-[50px]">{t('title')}</h1>
			<div className="flex flex-col items-start justify-center gap-5 w-[700px]">
				{' '}
				<div className="flex flex-row gap-5 items-center justify-center">
					{' '}
					<h3 className="text-4xl text-black">{t('buttonText')}</h3>
					<button
						className="bg-orange-500 text-white p-2 rounded hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
						onClick={toggleModal}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="34"
							height="34"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line
								x1="21"
								x2="14"
								y1="4"
								y2="4"
							/>
							<line
								x1="10"
								x2="3"
								y1="4"
								y2="4"
							/>
							<line
								x1="21"
								x2="12"
								y1="12"
								y2="12"
							/>
							<line
								x1="8"
								x2="3"
								y1="12"
								y2="12"
							/>
							<line
								x1="21"
								x2="16"
								y1="20"
								y2="20"
							/>
							<line
								x1="12"
								x2="3"
								y1="20"
								y2="20"
							/>
							<line
								x1="14"
								x2="14"
								y1="2"
								y2="6"
							/>
							<line
								x1="8"
								x2="8"
								y1="10"
								y2="14"
							/>
							<line
								x1="16"
								x2="16"
								y1="18"
								y2="22"
							/>
						</svg>
					</button>
				</div>
				{hasActiveFilters ? (
					<div className="flex flex-wrap gap-2 max-w-[600px]">
						<p className="text-4xl text-black">{t('paragraphWithFilters')}</p>
						{Object.entries(selectedFilters).map(([category, values]) =>
							values.map(value => (
								<span
									key={`${category}-${value}`}
									className="bg-gray-200 px-3 py-1 rounded text-sm text-gray-700 flex items-center align-center gap-2"
								>
									{value}
								</span>
							))
						)}
						<pre className="mt-8 p-4 bg-gray-100 rounded w-[700px] text-left text-sm text-gray-800 overflow-auto">
							{JSON.stringify(mappedFilters, null, 2)}
						</pre>
					</div>
				) : (
					<p className="text-4xl text-black">{t('paragraphWithoutFilters')}</p>
				)}
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<Modal
						isOpen={isModalOpen}
						onClose={toggleModal}
					>
						<div>
							<Filter onClose={toggleModal} />
						</div>
					</Modal>
				)}
			</AnimatePresence>
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
		</section>
	)
}
