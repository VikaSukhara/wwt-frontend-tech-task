import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { AnimatePresence } from 'framer-motion'

import { useFilterStore } from '../store/filterStore'
import BedTypeFilter from './Filters/BedTypeFilter'
import FacilitiesFilter from './Filters/FacilitiesFilter'
import HealthEntertainmentFilter from './Filters/HealthEntertainmentFilter'
import MealFilter from './Filters/MealFilter'
import RulesPoliciesPaymentFilter from './Filters/RulesPoliciesPaymentFilter'
import Modal from './Modal'
import СonfirmationForm from './СonfirmationForm'

const Filter = ({ onClose }: { onClose: () => void }) => {
	const { t } = useTranslation('modal')
	const draftFilters = useFilterStore(state => state.draftFilters)
	const { resetDraft, applyFilters, resetAllFilters } = useFilterStore()
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

	const hasDraftFilters = Object.values(draftFilters).some(
		arr => arr.length > 0
	)

	const handleApply = () => {
		if (!hasDraftFilters) {
			toast.error(t('noFiltersSelected'), {
				className: 'border border-[#b91c1c] p-[16px] text-[#b91c1c]',
				iconTheme: {
					primary: '#b91c1c',
					secondary: '#FFFAEE'
				}
			})
		} else {
			toast.success(t('successNotification'), {
				className: 'border border-[#FF5F00] p-[16px] text-[#FF5F00]',
				iconTheme: {
					primary: '#FF5F00',
					secondary: '#FFFAEE'
				}
			})
		}

		applyFilters()
		setIsConfirmationOpen(false)
		onClose()
	}

	const handleCancel = () => {
		resetDraft() // скидаємо зміни
		setIsConfirmationOpen(false) // тільки закриває підтвердження
		onClose()
		toast.success(t('successNotification'), {
			className: 'border border-[#FF5F00] p-[16px] text-[#FF5F00]',
			iconTheme: {
				primary: '#FF5F00',
				secondary: '#FFFAEE'
			}
		})
	}

	const initDraftFilters = useFilterStore(state => state.initDraftFilters)

	useEffect(() => {
		initDraftFilters()
	}, [])

	return (
		<div>
			<h3 className="font-medium text-[40px] text-[#31393C] text-center mb-[25px]">
				{t('modalTitle')}
			</h3>
			<div className="flex flex-col gap-[32px]">
				<MealFilter />
				<RulesPoliciesPaymentFilter />
				<FacilitiesFilter />
				<BedTypeFilter />
				<HealthEntertainmentFilter />
				<div className="relative flex items-center justify-between p-4">
					<button
						className="absolute left-1/2 -translate-x-1/2 rounded-[16px] px-[70px] py-[26px] w-[184px] h-[64px] bg-[#FF5F00] font-semibold text-[16px] text-center text-[#FFFFFF] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
						onClick={() => setIsConfirmationOpen(true)}
					>
						{t('modalBtn')}
					</button>
					<button
						className="font-medium text-[16px] underline underline-offset-0 text-center text-primary-100 text-[#078691] flex justify-end underline ml-auto hover:scale-110 transition-transform duration-300 cursor-pointer"
						onClick={() => {
							resetAllFilters(), toast.success(t('clearNotification'))
						}}
					>
						{t('clearBtn')}
					</button>
				</div>
			</div>
			<AnimatePresence>
				{isConfirmationOpen && (
					<Modal
						isOpen={isConfirmationOpen}
						onClose={() => setIsConfirmationOpen(false)}
					>
						<СonfirmationForm
							onApply={handleApply}
							onCancel={handleCancel}
						/>
					</Modal>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Filter
