import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import axios, { AxiosResponse } from 'axios';
import { useTranslate } from "@pankod/refine-core";

export default function Charts() {
	const host = 'https://localhost:8080/data/'
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const translate = useTranslate();
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

	let seriesName = translate("pages.Charts.Series.Users", "User's");
	const avgShoeSize = [
		{
			name: seriesName,
			data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69, 91, 148, 22, 43, 21],
			color: "#475be8",
		},
	];
	//? ROW CHART
	const ShoeSizesRow = {
		chart: {
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

	const avgShoeSizeRow = [
		{
			data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69, 91, 148, 22, 43, 21],
		},
	];
	//! GENDER COUNT

	const [genderCount, setGenderCount] = useState<{ Male: number; Female: number }>({
		Male: 0,
		Female: 0,
	});

	useEffect(() => {
		setIsLoading(true);

		async function fetchGenderCounts(): Promise<void> {
			try {
				const response: AxiosResponse<{ Male: number; Female: number }> = await axios.get(
					`${host}genders/get`
				);

				const data = response.data;
				setGenderCount({ Male: data.Male, Female: data.Female })
			} catch (error) {
				console.error(error);
			}
		}
		fetchGenderCounts()
		setIsLoading(false);
	}, [])


	let labelMale = translate("pages.Inputs.Genders.Males", "Male's");
	let labelFemale = translate("pages.Inputs.Genders.Females", "Female's");

	let maleCount = genderCount.Male
	let femaleCount = genderCount.Female

	const genderCountChart = {
		series: [maleCount, femaleCount],
		options: {
			chart: {
				type: "donut",
			},
			dataLabels: {
				enabled: false,
			},
			colors: ["#475be8", "#3399ff"],
			labels: [labelMale, labelFemale],
			legend: {
				show: false,
			},
		},
	};
	const [feedbackCount, setFeedbackCount] = useState({
		Feedback: 0,
		Suggestion: 0,
		Complaint: 0,
	})

	// useEffect(() => {
	// 	const fetchFeedbacks = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			let response = await axios.get(`${host}opinionCategory`);

	// 			setFeedbackCount(response.data.FeedbackCount);
	// 			setIsLoading(false);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	fetchFeedbacks()
	// 	console.log(feedbackCount);
	// }, [feedbackCount])

	const Feedback = 24;
	const Suggestion = 34;
	const Complain = 12;
	// CHART LABELS
	let Feedbacks = translate("pages.Charts.Series.Feedbacks", "Feedbacks");
	let Complaints = translate("pages.Charts.Series.Complaints", "Complaints");
	let Suggestions = translate("pages.Charts.Series.Suggestions", "Suggestions");

	const feedbackCategoryCounter = {
		series: [Feedback, Suggestion, Complain],
		options: {
			chart: {
				type: "donut",
			},
			dataLabels: {
				enabled: false,
			},
			colors: ["#475be8", "#3399ff", "#ffcc00"],
			labels: [Feedbacks, Suggestions, Complaints],
			legend: {
				show: false,
			},
		},
	};

	return (
		<Box className='flex-1 xl:w-3/4 flex flex-col'>
			<Box id='chart' className='p-4  grid rounded-2xl bg-[#fcfcfc]'>
				<Stack direction='row' gap={4} flexWrap='wrap'>
					<Typography fontSize={28} fontWeight={700} color='#11142d'>
						{translate("pages.Charts.Title.AvgShoeSize", "Avg. Shoe Size")}
					</Typography>
				</Stack>
				<Box className='hidden sm:block'>
					<ReactApexChart
						series={avgShoeSize}
						type='bar'
						height={350}
						options={ShoeSizes}
					/>
				</Box>
				{/* MOBILE */}
				<Box className='block sm:hidden'>
					<ReactApexChart
						series={avgShoeSizeRow}
						type='bar'
						height={250}
						options={ShoeSizesRow}
					/>
				</Box>
			</Box>
			{/* SMALLER CHARTS */}
			<Box className='grid grid-cols-1 gap-4 pt-4 xs:grid-cols-2 h-36'>
				<Box className=' w-full flex place-content-center bg-[#fcfcfc] rounded-2xl'>
					<ReactApexChart
						// @ts-ignore
						options={genderCountChart.options}
						series={genderCountChart.series}
						type='donut'
						height={150}
						className='w-1/2'
					/>
					<Box className='flex flex-col w-1/2'>
						<Typography fontWeight={700} fontSize={24} className='text-black'>
							Gender
						</Typography>
						<Typography fontWeight={700} fontSize={24} className='text-black'>
							Count
						</Typography>
					</Box>
				</Box>
				<Box className=' w-full flex place-content-center bg-[#fcfcfc] rounded-2xl'>
					<ReactApexChart
						// @ts-ignore
						options={feedbackCategoryCounter.options}
						series={feedbackCategoryCounter.series}
						type='donut'
						height={150}
						className='w-1/2'
					/>
					<Box className='flex flex-col w-1/2'>
						<Typography fontWeight={700} fontSize={24} className='text-black'>
							Feedback
						</Typography>
						<Typography fontWeight={700} fontSize={24} className='text-black'>
							category
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
