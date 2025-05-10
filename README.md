# WinWinTravel

A filter modal window was implemented based on the provided filterData.json and Figma design. Code is fully typed with TypeScript.

The modal opens via a button on the homepage.
If the user has previously selected filter options, they are pre-filled in the modal.

When clicking the Apply button a confirmation modal window appears.
If the user confirms — the new selections are saved to the global state (using Zustand). If the user cancels — the previous values remain unchanged. Selected filter data is displayed on the homepage in JSON.

i18n is used for localization. System messages (loading, error, etc.) are stored in modal.json/homepage.json/confirmationForm.json, filter translations in filter.json.

A GitHub Action is included for automatic code validation.

Technologies Used

- Git
- Semantic HTML layout
- React
- react-query
- tailwindcss
- i18n
- zustand

Additionally used:

- framer-motion — for smooth modal and confirmation windows animations.

- react-hot-toast — for displaying confirmation or error messages when the user applies filters

- lodash — used to convert option IDs to camelCase (e.g., 'pets-allowed' → 'petsAllowed') for matching translation keys.
