import "globals.css";
import { Refine } from "@pankod/refine-core";
import {
	notificationProvider,
	RefineSnackbarProvider,
	CssBaseline,
	GlobalStyles,
	ReadyPage,
} from "@pankod/refine-mui";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { OffLayoutArea } from "components/offLayoutArea";
//! pages
import { Top, Bottom, Shoes, Convert, DataReview } from "components/pages";
import Error from "./Error";

import { TbShirt, TbShoe, TbTable, TbStar } from "react-icons/tb";

function App() {
	const { t, i18n } = useTranslation();

	const i18nProvider = {
		translate: (key: string, params: object) => t(key, params),
		changeLocale: (lang: string) => i18n.changeLanguage(lang),
		getLocale: () => i18n.language,
	};

	return (
		<ColorModeContextProvider>
			<CssBaseline />
			<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
			<RefineSnackbarProvider>
				<RefineKbarProvider>
					<Refine
						dataProvider={dataProvider("http://localhost:8080/api/v1")}
						notificationProvider={notificationProvider}
						ReadyPage={ReadyPage}
						catchAll={<Error />}
						resources={[
							{
								name: "Top",
								list: Top,
								show: Top,
								icon: <TbShirt />,
							},
							{
								name: "Bottom",
								list: Bottom,
								show: Bottom,
								icon: <TbShirt />,
							},
							{
								name: "Shoes",
								list: Shoes,
								show: Shoes,
								icon: <TbShoe />,
							},
							{
								name: "Converter",
								list: Convert,
								show: Convert,
								icon: <TbTable />,
							},
							{
								name: "Opinion",
								list: DataReview,
								show: DataReview,
								icon: <TbStar />,
							},
						]}
						Title={Title}
						Sider={Sider}
						Layout={Layout}
						Header={Header}
						routerProvider={routerProvider}
						i18nProvider={i18nProvider}
						OffLayoutArea={OffLayoutArea}
					/>
				</RefineKbarProvider>
			</RefineSnackbarProvider>
		</ColorModeContextProvider>
	);
}

console.log("   ______   ______  ________  ________  _______   _______  ");
console.log("  /       /      |/        |/        |/        /         / ");
console.log(" /$$$$$$  |$$$$$$/ $$$$$$$$/ $$$$$$$$/ $$$$$$$  |$$$$$$$  |");
console.log(" $$ __$$/   $$ |      /$$/  $$ |__    $$ |__$$ |$$ |__$$ | ");
console.log(" $$         $$ |     /$$/   $$    |   $$    $$< $$    $$<  ");
console.log("  $$$$$$ |  $$ |    /$$/    $$$$$/    $$$$$$$  |$$$$$$$  |");
console.log(" /  __$$ | _$$ |_  /$$/____ $$ |_____ $$ |  $$ |$$ |  $$ | ");
console.log("$$    $$/ / $$   |/$$      |$$       |$$ |  $$ |$$ |  $$ |");
console.log("  $$$$$$/  $$$$$$/ $$$$$$$$/ $$$$$$$$/$$/   $$/ $$/   $$/ ");

export default App;
