import React from "react";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Analitycs = () => {
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
		<Box
			p={4}
			flex={1}
			bgcolor='#fcfcfc'
			id='chart'
			display='flex'
			flexDirection='column'
			borderRadius='15px'>
			<Stack my='20px' direction='row' gap={4} flexWrap='wrap'>
				<Typography fontSize={28} fontWeight={700} color='#11142d'>
					Avg. Shoe Size
				</Typography>
			</Stack>
			<Box className='hidden sm:block'>
				<ReactApexChart
					series={TotalRevenueSeries}
					type='bar'
					height={300}
					options={ShoeSizes}
				/>
			</Box>
      {/* ROW */}
			<Box className='block sm:hidden'>
				<ReactApexChart
					series={TotalRevenueSeriesRow}
					type='bar'
					height={350}
					options={ShoeSizesRow}
				/>
			</Box>
		</Box>
	);
};

export default Analitycs;
