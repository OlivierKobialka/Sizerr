/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Box,
	Button,
	ButtonGroup,
	FormControlLabel,
	IconButton,
	// Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from "@pankod/refine-mui";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { useTranslate } from "@pankod/refine-core";
import { Switch } from '@headlessui/react';
import { TbMan, TbWoman } from "react-icons/tb";

interface IProps {
	Brand: string;
	SizeEU: number & Float;
	SizeUS: number & Float;
	SizeUK: number & Float;
	SizeCM: number & Float;
	SizeIN: number & Float;
}
type Float = number & { __float: never };


const Convert = () => {
	const translate = useTranslate();
	const [data, setData] = useState<IProps[]>([]);
	const [showTable, setShowTable] = useState(false);
	// const []

	const tableHeader_Shoes = [
		"Brand",
		"Size EU",
		"Size US",
		"Size UK",
		"Size CM",
		"Size INCH",
	];
	const tableHeader_Wear = [
		"Brand",
		"Size",
		"Chest",
		"Hips",
		"Waist",
	];
	const tableRef = useRef<HTMLTableElement>(null);

	// const handleScrollToTable = () => {
	// 	if (tableRef.current) {
	// 		tableRef.current.scrollIntoView({ behavior: "smooth" });
	// 	}
	// };

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('http://localhost:8080/getTableData');
			setData(result.data.tableData);
			setShowTable(true);
			// handleScrollToTable();
		};
		fetchData();
	}, []);
	const tableTypeButton = [
		{
			text: "Shoes",
			value: "Shoes",
		},
		{
			text: "Tops",
			value: "Tops",
		},
		{
			text: "Bottoms",
			value: "Bottoms",
		},
	]


	const [enabled, setEnabled] = useState(false)

	return (
		<Box className='bg-white rounded-2xl p-2'>
			<Typography fontSize={28} fontWeight={700}>
				Table Shoes
			</Typography>
			<Box className="flex justify-between">
				<ButtonGroup
					className='rounded-xl'
					variant='contained'
					color='info'
					aria-label='outlined primary button group'>
					{tableTypeButton.map((item, index) => (
						<button className="bg-primary text-white px-2 py-1 font-bold" value={item.value} key={index}>{item.text}</button>
					))}
				</ButtonGroup>
				<Box className="flex justify-around items-center">
					<Tooltip title="Female" placement="top">
						<IconButton>
							<TbWoman className="w-6 h-auto" />
						</IconButton>
					</Tooltip>
					<Switch
						checked={enabled}
						onChange={setEnabled}
						className={`${enabled ? 'bg-primary' : 'bg-pink-500'
							} relative inline-flex h-6 w-11 items-center rounded-full duration-300 mx-2`}
					>
						<span
							className={`${enabled ? 'translate-x-6' : 'translate-x-1'
								} inline-block h-4 w-4 transform rounded-full bg-white duration-300 transition`}
						/>
					</Switch>
					<Tooltip title="Male" placement="top">
						<IconButton>
							<TbMan className="w-6 h-auto" />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
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
								{tableHeader_Shoes.map((item, index) => (
									<TableCell key={index}>
										{translate(`pages.Table.Headers.${item}`, item)}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.Brand}</TableCell>
									<TableCell>{item.SizeEU}</TableCell>
									<TableCell>{item.SizeUS}</TableCell>
									<TableCell>{item.SizeUK}</TableCell>
									<TableCell>{item.SizeCM}</TableCell>
									<TableCell>{item.SizeIN}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box >
	);
};

export default Convert;
