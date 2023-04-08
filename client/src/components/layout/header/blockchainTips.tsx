import { FaEthereum } from "react-icons/fa";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@pankod/refine-mui";
import React, { useState } from "react";
import Web3 from "web3";

interface TippingDialogProps {
	open: boolean;
	onClose: () => void;
}

// const web3 = new Web3(
// 	new Web3.providers.HttpProvider(
// 		"https://mainnet.infura.io/v3/eedf9707ecb447868eaedb02c22fa46c"
// 	)
// );
// const contractAddress = "<CONTRACT_ADDRESS>";
// // const abi = [<CONTRACT_ABI>];

const BlockchainTips = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [amount, setAmount] = useState("");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setAmount("");
	};

	const handleTipClick = async () => {
		const web3 = new Web3(Web3.givenProvider);
		const accounts = await web3.eth.requestAccounts();
		const account = accounts[0];
		const balance = await web3.eth.getBalance(account);
		const tipAmount = web3.utils.toWei(amount, "ether");

		if (balance === "0") {
			alert(
				"Your account balance is 0 ETH. Please add funds to your account before sending a tip."
			);
			handleClose();
			return;
		}

		await web3.eth.sendTransaction({
			to: "0x...[recipient address]...",
			from: account,
			value: tipAmount,
		});
		handleClose();
	};

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(event.target.value);
	};

	return (
		<Box>
			<button onClick={handleOpen}>TIP</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Blockchain Tipping</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='tip-amount'
						label='Amount'
						type='number'
						value={amount}
						onChange={handleAmountChange}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleTipClick}>Tip</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default BlockchainTips;
