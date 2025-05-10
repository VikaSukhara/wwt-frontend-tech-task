import { useTranslation } from 'react-i18next'

const СonfirmationForm = ({
	onApply,
	onCancel
}: {
	onApply: () => void
	onCancel: () => void
}) => {
	const { t } = useTranslation('confirmationForm')

	return (
		<div className="flex flex-col gap-[120px]">
			<h3 className="font-medium text-[40px] text-[#31393C] text-center mb-[30px]">
				{t('title')}
			</h3>
			<div className="flex gap-[32px] flex-row items-center justify-center">
				<button
					className="border-2 border-[#B4B4B4] rounded-[16px] py-[26px] px-[49px] w-[280px] h-[64px] font-semibold text-[16px] text-[#474747] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
					onClick={onCancel}
				>
					{t('cancelBtn')}
				</button>
				<button
					className="rounded-[16px] py-[26px] px-[70px] w-[280px] h-[64px] bg-[#FF5F00] font-semibold text-[16px] text-[#FFFFFF] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
					onClick={onApply}
				>
					{t('applyBtn')}
				</button>
			</div>
		</div>
	)
}
export default СonfirmationForm
