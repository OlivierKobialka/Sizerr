/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import axios, { AxiosResponse } from "axios";
import { useTranslate } from "@pankod/refine-core";

const Charts = () => {
    const host = "http://localhost:8080/data/";
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const translate = useTranslate();
    const [ShoeSizeCountEU, setShoeSizeCountEU] = useState<number[]>([]);
    const ShoeSizes = {
        series: [
            {
                name: "Shoe Size",
                data: ShoeSizeCountEU,
            },
        ],
        chart: {
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
            categories: [
                36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ],
        },
    };

    let seriesName = translate("pages.Charts.Series.Users", "User's");

    useEffect(() => {
        setIsLoading(true);

        async function fetchAvgShoeSize(): Promise<void> {
            try {
                const response = await axios.get(
                    `http://localhost:8080/getShoeSizeCount`
                );

                setShoeSizeCountEU(response.data.ShoeSizeCounterEU);
            } catch (error) {
                console.error(error);
            }
        }

        console.log(ShoeSizeCountEU);
        fetchAvgShoeSize();
        setIsLoading(false);
    }, []);

    const avgShoeSize = [
        {
            name: seriesName,
            data: ShoeSizeCountEU,
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
            categories: [
                35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ],
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
            data: ShoeSizeCountEU,
        },
    ];
    //! GENDER COUNT

    const [genderCount, setGenderCount] = useState({
        Male: 0,
        Female: 0,
    });

    useEffect(() => {
        setIsLoading(true);

        async function fetchGenderCounts(): Promise<void> {
            try {
                const response = await axios.get(`${host}genders/get`);

                const { Male, Female } = response.data.genderCount;
                setGenderCount({
                    Male,
                    Female,
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchGenderCounts();
        setIsLoading(false);
    }, []);

    let labelMale = translate("pages.Inputs.Genders.Males", "Male's");
    let labelFemale = translate("pages.Inputs.Genders.Females", "Female's");

    let maleCount = genderCount.Male;
    let femaleCount = genderCount.Female;

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
    });

    useEffect(() => {
        setIsLoading(true);

        async function fetchFeedbacks(): Promise<void> {
            try {
                const response = await axios.get(`${host}opinionCategory`);
                const { feedback, suggestion, complain } =
                    response.data.FeedbackCount;
                setFeedbackCount({
                    Feedback: feedback,
                    Suggestion: suggestion,
                    Complaint: complain,
                });
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }

        fetchFeedbacks();
    }, []);

    const Feedback = feedbackCount.Feedback;
    const Suggestion = feedbackCount.Suggestion;
    const Complain = feedbackCount.Complaint;

    let Feedbacks_Labels = translate(
        "pages.Charts.Series.Feedbacks",
        "Feedbacks"
    );
    let Complaints_Labels = translate(
        "pages.Charts.Series.Complaints",
        "Complaints"
    );
    let Suggestions_Labels = translate(
        "pages.Charts.Series.Suggestions",
        "Suggestions"
    );

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
            labels: [Feedbacks_Labels, Suggestions_Labels, Complaints_Labels],
            legend: {
                show: false,
            },
        },
    };

    return (
        <Box className="flex-1 xl:w-3/4 flex flex-col">
            <Box id="chart" className="p-4  grid rounded-2xl bg-[#fcfcfc]">
                <Stack direction="row" gap={4} flexWrap="wrap">
                    <Typography fontSize={28} fontWeight={700} color="#11142d">
                        {translate(
                            "pages.Charts.Title.AvgShoeSize",
                            "Avg. Shoe Size"
                        )}
                    </Typography>
                </Stack>
                <Box className="hidden sm:block">
                    <ReactApexChart
                        series={[{ data: ShoeSizeCountEU }]}
                        type="bar"
                        height={350}
                        options={ShoeSizes}
                    />
                </Box>
                {/* MOBILE */}
                <Box className="block sm:hidden">
                    <ReactApexChart
                        series={avgShoeSizeRow}
                        type="bar"
                        height={250}
                        options={ShoeSizesRow}
                    />
                </Box>
            </Box>
            {/* SMALLER CHARTS */}
            <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 h-36">
                <Box className="sm:hidden">
                    <Box className=" w-full grid grid-cols-2 place-content-center bg-[#fcfcfc] rounded-2xl">
                        <ReactApexChart
                            // @ts-ignore
                            options={genderCountChart.options}
                            series={genderCountChart.series}
                            type="donut"
                            height={150}
                        />
                        <ReactApexChart
                            // @ts-ignore
                            options={feedbackCategoryCounter.options}
                            series={feedbackCategoryCounter.series}
                            type="donut"
                            height={150}
                        />
                    </Box>
                </Box>
                {/* XS */}
                <Box className="hidden w-full sm:flex place-content-center bg-[#fcfcfc] rounded-2xl">
                    <ReactApexChart
                        // @ts-ignore
                        options={genderCountChart.options}
                        series={genderCountChart.series}
                        type="donut"
                        height={150}
                        className="w-1/2"
                    />
                    <Box className="flex flex-col w-1/2">
                        <Typography
                            fontWeight={700}
                            fontSize={24}
                            className="text-black"
                        >
                            Gender
                        </Typography>
                        <Typography
                            fontWeight={700}
                            fontSize={24}
                            className="text-black"
                        >
                            Count
                        </Typography>
                    </Box>
                </Box>
                <Box className="hidden w-full sm:flex place-content-center bg-[#fcfcfc] rounded-2xl">
                    <ReactApexChart
                        // @ts-ignore
                        options={feedbackCategoryCounter.options}
                        series={feedbackCategoryCounter.series}
                        type="donut"
                        height={150}
                        className="w-1/2"
                    />
                    <Box className="flex flex-col w-1/2">
                        <Typography
                            fontWeight={700}
                            fontSize={24}
                            className="text-black"
                        >
                            Feedback
                        </Typography>
                        <Typography
                            fontWeight={700}
                            fontSize={24}
                            className="text-black"
                        >
                            category
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Charts;
