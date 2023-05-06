import { Box } from "@pankod/refine-mui";

import Charts from "./charts";
import Form from "./form";

export default function Analitycs() {
	return (
		<Box className='flex-col-reverse xl:flex-row flex xl:gap-x-4 gap-y-4'>
			<Charts />
			<Form />
		</Box>
	);
};
