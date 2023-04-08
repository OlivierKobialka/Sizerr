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

const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://mainnet.infura.io/v3/eedf9707ecb447868eaedb02c22fa46c"
	)
);
// const contractAddress = "<CONTRACT_ADDRESS>";
// // const abi = [<CONTRACT_ABI>];

const BlockchainTips = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [account, setAccount] = useState<string>("");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setBalance(null);
	};

	const handleConnect = async () => {
		try {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setAccount(accounts[0]);

			const result = await ethereum.request({
				method: "eth_getBalance",
				params: [accounts[0], "latest"],
			});
			const wei = parseInt(result, 16);
			const balance = wei / 10 ** 18;
			console.log(balance + " ETH");
		} catch (error) {
			console.error("Failed to connect:", error);
		}
	};

	const handleSend = async () => {
		try {
			const transactionParam = {
				to: "0x45B6b39e1Cf8A6b4Ff2720f6BA0089d4574126E5",
				from: account,
				value: "0x38D7EA4C68000",
			};

			const txhash = await ethereum.request({
				method: "eth_sendTransaction",
				params: [transactionParam],
			});
			const confirmation = await checkTransactionConfirmation(txhash);
			alert(confirmation);
		} catch (error) {
			console.error("Failed to send:", error);
		}
	};

	const checkTransactionConfirmation = (txhash: string): Promise<string> => {
		const checkTransactionLoop = (): Promise<string> => {
			return ethereum
				.request({ method: "eth_getTransactionReceipt", params: [txhash] })
				.then(receipt => {
					if (receipt != null) return "confirmed";
					else return checkTransactionLoop();
				});
		};

		return checkTransactionLoop();
	};

	return (
		<Box>
			<button onClick={handleOpen}>TIP</button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Blockchain Tipping</DialogTitle>
				<DialogContent className='flex justify-around'>
					<div>
						{web3.currentProvider && (
							<>
								<button id='connect-button' onClick={handleConnect}>
									Connect Metamask
								</button>
								{account && (
									<button id='send-button' onClick={handleSend}>
										Tip 0.001 ETH
									</button>
								)}
							</>
						)}
						{!web3.currentProvider && <div>Please install MetaMask</div>}
					</div>
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default BlockchainTips;
