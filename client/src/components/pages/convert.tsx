import {
	Box,
	IconButton,
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
import ScrollTop from "./ScrollTop";
import Loader from "Loader";

type Float = number & { __float: never };
interface IShoes {
	Brand: string;
	SizeEU: number & Float;
	SizeUS: number & Float;
	SizeUK: number & Float;
	SizeCM: number & Float;
	SizeIN: number & Float;
}

interface ITops {
	Brand: string;
	Size: string;
	ChestCM_min: number & Float;
	ChestCM_max: number & Float;
	WaistCM_min: number & Float;
	WaistCM_max: number & Float;
	HipCM_min: number & Float;
	HipCM_max: number & Float;
	ChestIN_min: number & Float;
	ChestIN_max: number & Float;
	WaistIN_min: number & Float;
	WaistIN_max: number & Float;
	HipIN_min: number & Float;
	HipIN_max: number & Float;
}


const Convert = () => {
	const [isLoading, setIsLoading] = useState(true);
	const translate = useTranslate();
	const [dataMaleShoes, setDataMaleShoes] = useState<IShoes[]>([]);
	const [dataFemaleShoes, setDataFemaleShoes] = useState<IShoes[]>([]);
	const [tableType, setTableType] = useState<string>("Shoes");
	const [showTable, setShowTable] = useState(false);

	const tableHeader_Shoes = [
		"Brand",
		"Size EU",
		"Size US",
		"Size UK",
		"Size CM",
		"Size INCH",
	];
	const tableHeader_Tops = [
		"Brand",
		"Size",
		"Chest",
		"Waist",
		"Hips",
	];
	const tableHeader_Bottom = [
		"Brand",
		"Size",
		"Waist",
		"Hips",
	];
	const tableRef = useRef<HTMLTableElement>(null);

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

	//! SWITCH
	const [genderSwitch, setGenderSwitch] = useState(false)
	const [unit, setUnit] = useState(false)
	const [selectedButton, setSelectedButton] = useState<string>("Shoes");

	const [dataMaleTops, setDataMaleTops] = useState<ITops[]>([]);
	const [dataFemaleTops, setDataFemaleTops] = useState<ITops[]>([]);
	const [dataMaleBottoms, setDataMaleBottoms] = useState<ITops[]>([]);
	const [dataFemaleBottoms, setDataFemaleBottoms] = useState<ITops[]>([]);
	const [dataMaleTopsINCH, setDataMaleTopsINCH] = useState<ITops[]>([]);
	const [dataFemaleTopsINCH, setDataFemaleTopsINCH] = useState<ITops[]>([]);
	const [dataMaleBottomsINCH, setDataMaleBottomsINCH] = useState<ITops[]>([]);
	const [dataFemaleBottomsINCH, setDataFemaleBottomsINCH] = useState<ITops[]>([]);

	const handleButtonClick = async (button: string) => {
		setSelectedButton(button === selectedButton ? selectedButton : button);
		setTableType(button);

		// if (button === "Tops") {
		// 	let resultMale = await axios.get('http://localhost:8080/getTableData_C', {
		// 		params: {
		// 			tableType: tableType,
		// 			gender: true,
		// 			unit: unit
		// 		}
		// 	});
		// 	let resultFemale = await axios.get('http://localhost:8080/getTableData_C', {
		// 		params: {
		// 			tableType: tableType,
		// 			gender: false,
		// 			unit: unit
		// 		}
		// 	});
		// 	let resultMaleINCH = await axios.get('http://localhost:8080/getTableData_C', {
		// 		params: {
		// 			tableType: tableType,
		// 			gender: true,
		// 			unit: false
		// 		}
		// 	});
		// 	let resultFemaleINCH = await axios.get('http://localhost:8080/getTableData_C', {
		// 		params: {
		// 			tableType: tableType,
		// 			gender: false,
		// 			unit: false
		// 		}
		// 	});
		// 	setDataFemaleTopsINCH(resultFemale.data.tableDataCustom);
		// 	setDataMaleTopsINCH(resultMale.data.tableDataCustom);
		// }
		// if (button === "Bottoms") {
		// 	let resultMale = await axios.get('http://localhost:8080/getTableData_C', {
		// 		params: {
		// 			tableType: tableType,
		// 			gender: true,
		// 			unit: unit
		// 		}
		// 	});
		// 	let resultFemale = await axios.get('http://localhost:8080/getTableData_C', {
		// 		params: {
		// 			tableType: tableType,
		// 			gender: false,
		// 			unit: unit
		// 		}
		// 	});
		// 	setDataFemaleBottoms(resultFemale.data.tableDataCustom);
		// 	setDataMaleBottoms(resultMale.data.tableDataCustom);
		// }
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			const resultFemaleShoes = await axios.get('http://localhost:8080/getTableData');
			setDataFemaleShoes(resultFemaleShoes.data.tableDataFemale);

			const resultMaleShoes = await axios.get('http://localhost:8080/getTableDataMale');
			setDataMaleShoes(resultMaleShoes.data.tableDataMale);

			const resultMaleTops = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Tops",
					gender: true,
					unit: false
				}
			});
			setDataMaleTops(resultMaleTops.data.tableDataCustom);
			const resultMaleTopsINCH = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Tops",
					gender: true,
					unit: true
				}
			});
			setDataMaleTopsINCH(resultMaleTopsINCH.data.tableDataCustom);

			const resultFemaleTops = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Tops",
					gender: false,
					unit: false
				}
			});
			setDataFemaleTops(resultFemaleTops.data.tableDataCustom);
			const resultFemaleTopsINCH = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Tops",
					gender: false,
					unit: true
				}
			});
			setDataFemaleTopsINCH(resultFemaleTopsINCH.data.tableDataCustom);

			const resultMaleBottoms = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Bottoms",
					gender: true,
					unit: false
				}
			});
			setDataMaleBottoms(resultMaleBottoms.data.tableDataCustom);
			const resultMaleBottomsINCH = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Bottoms",
					gender: true,
					unit: true
				}
			});
			setDataMaleBottomsINCH(resultMaleBottomsINCH.data.tableDataCustom);

			const resultFemaleBottoms = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Bottoms",
					gender: false,
					unit: false
				}
			});
			setDataFemaleBottoms(resultFemaleBottoms.data.tableDataCustom);
			const resultFemaleBottomsINCH = await axios.get('http://localhost:8080/getTableData_C', {
				params: {
					tableType: "Bottoms",
					gender: false,
					unit: true
				}
			});
			setDataFemaleBottomsINCH(resultFemaleBottomsINCH.data.tableDataCustom);

			setShowTable(true);
		};
		setIsLoading(false);
		fetchData();
	}, []);

	console.log(unit);
	let tableBody;
	let items
	switch (tableType) {
		case 'Tops':
			items = genderSwitch ? dataMaleTops : dataFemaleTops;
			switch (genderSwitch) {
				case true:
					items = unit ? dataMaleTopsINCH : dataMaleTops;
					switch (unit) {
						case true:
							tableBody = items.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.Brand}</TableCell>
									<TableCell>{item.Size}</TableCell>
									<TableCell>{item.ChestIN_min}-{item.ChestIN_max}</TableCell>
									<TableCell>{item.WaistIN_min}-{item.WaistIN_max}</TableCell>
									<TableCell>{item.HipIN_min}-{item.HipIN_max}</TableCell>
								</TableRow>
							))
							break;
						case false:
							tableBody = items.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.Brand}</TableCell>
									<TableCell>{item.Size}</TableCell>
									<TableCell>{item.ChestCM_min}-{item.ChestCM_max}</TableCell>
									<TableCell>{item.WaistCM_min}-{item.WaistCM_max}</TableCell>
									<TableCell>{item.HipCM_min}-{item.HipCM_max}</TableCell>
								</TableRow>
							))
							break;
					}
					break;
				case false:
					items = unit ? dataFemaleTopsINCH : dataFemaleTops;
					switch (unit) {
						case true:
							tableBody = items.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.Brand}</TableCell>
									<TableCell>{item.Size}</TableCell>
									<TableCell>{item.ChestIN_min}-{item.ChestIN_max}</TableCell>
									<TableCell>{item.WaistIN_min}-{item.WaistIN_max}</TableCell>
									<TableCell>{item.HipIN_min}-{item.HipIN_max}</TableCell>
								</TableRow>
							))
							break;
						case false:
							tableBody = items.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.Brand}</TableCell>
									<TableCell>{item.Size}</TableCell>
									<TableCell>{item.ChestCM_min}-{item.ChestCM_max}</TableCell>
									<TableCell>{item.WaistCM_min}-{item.WaistCM_max}</TableCell>
									<TableCell>{item.HipCM_min}-{item.HipCM_max}</TableCell>
								</TableRow>
							))
							break;
					}
					break;
			}
			break;

		case 'Bottoms':
			items = genderSwitch ? dataMaleBottoms : dataFemaleBottoms;
			switch (unit) {
				case true:
					tableBody = items.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{item.Brand}</TableCell>
							<TableCell>{item.Size}</TableCell>
							<TableCell>{item.WaistIN_min}-{item.WaistIN_max}</TableCell>
							<TableCell>{item.HipIN_min}-{item.HipIN_max}</TableCell>
						</TableRow>
					));
					break;
				case false:
					tableBody = items.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{item.Brand}</TableCell>
							<TableCell>{item.Size}</TableCell>
							<TableCell>{item.WaistCM_min}-{item.WaistCM_max}</TableCell>
							<TableCell>{item.HipCM_min}-{item.HipCM_max}</TableCell>
						</TableRow>
					));
			}
			break

		default:
			items = genderSwitch ? dataMaleShoes : dataFemaleShoes;
			tableBody = items.map((item, index) => (
				<TableRow key={index}>
					<TableCell>{item.Brand}</TableCell>
					<TableCell>{item.SizeEU}</TableCell>
					<TableCell>{item.SizeUS}</TableCell>
					<TableCell>{item.SizeUK}</TableCell>
					<TableCell>{item.SizeCM}</TableCell>
					<TableCell>{item.SizeIN}</TableCell>
				</TableRow>
			));

	}

	return (
		<Box className='bg-white rounded-2xl p-2'>
			<ScrollTop />
			<Typography fontSize={28} fontWeight={700} className="mb-5">
				Table Shoes
			</Typography>
			<Box className="flex justify-between">
				<Box className="flex justify-between">
					{tableTypeButton.map((item, index) => (
						<button
							type='button'
							className={`${selectedButton === item.value
								? "bg-primary font-bold text-white rounded-3xl"
								: "bg-gray-200 rounded-3xl font-bold text-black"
								} py-1 px-4 mx-1`}
							onClick={() => handleButtonClick(item.value)}>
							{translate(`pages.Table.Type.${item.text}`, `${item.text}`)}
						</button>
					))}
				</Box>
				{tableType !== "Shoes" ? (
					<Box className="flex justify-around items-center">
						<Typography>CM</Typography>
						<Switch
							checked={unit}
							onChange={setUnit}
							className={`${unit ? 'bg-primary' : 'bg-pink-500'
								} relative inline-flex h-6 w-11 items-center rounded-full duration-300 mx-2`}
						>
							<span
								className={`${unit ? 'translate-x-6' : 'translate-x-1'
									} inline-block h-4 w-4 transform rounded-full bg-white duration-300 transition`}
							/>
						</Switch>
						<Typography>
							INCH
						</Typography>
					</Box>
				) : ""}
				<Box className="flex justify-around items-center">
					<Tooltip title={translate("pages.Inputs.Genders.Female", "Female")} placement="top">
						<IconButton>
							<TbWoman className="w-6 h-auto" />
						</IconButton>
					</Tooltip>
					<Switch
						checked={genderSwitch}
						onChange={setGenderSwitch}
						className={`${genderSwitch ? 'bg-primary' : 'bg-pink-500'
							} relative inline-flex h-6 w-11 items-center rounded-full duration-300 mx-2`}
					>
						<span
							className={`${genderSwitch ? 'translate-x-6' : 'translate-x-1'
								} inline-block h-4 w-4 transform rounded-full bg-white duration-300 transition`}
						/>
					</Switch>
					<Tooltip title={translate("pages.Inputs.Genders.Male", "Male")} placement="top">
						<IconButton>
							<TbMan className="w-6 h-auto" />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
			{isLoading ? <Loader /> : (
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
									{tableType === "Shoes" ?
										tableHeader_Shoes.map((item, index) => (
											<TableCell key={index}>
												{translate(`pages.Table.Headers.${item}`, item)}
											</TableCell>
										)) :
										tableType === "Tops" ? (
											tableHeader_Tops.map((item, index) => (
												<TableCell key={index}>
													{translate(`pages.Table.Headers.${item}`, item)}
												</TableCell>
											))) : (
											tableHeader_Bottom.map((item, index) => (
												<TableCell key={index}>
													{translate(`pages.Table.Headers.${item}`, item)}
												</TableCell>
											)
											)
										)
									}
								</TableRow>
							</TableHead>
							<TableBody>
								{tableBody}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}
		</Box >
	);
};

export default Convert;
