import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import axios from "axios";

const Form = () => {
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
						Submit your feedback!
					</button>
				</Box>
			</form>
		</Box>
	);
};

export default Form;
