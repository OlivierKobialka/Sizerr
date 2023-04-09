import { Box } from "@pankod/refine-mui";
import classNames from "classnames";
import { Tab } from "@headlessui/react";

const Tabs = () => {
	return (
		<Box className='container flex rounded-2xl flex-col items-center pt-3 h-auto xs:w-[400px] xs:place-items-center'>
			<Tab.List className='bg-primary mb-2 px-3 py-2 flex justify-between  rounded-xl w-full gap-3'>
				<Tab
					className={({ selected }) =>
						classNames(
							"w-full rounded-lg py-2.5 text-sm bold leading-5 text-primary",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
							selected
								? "bg-white shadow font-bold "
								: " hover:bg-white/[0.12] text-[#FCFCFC] hover:text-white"
						)
					}>
					By Measurments
				</Tab>
				<Tab
					className={({ selected }) =>
						classNames(
							"w-full rounded-lg py-2.5 text-sm bold leading-5 text-primary",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
							selected
								? "bg-white shadow font-bold"
								: " hover:bg-white/[0.12] text-[#FCFCFC] hover:text-white"
						)
					}>
					By Brand
				</Tab>
			</Tab.List>
		</Box>
	);
};

export default Tabs;
