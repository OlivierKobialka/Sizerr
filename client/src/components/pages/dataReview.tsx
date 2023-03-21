import React, { useState } from "react";
import {
	Box,
	Stack,
	Typography,
	TextField,
	Button,
	Rating,
} from "@pankod/refine-mui";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

const Analitycs = () => {
	const [opinion, setOpinion] = useState({
		email: "",
		comment: "",
	});
	const [comment, setComment] = useState("");
	const [email, setEmail] = useState("");
	const [remainingChars, setRemainingChars] = useState(150);
	const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setComment(value);
		setRemainingChars(150 - value.length);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setEmail(value);
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = {
			email: email,
			comment: comment,
		};
		console.log(formData);
		setComment("");
		setEmail("");
		setRemainingChars(150);
		try {
			const response = await axios.post("http://localhost:8080/api/Opinion", {
				params: {
					email: email,
					comment: comment,
				},
			});
			setOpinion(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const ShoeSizes = {
		chart: {
			id: "basic-column",
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				endingShape: "rounded",
				borderRadius: 4,
				backgroundColor: "#475be8",
				hover: {
					backgroundColor: "#475be8",
				},
			},
		},
		xaxis: {
			categories: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
		},
	};

	const TotalRevenueSeries = [
		{
			data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69, 91, 148, 22, 43, 21],
		},
	];
	//? ROW CHART
	const ShoeSizesRow = {
		chart: {
			id: "basic-column",
			toolbar: {
				show: false,
			},
		},
		xaxis: {
			categories: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
		},
		plotOptions: {
			bar: {
				horizontal: true,
				endingShape: "rounded",
				columnHeight: "20px",
				borderRadius: 2,
			},
		},
	};

	const TotalRevenueSeriesRow = [
		{
			data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69, 91, 148, 22, 43, 21],
		},
	];

	return (
		<Box className='flex-col xl:flex-row-reverse flex xl:gap-x-4 gap-y-4'>
			<Box className='flex-1 xl:w-2/3 flex flex-col'>
				<Box id='chart' className='p-4  grid rounded-2xl bg-[#fcfcfc]'>
					<Stack direction='row' gap={4} flexWrap='wrap'>
						<Typography fontSize={28} fontWeight={700} color='#11142d'>
							Avg. Shoe Size
						</Typography>
					</Stack>
					<Box className='hidden sm:block'>
						<ReactApexChart
							series={TotalRevenueSeries}
							type='bar'
							height={350}
							options={ShoeSizes}
						/>
					</Box>
					{/* MOBILE */}
					<Box className='block sm:hidden'>
						<ReactApexChart
							series={TotalRevenueSeriesRow}
							type='bar'
							height={250}
							options={ShoeSizesRow}
						/>
					</Box>
				</Box>
				{/* SMALLER CHARTS */}
				<Box className='grid grid-cols-1 gap-4 pt-4 md:grid-cols-3'>
					<Box className='w-full bg-[#fcfcfc] rounded-2xl'>1</Box>
					<Box className='w-full bg-[#fcfcfc] rounded-2xl'>2</Box>
					<Box className='w-full bg-[#fcfcfc] rounded-2xl'>3</Box>
				</Box>
			</Box>
			<Box className='p-4 flex-1 flex flex-col rounded-2xl bg-[#fcfcfc] xl:w-1/3'>
				<Typography
					fontSize={28}
					fontWeight={700}
					color='#11142d'
					className='pb-5'>
					Express your opinion here!
				</Typography>
				<form onSubmit={handleSubmit} className='flex flex-col'>
					{/* EMAIL */}
					<TextField
						label='Email'
						type='email'
						value={email}
						onChange={handleEmailChange}
					/>
					{/* COMMENT */}
					<Box className='flex w-full justify-between mt-4'>
						<Typography className='text-gray-400' fontWeight={600}>
							Add Comment
						</Typography>
						<Typography className='text-gray-400'>{`${comment.length}/150`}</Typography>
					</Box>
					<Box className='flex flex-col h-[200px] place-content-between'>
						<TextField
							value={comment}
							onChange={handleCommentChange}
							fullWidth
							multiline
							rows={4}
							inputProps={{ maxLength: 150 }} // set the maximum character count
						/>
						<button
							className={`bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 rounded-2xl ${
								!comment || remainingChars < 0
									? "cursor-not-allowed opacity-50"
									: ""
							}`}
							type='submit'
							disabled={!comment || remainingChars < 0}>
							Submit
						</button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default Analitycs;
