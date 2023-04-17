import {
	Box,
	Button,
	ButtonGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@pankod/refine-mui";
import React, { useRef, useState } from "react";
import clsx from "clsx";
import { useTranslate } from "@pankod/refine-core";

const Convert = () => {
	const translate = useTranslate();
	const [showTable, setShowTable] = useState(true);
	const tableHeader = [
		"Brand",
		"Size EU",
		"Size US",
		"Size UK",
		"Size CM",
		"Size INCH",
	];
	const tableRef = useRef<HTMLTableElement>(null);

	const handleScrollToTable = () => {
		if (tableRef.current) {
			tableRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<Box className='bg-white rounded-2xl p-2'>
			<Typography fontSize={28} fontWeight={700}>
				Table Shoes
			</Typography>
			<ButtonGroup
				className='rounded-xl'
				variant='contained'
				color='info'
				aria-label='outlined primary button group'>
				<button className='bg-primary text-white font-bold px-2 py-1'>
					Shoes Male
				</button>
				<button className='bg-primary text-white font-bold px-2 py-1'>
					Shoes Female
				</button>
				<button className='bg-primary text-white font-bold px-2 py-1'>
					Tops Male
				</button>
				<button className='bg-primary text-white font-bold px-2 py-1'>
					Tops Female
				</button>
			</ButtonGroup>
			<Box
				ref={tableRef}
				className={clsx(
					"mt-2 rounded-2xl border-2 border-primary w-full lg:w-[750px]",
					{
						hidden: !showTable,
						block: showTable,
					}
				)}>
				<TableContainer className='rounded-2xl h-auto'>
					<Table>
						<TableHead>
							<TableRow>
								{tableHeader.map((item, index) => (
									<TableCell key={index}>
										{translate(`pages.Table.Headers.${item}`, item)}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{/* {fetchedShoesSizes.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.Brand}</TableCell>
								<TableCell>{item.SizeEU}</TableCell>
								<TableCell>{item.SizeUS}</TableCell>
								<TableCell>{item.SizeUK}</TableCell>
								<TableCell>{item.SizeCM}</TableCell>
								<TableCell>{item.SizeIN}</TableCell>
							</TableRow>
						))} */}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default Convert;
