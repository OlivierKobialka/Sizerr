import React, { useContext } from "react";
import {
	// useGetIdentity,
	useGetLocale,
	useSetLocale,
} from "@pankod/refine-core";
import {
	AppBar,
	IconButton,
	Avatar,
	Stack,
	FormControl,
	MenuItem,
	Select,
	Toolbar,
} from "@pankod/refine-mui";
import { TbMoon, TbSun } from "react-icons/tb";

import BlockchainTips from "./blockchainTips";

import { ColorModeContext } from "contexts";
import i18n from "i18n";

export const Header: React.FC = () => {
	const { mode, setMode } = useContext(ColorModeContext);

	const changeLanguage = useSetLocale();
	const locale = useGetLocale();
	const currentLocale = locale();

	// const { data: user } = useGetIdentity();
	// const showUserInfo = user && (user.name || user.avatar);

	return (
		<AppBar color='default' position='sticky' elevation={1}>
			<Toolbar>
				<Stack
					direction='row'
					width='100%'
					justifyContent='flex-end'
					alignItems='center'>
					<BlockchainTips />
					<IconButton
						onClick={() => {
							setMode();
						}}>
						{mode === "dark" ? <TbSun /> : <TbMoon />}
					</IconButton>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<Select
							disableUnderline
							defaultValue={currentLocale}
							inputProps={{ "aria-label": "Without label" }}
							variant='standard'>
							{[...(i18n.languages ?? [])].sort().map((lang: string) => (
								<MenuItem
									selected={currentLocale === lang}
									key={lang}
									defaultValue={lang}
									onClick={() => {
										changeLanguage(lang);
									}}
									value={lang}>
									<Stack
										direction='row'
										alignItems='center'
										justifyContent='center'>
										<Avatar
											sx={{
												width: "16px",
												height: "16px",
												marginRight: "5px",
											}}
											src={`/images/flags/${lang}.svg`}
										/>
										{lang === "en" ? "English" : "Polski"}
									</Stack>
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{/* {showUserInfo && (
						<Stack direction='row' gap='16px' alignItems='center'>
							{user.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
							{user.name && (
								<Typography variant='subtitle2'>{user?.name}</Typography>
							)}
						</Stack>
					)} */}
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
