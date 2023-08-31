<script setup lang="ts">
const props = defineProps<{
	variant?: string;
	noColor?: boolean;
	class?: any;
	customStyle?: string;
}>();
</script>

<template>
	<p
		:class="[
			props.variant && props.variant.includes('heading')
				? props.variant === 'heading-1'
					? props.noColor
						? 'text-xl leading-4 tracking-[0.16px]'
						: 'text-light-text dark:text-dark-text text-xl leading-4 tracking-[0.16px]'
					: props.variant === 'heading-2'
					? props.noColor
						? 'outline-none text-sm font-semibold leading-4 tracking-[0.16px]'
						: 'outline-none text-sm text-light-text dark:text-dark-text font-semibold leading-4 tracking-[0.16px]'
					: props.variant === 'heading-3'
					? props.noColor
						? 'outline-none text-xs font-semibold leading-4 tracking-[0.16px]'
						: 'outline-none text-xs text-light-text opacity-50 dark:text-dark-text font-semibold leading-4 tracking-[0.16px]'
					: props.variant === 'heading-4'
					? props.noColor
						? 'outline-none text-3xl leading-9 tracking-[0.16px]'
						: 'outline-none text-3xl text-light-text opacity-50 dark:text-dark-text leading-9 tracking-[0.16px]'
					: ''
				: props.variant && props.variant.includes('body')
				? props.variant === 'body-1'
					? props.noColor
						? 'outline-none text-xs font-light leading-4 tracking-[0.16px]'
						: 'outline-none text-xs text-light-text dark:text-dark-text font-light leading-4 tracking-[0.16px]'
					: props.variant === 'body-2'
					? props.noColor
						? 'outline-none text-sm font-normal leading-4 tracking-[0.16px]'
						: 'outline-none text-sm text-light-text dark:text-dark-text font-normal leading-4 tracking-[0.16px]'
					: props.variant === 'body-3'
					? props.noColor
						? 'outline-none text-sm font-light leading-5 tracking-[0.16px]'
						: 'outline-none text-sm font-light text-light-text dark:text-dark-text leading-5 tracking-[0.16px]'
					: props.variant === 'body-4'
					? props.noColor
						? 'outline-none text-xs font-light leading-4 tracking-[0.16px]'
						: 'outline-none text-xs font-light text-light-text dark:text-dark-text leading-4 tracking-[0.16px]'
					: props.variant === 'body-5'
					? props.noColor
						? 'outline-none text-[16px] font-light leading-4 tracking-[0.16px]'
						: 'outline-none text-[16px] font-light text-light-text dark:text-dark-text leading-4 tracking-[0.16px]'
					: ''
				: props.variant && props.variant === 'display'
				? props.noColor
					? 'outline-none font-display text-[28px] leading-[34px] tracking-[0px]'
					: 'outline-none font-display text-[28px] text-light-text dark:text-dark-text leading-[34px] tracking-[0px]'
				: props.variant && props.variant?.includes('button')
				? props.variant === 'button-1'
					? props.noColor
						? 'text-sm font-semibold leading-4 tracking-[0.16px]'
						: 'text-sm font-semibold text-white leading-4 tracking-[0.16px]'
					: props.variant === 'button-2'
					? props.noColor
						? 'text-sm leading-4 tracking-[0.16px] font-semibold'
						: 'text-sm leading-4 tracking-[0.16px] font-semibold group-hover:text-white group-hover:opacity-100 group-focus:text-white group-focus:opacity-100 dark:text-dark-text dark:opacity-70'
					: props.variant === 'button-3'
					? props.noColor
						? 'text-sm leading-4 tracking-[0.16px]'
						: 'text-sm leading-4 tracking-[0.16px] text-light-text dark:text-dark-text dark:opacity-70'
					: props.variant === 'button-4'
					? props.noColor
						? 'text-sm leading-4 tracking-[0.16px]'
						: 'text-sm leading-4 tracking-[0.16px] text-red-400 dark:group-hover:text-white'
					: ''
				: props.noColor
				? 'outline-none text-xs font-light leading-4 tracking-[0.16px]'
				: 'outline-none text-xs text-light-text dark:text-dark-text font-light leading-4 tracking-[0.16px]',
			props.customStyle,
			props.class,
		]"
	>
		<slot></slot>
	</p>
</template>
