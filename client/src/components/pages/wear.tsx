/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import React, { useState } from "react";
import {
	Box,
	Select,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
} from "@pankod/refine-mui";

type FormData = {
	unit: string;
	chest?: string;
	bust?: string;
	hips: string;
	inseam: string;
	waist: string;
	gender: string;
};

const Wear: React.FC = () => {
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
	};

	const Option = [
		{ id: 1, value: "male", text: "Male" },
		{ id: 2, value: "female", text: "Female" },
	];
	//!
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [label, setLabel] = useState<string>("Chest");
	const [value, setValue] = React.useState(0);

	const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedOption(event.target.value as string);
		if (event.target.value === "men") {
			setLabel("Chest");
		} else if (event.target.value === "women") {
			setLabel("Bust");
		}
	};

	const handleClear = () => {
		setFormValuesMeasurements({
			unit: "",
			chest: "",
			bust: "",
			hips: "",
			inseam: "",
			waist: "",
			gender: "",
		});
		setFormValuesBrand({
			brand: "",
			size: "",
			gender: "",
		});
	};

	return (
		<Tab.Group>
			<Box className='flex flex-col  lg:mx-[20%]'>
				<Box className='container flex rounded-2xl flex-col items-center pt-3 h-auto xs:w-[400px]'>
					<Tab.List className='bg-blue-500 mb-2 px-3 py-2 flex justify-between rounded-xl w-full gap-3'>
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
					<Tab.Panel className='w-full'>
						<form onSubmit={handleSubmitMeasurements}>
							<Box className='bg-white container flex rounded-2xl flex-col items-center p-3 h-auto'>
								<Box className='w-full flex flex-col place-items-center md:place-items-start md:justify-between gap-2 md:flex-row'>
									<Box>
										<FormControl>
											<InputLabel>Gender</InputLabel>
											<Select
												required
												className='w-64'
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
										<TextField
											label={label}
											name='chest'
											value={FormValuesMeasurements.chest}
											onChange={handleInputChangeMeasurements}
											className='w-64 pt-2 md:w-56'
											required
										/>
										<TextField
											label='Hips'
											name='hips'
											value={FormValuesMeasurements.hips}
											onChange={handleInputChangeMeasurements}
											type='number'
											required
										/>
										<TextField
											label='Inseam'
											name='inseam'
											value={FormValuesMeasurements.inseam}
											onChange={handleInputChangeMeasurements}
											type='number'
											required
										/>
										<TextField
											label='Waist'
											name='waist'
											value={FormValuesMeasurements.waist}
											onChange={handleInputChangeMeasurements}
											type='number'
											required
										/>
									</Box>
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
										<TextField
											required
											className='w-96'
											name='brand'
											label='Brand'
											value={FormValuesBrand.brand}
											onChange={handleInputChange}
										/>
										<TextField
											required
											className='w-96'
											name='size'
											label='Size'
											value={FormValuesBrand.size}
											onChange={handleInputChange}
										/>
									</Box>
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
							</Box>
						</form>
					</Tab.Panel>
				</Tab.Panels>
			</Box>
		</Tab.Group>
	);
};

export default Wear;
