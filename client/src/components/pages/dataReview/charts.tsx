import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const Charts = () => {
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

	const avgShoeSize = [
		{
			data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69, 91, 148, 22, 43, 21],
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
	const maleCount = 32134;
	const femaleCount = 12321;

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
			labels: ["Male", "Female"],
			legend: {
				show: false,
			},
		},
	};
	const Send = 24;
	const NotSend = 34;

	const feedbackCounterChart = {
		series: [Send, NotSend],
		options: {
			chart: {
				type: "donut",
			},
			dataLabels: {
				enabled: false,
			},
            colors: ["#475be8", "#3399ff"],
			labels: ["Send", "Not Send"],
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
						Avg. Shoe Size
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
			<Box className='grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2 h-36'>
				<Box className=' w-full flex place-content-center bg-[#fcfcfc] rounded-2xl'>
					<ReactApexChart
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
						options={feedbackCounterChart.options}
						series={feedbackCounterChart.series}
						type='donut'
						height={150}
						className='w-1/2'
					/>
					<Box className='flex flex-col w-1/2'>
						<Typography fontWeight={700} fontSize={24} className='text-black'>
							Feedback
						</Typography>
						<Typography fontWeight={700} fontSize={24} className='text-black'>
							counter
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Charts;
