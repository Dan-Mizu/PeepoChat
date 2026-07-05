# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   7TV emote support in Twitch chat, covering both global and per-channel emote sets (user emotes override globals on name conflicts)
-   Backend endpoints to fetch 7TV global emotes and per-Twitch-user emotes
-   Zero-width (overlay) emote support, including multiple stacked overlays and a Chatterino-style tooltip that lists every emote in a stack

### Changed

-   Chat parser now supports multiple emote providers, with Twitch emotes taking priority over 7TV on name conflicts

### Fixed

-   Only one popover is visible at a time — opening a sidebar menu closes any other menu, showing a tooltip closes open menus, and menus close when the mouse leaves them
-   Word spacing and line wrapping no longer break in messages that contain emotes
-   Emotes now load directly from their CDN instead of through the image proxy, fixing missing/delayed emote images and console errors during heavy chat

## [0.0.2] - 2025-12-27

### Added

-   Channel management system with persistent storage
-   Add Channel modal for searching and adding Twitch channels via API
-   Channel removal functionality in channel dropdown menu
-   Channel pin/unpin functionality to keep favorite channels at the top
-   Dynamic channel list rendering from store in sidebar with pinned channels sorted first
-   Environment variables configuration for Twitch API credentials

### Changed

-   Channel navigation now forces full page reload for proper state reset
-   Twitch API credentials moved from hardcoded values to environment variables (NUXT_TWITCH_APP_CLIENT_ID, NUXT_TWITCH_APP_CLIENT_SECRET)

## [0.0.1] - 2024-04-08

### Added

-   index route; "No Channel Selected" view.
-   mentions route; "No Mentions" view.
-   `/channel/twitch/<channel name>` route.
-   collapsible sidebar.
-   nuxt ui theme standards.
-   dark mode theme toggle.
-   pinia storage.
-   i18n translation.
-   catch-all route to index view.
