import { TbReportMoney } from "react-icons/tb";
import { Box, Dialog, DialogContent, DialogTitle } from "@pankod/refine-mui";
import { useState } from "react";
import Web3 from "web3";

const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://mainnet.infura.io/v3/eedf9707ecb447868eaedb02c22fa46c"
	)
);

const BlockchainTips = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [account, setAccount] = useState<string>("");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				to: "0x42e80C8f174483898270Bee2DA8077034DdC41dD",
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
					if (receipt != null) return "Transction confirmed!";
					else return checkTransactionLoop();
				});
		};

		return checkTransactionLoop();
	};

	return (
		<Box>
			<button onClick={handleOpen} className="">
				<TbReportMoney />
			</button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Blockchain Tipping</DialogTitle>
				<DialogContent className='flex justify-around'>
					<Box className='flex justify-center items-center'>
						{web3.currentProvider && (
							<>
								{account ? null : (
									<button
										className='bg-primary text-white rounded-lg py-1 px-3 font-bold'
										onClick={handleConnect}>
										Connect Metamask
									</button>
								)}
								{account && (
									<button
										className='bg-primary text-white rounded-lg py-1 px-3 font-bold'
										onClick={handleSend}>
										Tip 0.001 ETH
									</button>
								)}
							</>
						)}
						{!web3.currentProvider && <Box>Please install MetaMask</Box>}
					</Box>
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default BlockchainTips;
