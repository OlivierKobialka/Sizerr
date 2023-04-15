/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Box,
	TextField,
	Radio,
	RadioGroup,
	TableCell,
	TableRow,
	TableHead,
	Table,
	TableContainer,
	TableBody,
	FormControlLabel,
} from "@pankod/refine-mui";
import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import axios from "axios";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { useTranslate } from "@pankod/refine-core";
import Tabs from "../Tabs";

const Top = () => {
	type FormData = {
		unit: string;
		chest?: string;
		hips: string;
		waist: string;
		gender: string;
	};

	type InputType = {
		value: string;
		label: string;
	}[];
	interface IWears {
		brand: string;
		size: string;
		chestMin: string;
		chestMax: string;
		waistMin: string;
		waistMax: string;
		hipsMin: string;
		hipsMax: string;
	}
	const [fetchedTopWear, setFetchedTopWear] = useState<IWears[]>([]);
	const translate = useTranslate();

	//! MEASUREMENTS
	const [FormValuesMeasurements, setFormValuesMeasurements] = useState({
		unit: "",
		chest: "",
		hips: "",
		waist: "",
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
		chest: string,
		hips: string,
		waist: string,
		gender: string
	) => {
		event.preventDefault();
		const formData: FormData = {
			unit: selectedValue,
			chest: FormValuesMeasurements.chest,
			hips: FormValuesMeasurements.hips,
			waist: FormValuesMeasurements.waist,
			gender: FormValuesMeasurements.gender,
		};
		console.log("Tops by Measurements:", formData);
		try {
			const response = await axios.get("http://localhost:8080/api/Tops-M", {
				params: {
					unit: selectedValue,
					chest: FormValuesMeasurements.chest,
					hips: FormValuesMeasurements.hips,
					waist: FormValuesMeasurements.waist,
					gender: FormValuesMeasurements.gender,
				},
			});
			setFetchedTopWear(response.data.topMeasurements);
			console.info("Tops by Measurements:", response.data.topMeasurements);
			setShowTable(true);
		} catch (error) {
			console.log(error);
		}
	};
	const [selectedValue, setSelectedValue] = React.useState("cm");
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};

	const RadioGroupMeasurements: InputType = [
		{ value: "cm", label: "CM" },
		{ value: "in", label: "INCH" },
	];
	const TextFieldMeasurements = [
		{
			label: "Chest",
			name: "chest",
			value: FormValuesMeasurements.chest,
			onChange: handleInputChangeMeasurements,
			className: "w-64 pt-2 md:w-56",
		},
		{
			label: "Hips",
			name: "hips",
			value: FormValuesMeasurements.hips,
			onChange: handleInputChangeMeasurements,
			className: "w-64 md:w-56",
		},
		{
			label: "Waist",
			name: "waist",
			value: FormValuesMeasurements.waist,
			onChange: handleInputChangeMeasurements,
			className: "w-64 md:w-56",
		},
	];

	//! BRAND
	const [FormValuesBrand, setFormValuesBrand] = useState({
		brand: "",
		size: "",
		gender: "",
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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = {
			brand: FormValuesBrand.brand,
			size: FormValuesBrand.size,
			gender: FormValuesBrand.gender,
		};
		console.log("By Brand:", formData);

		try {
			const response = await axios.get("http://localhost:8080/api/Tops-B", {
				params: {
					brand: FormValuesBrand.brand,
					size: FormValuesBrand.size,
					gender: FormValuesBrand.gender,
				},
			});
			setFetchedTopWear(response.data.topBrand);
		} catch (error) {
			console.log(error);
		}
	};

	const Option = [
		{ id: 1, value: "male", text: "Male" },
		{ id: 2, value: "female", text: "Female" },
	];
	const TextFieldBrand = [
		{
			label: "Brand",
			name: "brand",
			value: FormValuesBrand.brand,
			onChange: handleInputChange,
			className: "w-96",
		},
		{
			label: "Size",
			name: "size",
			value: FormValuesBrand.size,
			onChange: handleInputChange,
			className: "w-96",
		},
	];
	//!
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [label, setLabel] = useState<string>("Chest");

	const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const selectedValue = event.target.value;
		setSelectedOption(selectedValue as string);
		if (selectedValue === "men") {
			setLabel("Chest");
		} else if (selectedValue === "women") {
			setLabel("Bust");
		}
	};
	//! TABLE
	const [showTable, setShowTable] = useState(false);
	const tableHeader = ["Brand", "Size", "Chest", "Waist", "Hips"];
	const tableRef = useRef<HTMLTableElement>(null);

	const handleScrollToTable = () => {
		if (tableRef.current) {
			tableRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<Tab.Group>
				<Box className='flex flex-col  xl:mx-[20%]'>
					<Tabs />
					<Tab.Panels className='w-full'>
						<Tab.Panel className='w-full lg:w-[750px] flex flex-col'>
							<form
								// @ts-ignore
								onSubmit={handleSubmitMeasurements}>
								<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
									<Box className='w-full flex flex-col place-items-center md:place-items-start md:justify-between gap-2 md:flex-row'>
										<Box>
											<FormControl>
												<InputLabel>
													{translate("pages.Inputs.Genders.Gender", "Gender")}
												</InputLabel>
												<Select
													required
													className='w-64 md:w-56'
													label={translate(
														"pages.Inputs.Genders.Gender",
														"Gender"
													)}
													name='gender'
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
										<Box className='flex flex-col place-items-center gap-2 md:grid md:grid-cols-2'>
											{TextFieldMeasurements.map((item, index) => (
												<TextField
													required
													key={index}
													label={translate(
														`pages.Inputs.Measurements.${item.label}`,
														`${item.label}`
													)}
													name={item.name}
													value={item.value}
													onChange={handleInputChangeMeasurements}
													className={item.className}
												/>
											))}
										</Box>
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
								</Box>
							</form>
						</Tab.Panel>
						<Tab.Panel>
							<form onSubmit={handleSubmit}>
								<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
									<Box className='w-full flex flex-col place-items-center gap-2'>
										<Box>
											<FormControl>
												<InputLabel>
													{translate("pages.Inputs.Genders.Gender", "Gender")}
												</InputLabel>
												<Select
													required
													className='w-96'
													label={translate(
														"pages.Inputs.Genders.Gender",
														"Gender"
													)}
													name='gender'
													value={FormValuesBrand.gender}
													onChange={handleSelectChange}>
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
										<Box className='flex flex-col place-items-center gap-2'>
											{TextFieldBrand.map((item, index) => (
												<TextField
													required
													key={index}
													label={translate(
														`pages.Input.${item.label}`,
														`${item.label}`
													)}
													name={item.name}
													value={item.value}
													onChange={handleInputChange}
													className={item.className}
												/>
											))}
										</Box>
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
								</Box>
							</form>
						</Tab.Panel>
					</Tab.Panels>
					{/* Table */}
					<Box
						ref={tableRef}
						className={clsx("mt-2 rounded-2xl border-2 border-primary", {
							hidden: !showTable,
							block: showTable,
						})}>
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
									{fetchedTopWear.map((item, index) => (
										<TableRow key={index}>
											<TableCell>{item.brand}</TableCell>
											<TableCell>{item.size}</TableCell>
											<TableCell>
												{item.chestMin}-{item.chestMax}
											</TableCell>
											<TableCell>
												{item.waistMin}-{item.waistMax}
											</TableCell>
											{/* <TableCell></TableCell> */}
											<TableCell>
												{item.hipsMin}-{item.hipsMax}
											</TableCell>
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

export default Top;
