import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { SearchRequestOptions } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

export type FilterValue = string[]

export type FilterMap = Record<string, FilterValue>
export type SearchRequestFilterMap = Record<string, SearchRequestOptions>

interface FilterStore {
	selectedFilters: FilterMap
	draftFilters: FilterMap
	initDraftFilters: () => void
	updateDraftFilter: (filterId: string, value: FilterValue) => void
	applyFilters: () => void
	resetDraft: () => void
	resetAllFilters: () => void
}

export const useFilterStore = create<FilterStore>()(
	persist(
		(set, get) => ({
			selectedFilters: {},
			draftFilters: {},

			initDraftFilters: () => {
				const selected = get().selectedFilters
				set({ draftFilters: { ...selected } })
			},

			updateDraftFilter: (filterId, value) => {
				const draft = get().draftFilters

				set({
					draftFilters: {
						...draft,
						[filterId]: value
					}
				})
			},

			applyFilters: () => {
				const draft = get().draftFilters

				set({ selectedFilters: { ...draft } })
			},

			resetDraft: () => {
				const selected = get().selectedFilters

				set({ draftFilters: { ...selected } })
			},
			resetAllFilters: () => {
				set({ draftFilters: {} })
			}
		}),
		{
			name: 'filter-storage' // key for local storage
		}
	)
)
