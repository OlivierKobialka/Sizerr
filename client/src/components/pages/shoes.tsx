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
} from "@pankod/refine-mui";
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import axios from "axios";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

const Shoes = () => {
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
	const [resultMeasurement, setResultMeasurement] = useState("");
	const handleSubmitMeasurements = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
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
			setResultMeasurement(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const [selectedValue, setSelectedValue] = React.useState("cm");
	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};
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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
					brand: FormValuesBrand.brand,
					size: FormValuesBrand.size,
					gender: FormValuesBrand.gender,
					measurement: selectedValueBrand,
				},
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const Option = [
		{ id: 1, value: "male", text: "Male" },
		{ id: 2, value: "female", text: "Female" },
	];

	const [selectedValueBrand, setSelectedValueBrand] = React.useState("eu");
	const handleRadioChangeBrand = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSelectedValueBrand(event.target.value);
	};

	const handleClear = () => {
		setFormValuesMeasurements({
			unit: "",
			size: "",
			gender: "",
		});
		setFormValuesBrand({
			brand: "",
			size: "",
			gender: "",
			measurement: "",
		});
	};

	return (
		<Tab.Group>
			<Box className='flex flex-col  xl:mx-[20%]'>
				<Box className='container flex rounded-2xl flex-col items-center pt-3 h-auto xs:w-[400px] xs:place-items-center'>
					<Tab.List className='bg-blue-500 mb-2 px-3 py-2 flex justify-between  rounded-xl w-full gap-3'>
						<Tab
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm bold leading-5 text-blue-700",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
									selected
										? "bg-white shadow font-bold "
										: " hover:bg-white/[0.12] text-white"
								)
							}>
							By Measurments
						</Tab>
						<Tab
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm bold leading-5 text-blue-700",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
									selected
										? "bg-white shadow font-bold"
										: " hover:bg-white/[0.12] text-white"
								)
							}>
							By Brand
						</Tab>
					</Tab.List>
				</Box>
				<Tab.Panels className='w-full'>
					<Tab.Panel className='w-full lg:w-[650px] flex flex-col'>
						<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
							<Box className='w-full flex flex-col place-items-center gap-2'>
								<form
									onSubmit={handleSubmitMeasurements}
									className='w-full flex flex-col place-items-center gap-2'>
									<Box className='flex place-items-center justify-center'>
										<FormControl>
											<InputLabel>Gender</InputLabel>
											<Select
												required
												className='w-96'
												name='gender'
												label='Gender'
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
									{/*  */}
									<Box className='flex place-items-center justify-center'></Box>
									<FormControl>
										<RadioGroup
											row
											value={selectedValue}
											onChange={handleRadioChange}
											className='w-96 my-1'>
											<FormControlLabel
												value='cm'
												control={<Radio />}
												label='CM'
												// checked={selectedValue === "cm"}
											/>
											<FormControlLabel
												value='inch'
												control={<Radio />}
												label='INCH'
												// checked={selectedValue === "inch"}
											/>
										</RadioGroup>
									</FormControl>
									<TextField
										className='w-96'
										type='number'
										name='size'
										label='Size'
										value={FormValuesMeasurements.size}
										onChange={handleInputChangeMeasurements}
										required
									/>
									<Box className='mt-10 w-full xl:w-96 md:mt-20 flex justify-between items-center'>
										<button onClick={handleClear} className='mr-3'>
											clear
										</button>
										<button
											type='submit'
											className='w-full bg-primary font-bold text-white bold rounded-xl  hover:bg-[#1e36e8] duration-200 ease-out py-2'>
											Find my Size
										</button>
									</Box>
								</form>
							</Box>
						</Box>
						<table className='table-auto'>
							<tr>
								<th>{resultMeasurement}</th>
							</tr>
						</table>
					</Tab.Panel>
					<Tab.Panel className='w-full lg:w-[650px] flex'>
						<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
							<Box className='w-full flex flex-col place-items-center gap-2'>
								<form onSubmit={handleSubmit}>
									<Box className='flex flex-col place-items-center justify-center'>
										<FormControl>
											<InputLabel>Gender</InputLabel>
											<Select
												className='w-96 mb-3'
												name='gender'
												label='Gender'
												required
												value={FormValuesBrand.gender}
												onChange={handleSelectChange}>
												{Option.map(option => (
													<MenuItem key={option.value} value={option.value}>
														{option.text}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<Box className='mb-3'>
											<TextField
												className='w-96 '
												type='text'
												name='brand'
												label='Brand'
												value={FormValuesBrand.brand}
												onChange={handleInputChange}
												required
											/>
										</Box>
										<TextField
											className='w-96'
											type='number'
											name='size'
											label='Size'
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
												<FormControlLabel
													value='eu'
													control={<Radio />}
													label='EU'
												/>
												<FormControlLabel
													value='uk'
													control={<Radio />}
													label='UK'
												/>
												<FormControlLabel
													value='us'
													control={<Radio />}
													label='US'
												/>
											</RadioGroup>
										</FormControl>
									</Box>
									<Box className='mt-10 w-full xl:w-96 md:mt-20 flex justify-between items-center'>
										<button onClick={handleClear} className='mr-3'>
											clear
										</button>
										<button
											type='submit'
											className='w-full bg-primary font-bold text-white bold rounded-xl  hover:bg-[#1e36e8] duration-200 ease-out py-2'>
											Find my Size
										</button>
									</Box>
								</form>
							</Box>
						</Box>
					</Tab.Panel>
				</Tab.Panels>
			</Box>
		</Tab.Group>
	);
};

export default Shoes;
