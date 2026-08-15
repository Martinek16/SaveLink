# Changelog

All notable changes to this project are documented in this file. All core functionality is documented in the [README](./README.md), which is updated alongside new releases.

## [1.3.1] – August 2026
### Added
- The sidebar now peeks out at the left edge with a small tab; click anywhere on it to open.

### Changed
- Links now open in their own screen in Settings, just like categories
- The sidebar opens over the top bar and reads as one surface with it, and its list is easier to scan: groups stand out from the categories inside them, long names are shortened instead of pushing the count away, and a long group scrolls on its own.
- Cleaner top bar: the search icon was redrawn and the sidebar button moved to the tab at the edge.
- About was rewritten to explain what SaveLink does, and the privacy page now describes the permissions correctly.
- Category cards have squarer top corners, and the tag, category and link screens follow the same spacing as the rest of Settings.
- Suggestions in the popup now work in every browser: they are built from the links you already saved, and browsers with built-in AI simply refine them further.
- When a save does not go through, the popup now says why instead of showing the same message for every problem.

### Fixed
- The top favorite card no longer shrinks when you close Settings
- Favorited categories no longer move to General by themselves
- You can type a space in a group name in the popup again
- Categories you collapsed stay collapsed when a new link is saved
- The switch for searching web addresses works again
- Saving a page you already saved keeps its original save date


## [1.3.0] – July 2026
### Added
- Custom theme: choose your own colors for the background, text, and buttons to make SaveLink look the way you like.
- Category menu: open the menu on any category to rename it, give it a color, reorder its links, or change how many links it shows.

### Changed
- Tidier Organize page: the header now matches the rest of Settings.
- Adding a category opens the same screen as editing one, so you can set its group and color right away.

### Fixed
- Refreshing the main page no longer makes the cards flicker or jump.


## [1.2.1] – July 2026
### Changed
- Simpler category input in the popup: type a few letters and press Tab to cycle through matches.
- Opening an already-saved page now shows its saved details and Save updates the link.

### Fixed
- Editing a category or group now correctly updates the saved link.
- Empty groups you create are no longer removed automatically.
- Cleaner layout for groups and the categories inside them.


## [1.2.0] – June 2026
### Added
- Smart Assist: when you save a link, it suggests a clean title, category, tags, and a short note for you.
- It learns from your existing categories and tags, so suggestions match how you already organize.
- All of this runs on your device using Chrome's built-in AI. Nothing is sent anywhere.
- New settings to turn each suggestion on or off.

### Note
- Smart Assist only works in Google Chrome, which has the built-in AI it needs. In other browsers the feature is hidden.

### Fixed
- Smaller, tidier cards and a few layout fixes.


## [1.1.0] – December 2025
### Added
- Tags: Assign up to five tags per link, search them, and manage them in Settings
- Favorite categories: Pin a few key categories to the top row with a heart icon
- Middle-click: Middle-click on any link to open it in a new tab without leaving the current page
- Share button: Quickly share links using the share button or copy to clipboard
- Bulk selection: Select multiple links, categories, and groups at once for batch deletion

### Changed
- Faster dragging and dropping of links
- Smoother display of links without flickering

### Fixed
- Fixed display of website icons
- Fixed auto-open feature
- Default "General" category and group are no longer created automatically on startup


## [1.0.1] – November 2025
### Added
- Icon turns green when the current page is already saved

### Changed
- Faster performance and smoother interactions

### Fixed
- Fixed issues with opening the extension window
- Fixed issues with saving, deleting, and reordering categories in Settings
- Fixed dragging and dropping of links
- Fixed link search


## [FIRST RELEASE] – August 2025