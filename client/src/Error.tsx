import React, { useEffect, useState } from "react";
import { ResourceErrorRouterParams } from "@pankod/refine-core";
import { RefineErrorPageProps } from "@pankod/refine-ui-types";
import {
	useNavigation,
	useTranslate,
	useResourceWithRoute,
	useRouterContext,
} from "@pankod/refine-core";
import { Stack, Button, Tooltip, Typography, Grid } from "@mui/material";
import { Info } from "@mui/icons-material";

export default Error = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const { push } = useNavigation();
	const translate = useTranslate();
	const actionTypes = ["edit", "create", "show"];

	const { useParams } = useRouterContext();

	const params = useParams<ResourceErrorRouterParams>();
	const resource = useResourceWithRoute();

	useEffect(() => {
		const action = params.action ?? "list";
		const resourceName = params.resource;
		setErrorMessage(
			translate(
				"pages.error.info",
				{
					action,
					resource: resourceName,
				},
				`You may have forgotten to add the "${action}" component to "${resourceName}" resource.`
			)
		);
		if (resourceName) {
			const resourceFromRoute = resource(resourceName);
			if (
				action &&
				actionTypes.includes(action) &&
				!resourceFromRoute[action]
			) {
				setErrorMessage(
					translate(
						"pages.error.info",
						{
							action,
							resource: resourceName,
						},
						`You may have forgotten to add the "${action}" component to "${resourceName}" resource.`
					)
				);
			}
		}
	}, [params]);

	return (
		<Grid display='flex' justifyContent='center' alignItems='center' mt={20}>
			<Grid container direction='column' display='flex' alignItems='center'>
				<p className='font-extrabold text-9xl'>404</p>
				<Stack direction='row' spacing='2'>
					<Typography>
						{translate(
							"pages.error.404",
							"Sorry, the page you visited does not exist."
						)}
					</Typography>

					{errorMessage && (
						<Tooltip title={errorMessage} className="mr-2">
							<Info data-testid='error-component-tooltip' />
						</Tooltip>
					)}
				</Stack>
				<button
					className='bg-primary text-white font-bold px-3 py-1 rounded-lg mt-2'
					onClick={() => push("/")}>
					{translate("pages.error.backHome", "Back Home")}
				</button>
			</Grid>
		</Grid>
	);
};
