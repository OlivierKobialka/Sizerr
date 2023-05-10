import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Box,
	TextField,
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
import Tabs from "../Tabs";
import { Switch } from '@headlessui/react';

const Top=() =>{

	interface IWears {
		Brand: string;
		Size: string;
		ChestCM_min: string;
		ChestCM_max: string;
		ChestIN_min: string;
		ChestIN_max: string;
		WaistCM_min: string;
		WaistCM_max: string;
		WaistIN_min: string;
		WaistIN_max: string;
		HipCM_min: string;
		HipCM_max: string;
		HipIN_min: string;
		HipIN_max: string;
	}
	const [fetchedTopWear, setFetchedTopWear] = useState<IWears[]>([]);
	const translate = useTranslate();
	const [FormValuesMeasurements, setFormValuesMeasurements] = useState<{
		unit: string;
		chest: string;
		hips: string;
		waist: string;
		gender: string;
	}>({
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
	) => {
		event.preventDefault();
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
			setShowTable(true);
			await axios.post(
				"http://localhost:8080/data/genders/post",
				{
					gender: FormValuesMeasurements.gender,
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
	const [selectedValue, setSelectedValue] = React.useState("cm");
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

	const [unit, setUnit] = useState(false)
	const [FormValuesBrand, setFormValuesBrand] = useState<{
		brand: string;
		size: string;
		gender: string;
	}>({
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

		try {
			const response = await axios.get("http://localhost:8080/api/Tops-B", {
				params: {
					brand: FormValuesBrand.brand,
					size: FormValuesBrand.size,
					gender: FormValuesBrand.gender,
				},
			});
			setFetchedTopWear(response.data.topBrand);
			setShowTable(true);
			await axios.post(
				"http://localhost:8080/data/genders/post",
				{
					gender: FormValuesBrand.gender,
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const Option: { id: number; value: string }[] = [
		{ id: 1, value: "Male" },
		{ id: 2, value: "Female" },
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
																`pages.Inputs.Genders.${option.value}`,
																`${option.value}`
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
														`pages.Table.Headers.${item.label}`,
														`${item.label}`
													)}
													name={item.name}
													value={item.value}
													onChange={handleInputChangeMeasurements}
													className={item.className}
												/>
											))}
										</Box>
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
																`pages.Inputs.Genders.${option.value}`,
																`${option.value}`
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
														`pages.Table.Headers.${item.label}`,
														`${item.label}`
													)}
													name={item.name}
													value={item.value}
													onChange={handleInputChange}
													className={item.className}
												/>
											))}
										</Box>
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
								</Box>
							</form>
						</Tab.Panel>
					</Tab.Panels>
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
								{unit === false ? (
									<TableBody>
										{fetchedTopWear.map((item, index) => (
											<TableRow key={index}>
												<TableCell>{item.Brand}</TableCell>
												<TableCell>{item.Size}</TableCell>
												<TableCell>
													{item.ChestCM_min}-{item.ChestCM_max}
												</TableCell>
												<TableCell>
													{item.WaistCM_min}-{item.WaistCM_max}
												</TableCell>
												<TableCell>
													{item.HipCM_min}-{item.HipCM_max}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								) : (
									<TableBody>
										{fetchedTopWear.map((item, index) => (
											<TableRow key={index}>
												<TableCell>{item.Brand}</TableCell>
												<TableCell>{item.Size}</TableCell>
												<TableCell>
													{item.ChestIN_min}-{item.ChestIN_max}
												</TableCell>
												<TableCell>
													{item.WaistIN_min}-{item.WaistIN_max}
												</TableCell>
												<TableCell>
													{item.HipIN_min}-{item.HipIN_max}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Box>
				</Box>
			</Tab.Group>
		</>
	);
};

export default Top;