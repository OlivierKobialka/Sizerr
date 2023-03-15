import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

import SizerrLong from "../../../assets/SizerrLong.svg";
import SizerrShort from "../../../assets/SizerrShort.svg";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
	const { Link } = useRouterContext();

	return (
		<Button fullWidth variant='text' disableRipple>
			<Link to='/Wear'>
				{collapsed ? (
					<img src={SizerrShort} alt='Sizerr' width='40px' />
				) : (
					<img src={SizerrLong} alt='Sizerr' width='140px' />
				)}
			</Link>
		</Button>
	);
};
