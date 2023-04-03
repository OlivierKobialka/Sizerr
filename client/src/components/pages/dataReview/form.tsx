/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import axios from "axios";

const Form = () => {
	const [opinion, setOpinion] = useState({
		email: "",
		comment: "",
		category: "",
	});
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
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
			const response = await axios.post("http://localhost:8080/api/Opinion", {
				params: {
					email: email,
					comment: comment,
					category: selectedButton,
				},
			});
			setOpinion(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

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
						Category
					</Typography>
					<Box className='flex justify-between mb-2 w-full md:w-1/2 xl:w-2/3'>
						<button
							type='button'
							className={`${
								selectedButton === "feedback"
									? "bg-primary font-bold text-white rounded-3xl"
									: "bg-gray-200 rounded-3xl font-bold text-black"
							} py-1 px-4`}
							onClick={() => handleButtonClick("feedback")}>
							Feedback
						</button>
						<button
							type='button'
							className={`${
								selectedButton === "suggestion"
									? "bg-primary font-bold text-white rounded-3xl"
									: "bg-gray-200 rounded-3xl font-bold text-black"
							} py-1 px-4`}
							onClick={() => handleButtonClick("suggestion")}>
							Suggestion
						</button>
						<button
							type='button'
							className={`${
								selectedButton === "complain"
									? "bg-primary font-bold text-white rounded-3xl"
									: "bg-gray-200 rounded-3xl font-bold text-black"
							} py-1 px-4`}
							onClick={() => handleButtonClick("complain")}>
							Complain
						</button>
					</Box>

					<button
						className={`bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 rounded-2xl ${
							!comment || remainingChars < 0
								? "cursor-not-allowed opacity-50"
								: ""
						}`}
						onClick={handleClickSnackbar}
						type='submit'
						disabled={!comment || remainingChars < 0}>
						Submit your feedback!
					</button>
				</Box>
			</form>
		</Box>
	);
};

export default Form;
