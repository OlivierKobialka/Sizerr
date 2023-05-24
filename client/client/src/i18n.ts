import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import detector from "i18next-browser-languagedetector";

i18n
	.use(Backend)
	.use(detector)
	.use(initReactI18next)
	.init({
		supportedLngs: ["en", "pl"],
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},
		defaultNS: "common",
		fallbackLng: ["en", "pl"],
	});

export default i18n;
