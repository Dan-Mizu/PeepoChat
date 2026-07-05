// Shared popover exclusivity: only one popover (dropdown menu or tooltip) may
// be visible at a time, app-wide. Each popover claims the single "active" slot
// when it becomes visible; whichever popover held the slot before sees the
// change and closes itself.

const useActivePopover = () =>
	useState<string | null>('active-popover', () => null);

/**
 * Base primitive: a v-model-compatible open state tied to the shared slot.
 */
export function useExclusivePopover(id: string) {
	const active = useActivePopover();

	// open only while this popover holds the active slot
	const isOpen = computed({
		get: () => active.value === id,
		set: (value: boolean) => {
			if (value) active.value = id;
			else if (active.value === id) active.value = null;
		},
	});

	// true while a different popover is visible
	const isBlocked = computed(
		() => active.value !== null && active.value !== id
	);

	return { isOpen, isBlocked };
}

/**
 * Dropdown menus (sidebar): exclusive open state, plus close when the pointer
 * leaves the trigger/menu — with a short grace period so moving from the
 * trigger across to the menu does not dismiss it.
 */
export function useExclusiveMenu(id: string, closeDelay = 200) {
	const { isOpen, isBlocked } = useExclusivePopover(id);

	let closeTimer: ReturnType<typeof setTimeout> | null = null;
	const cancelClose = () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
	};
	const scheduleClose = () => {
		cancelClose();
		closeTimer = setTimeout(() => {
			isOpen.value = false;
		}, closeDelay);
	};
	onBeforeUnmount(cancelClose);

	return { isOpen, isBlocked, cancelClose, scheduleClose };
}

/**
 * Tooltips: claim the active slot when they actually become visible (after
 * openDelay) so any open menu closes — newest popover wins. While something
 * else holds the slot, the tooltip is suppressed via UTooltip's `prevent`.
 *
 * Exception: if nothing was open when the hover started but a menu opened
 * during the delay (e.g. right-clicking the very button being hovered), the
 * tooltip yields instead of stealing the slot from the menu.
 */
export function useExclusiveTooltip(openDelay = 800) {
	const id = useId();
	const { isOpen, isBlocked } = useExclusivePopover(id);

	let openTimer: ReturnType<typeof setTimeout> | null = null;

	const onMouseEnter = () => {
		if (openTimer) return;
		const blockedAtEnter = isBlocked.value;
		openTimer = setTimeout(() => {
			openTimer = null;
			// a menu opened under the pointer while we waited — let it be
			if (isBlocked.value && !blockedAtEnter) return;
			isOpen.value = true;
		}, openDelay);
	};

	const onMouseLeave = () => {
		if (openTimer) {
			clearTimeout(openTimer);
			openTimer = null;
		}
		isOpen.value = false;
	};

	onBeforeUnmount(() => {
		if (openTimer) clearTimeout(openTimer);
		isOpen.value = false;
	});

	return { isBlocked, onMouseEnter, onMouseLeave, openDelay };
}
