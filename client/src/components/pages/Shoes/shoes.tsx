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
	Typography,

} from "@pankod/refine-mui";
import React, { useState, useRef } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import axios from "axios";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { useTranslate } from "@pankod/refine-core";
import { Switch } from '@headlessui/react'

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
	const [unit, setUnit] = useState(false)
	console.log(unit);

	const [fetchedShoesSizes, setfetchedShoesSizes] = useState<IShoes[]>([]);
	const translate = useTranslate();

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
	) => {
		event.preventDefault();
		setFormValuesBrand({
			brand: "",
			size: "",
			gender: "",
			measurement: "",
		});
		try {
			const response = await axios.get("http://localhost:8080/api/Shoes-M", {
				params: {
					unit: unit,
					size: FormValuesMeasurements.size,
					gender: FormValuesMeasurements.gender,
				},
			});
			setfetchedShoesSizes(response.data.shoesMeasurement);
			setShowTable(true);
			await axios.post(
				"http://localhost:8080/data/genders/post",
				{
					params: { gender: FormValuesMeasurements.gender }
				}
			);
			console.log(FormValuesMeasurements.gender);
		} catch (error) {
			console.log(`${error}`);
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

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		setFormValuesMeasurements({
			unit: "",
			size: "",
			gender: "",
		});
		event.preventDefault();
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

			// await axios.post(
			// 	"http://localhost:8080/data/genders/post",
			// 	{
			// 		gender: FormValuesBrand.gender,
			// 	}
			// );
		} catch (error) {
			console.log(error);
		}
	};

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
					<Tabs />
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
										{/* <FormControl>
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
										</FormControl> */}
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
										<Box className='mt-10 w-full xl:w-96 md:mt-20 flex justify-between items-center'>
											<button
												onClick={handleScrollToTable}
												type='submit'
												className='findMySize'>
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
										<Box className='w-full flex flex-col place-items-center gap-2'>
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
												className='findMySize'>
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
				</Box>
			</Tab.Group>
		</>
	);
};

export default Shoes;
