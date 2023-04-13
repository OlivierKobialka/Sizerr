/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Box,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	TableCell,
	TableRow,
	TableHead,
	Table,
	TableContainer,
	TableBody,
} from "@pankod/refine-mui";
import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import axios from "axios";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { useTranslate } from "@pankod/refine-core";

import Tabs from "../Tabs";

type InputType = {
	value: string;
	label: string;
}[];
interface IShoes {
	Brand: string;
	SizeEU: number & Float;
	SizeUS: number & Float;
	SizeUK: number & Float;
	SizeCM: number & Float;
	SizeIN: number & Float;
}
type Float = number & { __float: never };

const Shoes = () => {
	const [fetchedShoesSizes, setfetchedShoesSizes] = useState<IShoes[]>([]);
	const translate = useTranslate();
	// const [genderCount, setGenderCount] = useState({ male: 0, female: 0 });

	//! MEASUREMENTS
	const [FormValuesMeasurements, setFormValuesMeasurements] = useState({
		unit: "",
		size: "",
		gender: "",
	});

	const handleInputChangeMeasurements: OutlinedInputProps["onChange"] =
		event => {
			const { name, value } = event.target;
			setFormValuesMeasurements({
				...FormValuesMeasurements,
				[name]: value,
			});
		};
	const handleSelectChangeMeasurements: SelectInputProps["onChange"] =
		event => {
			const { name, value } = event.target;
			setFormValuesMeasurements({
				...FormValuesMeasurements,
				[name]: value,
			});
		};

	const handleSubmitMeasurements = async (
		event: React.FormEvent<HTMLFormElement>,
		unit: string,
		size: string,
		gender: string
	) => {
		event.preventDefault();
		// clear brand data from inputs
		setFormValuesBrand({
			brand: "",
			size: "",
			gender: "",
			measurement: "",
		});
		const formData = {
			unit: selectedValue,
			size: FormValuesMeasurements.size,
			gender: FormValuesMeasurements.gender,
		};
		console.log("By Measurements:", formData);

		try {
			const response = await axios.get("http://localhost:8080/api/Shoes-M", {
				params: {
					unit: selectedValue,
					size: FormValuesMeasurements.size,
					gender: FormValuesMeasurements.gender,
				},
			});
			setfetchedShoesSizes(response.data.shoesMeasurement);
			setShowTable(true);

			// axios.post("http://localhost:8080/data/genders/post", {
			// 	gender: FormValuesMeasurements.gender,
			// });
			// setGenderCount(genderPOST.data.genderCount);
		} catch (error) {
			console.log(error);
		}
	};

	const [selectedValue, setSelectedValue] = React.useState("CM");
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};

	const RadioGroupMeasurements: InputType = [
		{ value: "CM", label: "CM" },
		{ value: "IN", label: "INCH" },
	];
	//! BRAND
	const [FormValuesBrand, setFormValuesBrand] = useState({
		brand: "",
		size: "",
		gender: "",
		measurement: "",
	});

	const handleInputChange: OutlinedInputProps["onChange"] = event => {
		const { name, value } = event.target;
		setFormValuesBrand({
			...FormValuesBrand,
			[name]: value,
		});
	};
	const handleSelectChange: SelectInputProps["onChange"] = event => {
		const { name, value } = event.target;
		setFormValuesBrand({
			...FormValuesBrand,
			[name]: value,
		});
	};

	// ? fetching data from database
	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		brand: string,
		size: string,
		gender: string,
		measurement: string
	) => {
		setFormValuesMeasurements({
			unit: "",
			size: "",
			gender: "",
		});
		event.preventDefault();
		const formData = {
			measurement: selectedValueBrand,
			brand: FormValuesBrand.brand,
			size: FormValuesBrand.size,
			gender: FormValuesBrand.gender,
		};

		console.log("By Brand:", formData);
		try {
			const response = await axios.get("http://localhost:8080/api/Shoes-B", {
				params: {
					measurement: selectedValueBrand,
					brand: FormValuesBrand.brand,
					size: FormValuesBrand.size,
					gender: FormValuesBrand.gender,
				},
			});
			setfetchedShoesSizes(response.data.shoesBrand);
			setShowTable(true);

			const genderPOST = await axios.post(
				"http://localhost:8080/data/genders/post",
				{
					gender: FormValuesBrand.gender,
				}
			);
			// setGenderCount(genderPOST.data.genderCount);
		} catch (error) {
			console.log(error);
		}
	};

	// ? radio gender shoesBrand
	const Option = [
		{ id: 1, value: "male", text: "Male" },
		{ id: 2, value: "female", text: "Female" },
	];
	const [selectedValueBrand, setSelectedValueBrand] = React.useState("EU");
	const handleRadioChangeBrand = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSelectedValueBrand(event.target.value);
	};

	const FormControlLabelBrand: InputType = [
		{ value: "EU", label: "EU" },
		{ value: "UK", label: "UK" },
		{ value: "US", label: "US" },
	];

	//! TABLE
	const [showTable, setShowTable] = useState(false);
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
		<>
			<Tab.Group>
				<Box className='flex flex-col  xl:mx-[15%]'>
					{/*  */}
					<Tabs />
					{/*  */}
					<Tab.Panels className='w-full'>
						<Tab.Panel className='w-full lg:w-[750px] flex flex-col'>
							<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
								<Box className='w-full flex flex-col place-items-center gap-2'>
									<form
										// @ts-ignore
										onSubmit={handleSubmitMeasurements}
										className='w-full flex flex-col place-items-center gap-2'>
										<Box className='flex place-items-center justify-center'>
											<FormControl>
												<InputLabel>
													{translate("pages.Inputs.Genders.Gender", "Gender")}
												</InputLabel>
												<Select
													required
													className='w-96'
													name='gender'
													label={translate(
														"pages.Inputs.Genders.Gender",
														"Gender"
													)}
													color='info'
													value={FormValuesMeasurements.gender}
													onChange={handleSelectChangeMeasurements}>
													{Option.map(option => (
														<MenuItem key={option.id} value={option.value}>
															{translate(
																`pages.Inputs.Genders.${option.text}`,
																`${option.text}`
															)}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Box>
										<Box className='flex place-items-center justify-center'></Box>
										<FormControl>
											<RadioGroup
												row
												value={selectedValue}
												onChange={handleRadioChange}
												className='w-96 my-1'>
												{RadioGroupMeasurements.map((item, index) => (
													<FormControlLabel
														key={index}
														value={item.value}
														control={<Radio color='info' />}
														label={item.label}
													/>
												))}
											</RadioGroup>
										</FormControl>
										<TextField
											className='w-96'
											type='number'
											name='size'
											color='info'
											label={translate("pages.Inputs.Size", "Size")}
											value={FormValuesMeasurements.size}
											onChange={handleInputChangeMeasurements}
											required
										/>
										<Box className='mt-10 w-full xl:w-96 md:mt-20 flex justify-between items-center'>
											<button
												onClick={handleScrollToTable}
												type='submit'
												className='w-full bg-primary font-bold text-white bold rounded-xl  hover:bg-[#1e36e8] duration-200 ease-out py-2'>
												{translate(
													"pages.ShoesWear.buttons.FindMySize",
													"Find my Size"
												)}
											</button>
										</Box>
									</form>
								</Box>
							</Box>
						</Tab.Panel>
						<Tab.Panel className='w-full lg:w-[750px] flex flex-col'>
							<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
								<Box className='w-full flex flex-col place-items-center gap-2'>
									<form
										// @ts-ignore
										onSubmit={handleSubmit}>
										<Box className='flex flex-col place-items-center justify-center'>
											<FormControl>
												<InputLabel>
													{translate("pages.Inputs.Genders.Gender", "Gender")}
												</InputLabel>
												<Select
													className='w-96 mb-3'
													name='gender'
													label={translate(
														"pages.Inputs.Genders.Gender",
														"Gender"
													)}
													color='info'
													required
													value={FormValuesBrand.gender}
													onChange={handleSelectChange}>
													{Option.map(option => (
														<MenuItem key={option.value} value={option.value}>
															{translate(
																`pages.Inputs.Genders.${option.text}`,
																`${option.text}`
															)}
														</MenuItem>
													))}
												</Select>
											</FormControl>
											<Box className='mb-3'>
												<TextField
													className='w-96 '
													type='text'
													name='brand'
													label={translate("pages.Inputs.Brand", "Brand")}
													color='info'
													value={FormValuesBrand.brand}
													onChange={handleInputChange}
													required
												/>
											</Box>
											<TextField
												className='w-96'
												type='number'
												name='size'
												label={translate("pages.Inputs.Size", "Size")}
												color='info'
												value={FormValuesBrand.size}
												onChange={handleInputChange}
												required
											/>
											<FormControl>
												<RadioGroup
													row
													value={selectedValueBrand}
													onChange={handleRadioChangeBrand}
													className='w-96 my-1'>
													{FormControlLabelBrand.map((item, index) => (
														<FormControlLabel
															key={index}
															value={item.value}
															control={<Radio color='info' />}
															label={item.label}
														/>
													))}
												</RadioGroup>
											</FormControl>
										</Box>
										<Box className='mt-10 w-full xl:w-96 md:mt-20 flex justify-between items-center'>
											<button
												onClick={handleScrollToTable}
												type='submit'
												className='w-full bg-primary font-bold text-white bold rounded-xl  hover:bg-[#1e36e8] duration-200 ease-out py-2'>
												{translate(
													"pages.ShoesWear.buttons.FindMySize",
													"Find my Size"
												)}
											</button>
										</Box>
									</form>
								</Box>
							</Box>
						</Tab.Panel>
					</Tab.Panels>
					{/* Table */}
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
									{fetchedShoesSizes.map((item, index) => (
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
					{/* Table */}
				</Box>
			</Tab.Group>
		</>
	);
};

export default Shoes;
