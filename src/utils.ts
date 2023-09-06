/**
 * Convert unicode to native emoji
 *
 * @param unicode - emoji unicode
 */
export const unicodeToEmoji = (unicode: string) => {
	return unicode
		.split("-")
		.map((hex) => parseInt(hex, 16))
		.map((hex) => String.fromCodePoint(hex))
		.join("");
};

import { useToast, POSITION, TYPE } from "vue-toastification";
import { ToastOptions } from "vue-toastification/dist/types/types";
const toastConfig = {
	position: POSITION.TOP_RIGHT,
	timeout: 2500,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: true,
	hideProgressBar: true,
	closeButton: "button",
	icon: true,
	rtl: false,
} as ToastOptions;
/** Display a toast notification */
export const toast = {
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	message: (message: string) => {
		useToast()(message, toastConfig as ToastOptions);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	success: (message: string) => {
		useToast().success(
			message,
			toastConfig as ToastOptions & { type?: TYPE.SUCCESS | undefined }
		);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	info: (message: string) => {
		useToast().info(
			message,
			toastConfig as ToastOptions & { type?: TYPE.INFO | undefined }
		);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	warn: (message: string) => {
		useToast().warning(
			message,
			toastConfig as ToastOptions & { type?: TYPE.WARNING | undefined }
		);
	},
	/**
	 * Display a toast notification
	 *
	 * @param message The toast message
	 */
	error: (message: string) => {
		useToast().error(
			message,
			toastConfig as ToastOptions & { type?: TYPE.ERROR | undefined }
		);
	},
};

import Lang from "src/assets/lang/en_us.json";
/**
 * Sets the window title with prefix and suffix
 *
 * @param text Object Containing optional Prefix and Suffix
 */
export const setTitle = (text?: { prefix?: string; suffix?: string }) => {
	// title with prefix and/or suffix
	if (text) {
		document.title =
			//prefix
			(text.prefix ? text.prefix + " " : "") +
			// normal
			Lang.window.title +
			// suffix
			(text.suffix ? " | " + text.suffix : "");
	}
	// default title
	else {
		document.title = Lang.window.title;
	}
};
