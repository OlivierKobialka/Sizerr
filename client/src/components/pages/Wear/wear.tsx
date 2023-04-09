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

import Tabs from "../Tabs";

type FormData = {
	unit: string;
	chest?: string;
	bust?: string;
	hips: string;
	inseam: string;
	waist: string;
	gender: string;
};

type InputType = {
	value: string;
	label: string;
}[];

const Wear = () => {
	interface IWears {
		brand: string;
		sizeEU: number & Float;
		sizeUS: number & Float;
		sizeUK: number & Float;
		sizeCM: number & Float;
		sizeIN: number & Float;
	}
	type Float = number & { __float: never };
	const [fetchedWearSizes, setfetchedWearSizes] = useState<IWears[]>([]);

	//! MEASUREMENTS
	const [FormValuesMeasurements, setFormValuesMeasurements] = useState({
		unit: "",
		chest: "",
		bust: "",
		hips: "",
		inseam: "",
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

	const handleSubmitMeasurements = (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		const formData: FormData = {
			unit: selectedValue,
			chest: FormValuesMeasurements.chest,
			bust: FormValuesMeasurements.bust,
			hips: FormValuesMeasurements.hips,
			inseam: FormValuesMeasurements.inseam,
			waist: FormValuesMeasurements.waist,
			gender: FormValuesMeasurements.gender,
		};
		console.log("By Measurements:", formData);

		setShowTable(true);
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
			label: "Chest" || "Bust",
			name: "chest" || "bust",
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
			label: "Inseam",
			name: "inseam",
			value: FormValuesMeasurements.inseam,
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = {
			brand: FormValuesBrand.brand,
			size: FormValuesBrand.size,
			gender: FormValuesBrand.gender,
		};
		console.log("By Brand:", formData);

		setShowTable(true);
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
			value: FormValuesBrand.brand,
			onChange: handleInputChange,
			className: "w-96",
		},
	];
	//!
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [label, setLabel] = useState<string>("Chest");
	const [value, setValue] = React.useState(0);

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
				<Box className='flex flex-col  xl:mx-[20%]'>
					<Tabs />
					<Tab.Panels className='w-full'>
						<Tab.Panel className='w-full lg:w-[750px] flex flex-col'>
							<form onSubmit={handleSubmitMeasurements}>
								<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
									<Box className='w-full flex flex-col place-items-center md:place-items-start md:justify-between gap-2 md:flex-row'>
										<Box>
											<FormControl>
												<InputLabel>Gender</InputLabel>
												<Select
													required
													className='w-64 md:w-56'
													label='Gender'
													name='gender'
													value={FormValuesMeasurements.gender}
													onChange={handleSelectChangeMeasurements}>
													{Option.map(option => (
														<MenuItem key={option.id} value={option.value}>
															{option.text}
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
													label={item.label}
													name={item.name}
													value={item.value}
													onChange={handleInputChangeMeasurements}
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
											Find my Size
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
												<InputLabel>Gender</InputLabel>
												<Select
													required
													className='w-96'
													label={handleOptionChange}
													name='gender'
													value={FormValuesBrand.gender}
													onChange={handleSelectChange}>
													{Option.map(option => (
														<MenuItem key={option.id} value={option.value}>
															{option.text}
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
													label={item.label}
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
											Find my Size
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
											<TableCell key={index}>{item}</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{fetchedWearSizes.map((item, index) => (
										<TableRow key={index}>
											<TableCell>{item.brand}</TableCell>
											<TableCell>{item.sizeEU}</TableCell>
											<TableCell>{item.sizeUS}</TableCell>
											<TableCell>{item.sizeUK}</TableCell>
											<TableCell>{item.sizeCM}</TableCell>
											<TableCell>{item.sizeIN}</TableCell>
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

export default Wear;