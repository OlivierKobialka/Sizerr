/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useTranslate } from "@pankod/refine-core";

type TCategory = {
	value: string;
	name: string;
}[];
type IComment = {
	comment: string;
	category: string;
	email: string;
}[]

const Form = () => {
	const translate = useTranslate();

	// const [opinion, setOpinion] = useState<IComment>({
	// 	email: "",
	// 	comment: "",
	// 	category: "",
	// });
	const [comment, setComment] = useState("");
	const [email, setEmail] = useState("");
	const [selectedButton, setSelectedButton] = useState<string>("feedback");
	const [remainingChars, setRemainingChars] = useState(150);

	const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setComment(value);
		setRemainingChars(150 - value.length);
	};

	const handleButtonClick = (button: string) => {
		setSelectedButton(button === selectedButton ? selectedButton : button);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setEmail(value);
	};
	const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = {
			email: email,
			comment: comment,
			category: selectedButton,
		};
		console.log(formData);
		setComment("");
		setEmail("");
		setSelectedButton(selectedButton);
		setRemainingChars(150);

		try {
			const response = await axios.post("http://localhost:8080/Opinion", {
				params: {
					email: email,
					comment: comment,
					category: selectedButton,
				},
			});
			// setOpinion(response.data.userComment);
			// console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const category: TCategory = [
		{
			value: "feedback",
			name: "Feedback",
		},
		{
			value: "suggestion",
			name: "Suggestion",
		},
		{
			value: "complain",
			name: "Complaints",
		},
	];

	//! SNACKBAR
	const [open, setOpen] = React.useState(false);
	const handleClickSnackbar = () => {
		setOpen(true);
	};
	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<Box className='p-4 flex-1 flex flex-col rounded-2xl bg-[#fcfcfc] xl:w-1/4'>
			<Typography
				fontSize={28}
				fontWeight={700}
				color='#11142d'
				className='pb-5'>
				{translate(
					"pages.FormOpinion.Title.Opinion",
					"Express your opinion here!"
				)}
			</Typography>
			<form onSubmit={formSubmit} className='flex flex-col'>
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
						{translate("pages.FormOpinion.Title.AddComment", "Add Comment")}
					</Typography>
					<Typography className='text-gray-400'>{`${comment.length}/150`}</Typography>
				</Box>
				<Box className='flex flex-col place-content-between'>
					<TextField
						value={comment}
						onChange={handleCommentChange}
						fullWidth
						multiline
						rows={4}
						inputProps={{ maxLength: 150 }}
					/>
					<Typography fontWeight={600} className='pt-2 pb-1 text-gray-400'>
						{translate("pages.FormOpinion.Title.Category", "Category")}
					</Typography>
					<Box className='flex justify-between mb-2 w-full md:w-1/2 xl:w-7/12'>
						{category.map((item, index) => (
							<button
								type='button'
								className={`${selectedButton === item.value
									? "bg-primary font-bold text-white rounded-3xl"
									: "bg-gray-200 rounded-3xl font-bold text-black"
									} py-1 px-4 mx-1`}
								onClick={() => handleButtonClick(item.value)}>
								{translate(`pages.FormOpinion.Title.Buttons.${item.name}`)}
							</button>
						))}
					</Box>

					<button
						className={`bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 rounded-2xl ${(!email && !comment) || remainingChars < 0
							? "cursor-not-allowed opacity-50"
							: ""
							}`}
						onClick={handleClickSnackbar}
						type='submit'
						disabled={(!email && !comment) || remainingChars < 0}>
						{translate(
							"pages.FormOpinion.Title.Buttons.SubmitYourFeedback",
							"Submit Your Feedback!"
						)}
					</button>
				</Box>
			</form>
		</Box>
	);
};

export default Form;
