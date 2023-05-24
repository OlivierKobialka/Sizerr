import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useTranslate } from "@pankod/refine-core";

const Form = () => {
	const host = "http://localhost:3001";

	const translate = useTranslate();
	const [comment, setComment] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [selectedButton, setSelectedButton] = useState<string>("feedback");
	const [remainingChars, setRemainingChars] = useState<number>(150);

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

		try {
			await axios.post(`${host}/Opinion`, {
				email: formData.email,
				comment: formData.comment,
				category: formData.category,
			});
			await axios.post(`${host}/data/opinionCategory-post`, {
				category: formData.category,
			});
		} catch (error) {
			console.error(error);
		}
		setComment("");
		setEmail("");
		setSelectedButton(selectedButton);
		setRemainingChars(150);
	};

	const category: { value: string; name: string }[] = [
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
				<TextField
					label='Email'
					type='email'
					value={email}
					onChange={handleEmailChange}
				/>
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
								className={`${
									selectedButton === item.value
										? "bg-primary font-bold text-white rounded-3xl"
										: "bg-gray-200 rounded-3xl font-bold text-black"
								} py-1 px-4 mx-1`}
								onClick={() => handleButtonClick(item.value)}>
								{translate(`pages.FormOpinion.Title.Buttons.${item.name}`)}
							</button>
						))}
					</Box>

					<button
						className={`bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 rounded-2xl ${
							(!email && !comment) || remainingChars < 0
								? "cursor-not-allowed opacity-50"
								: ""
						}`}
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
