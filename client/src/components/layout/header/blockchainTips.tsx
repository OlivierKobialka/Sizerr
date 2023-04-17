import { GiReceiveMoney } from "react-icons/gi";
import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
} from "@pankod/refine-mui";
import { useState } from "react";
import Web3 from "web3";
import confetti from "canvas-confetti";
import { useTranslate } from "@pankod/refine-core";

const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://mainnet.infura.io/v3/eedf9707ecb447868eaedb02c22fa46c"
	)
);

const BlockchainTips = () => {
	const translate = useTranslate();
	const [transactionValue, setTransactionValue] = useState<Number>(0);
	// @ts-ignore
	const handleTransactionValueChange = event => {
		setTransactionValue(event.target.value);
	};
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
			// @ts-ignore
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setAccount(accounts[0]);
			// @ts-ignore
			const result = await ethereum.request({
				method: "eth_getBalance",
				params: [accounts[0], "latest"],
			});
			const wei = parseInt(result, 16);
			const balance = wei;
			// / 10 ** 18
			console.log(balance + " ETH");
		} catch (error) {
			alert("Failed to connect!");
			console.error("Failed to connect:", error);
		}
	};

	const handleSend = async () => {
		try {
			const weiValue = web3.utils.toWei(transactionValue, "ether");
			const transactionParam = {
				to: "0x42e80C8f174483898270Bee2DA8077034DdC41dD",
				from: account,
				value: web3.utils.toHex(weiValue),
			};
			// @ts-ignore
			const txhash = await ethereum.request({
				method: "eth_sendTransaction",
				params: [transactionParam],
			});
			const confirmation = await checkTransactionConfirmation(txhash);
			alert(confirmation);
		} catch (error) {
			alert("Failed to send!");
			console.error("Failed to send:", error);
		}

		//! confetti
		const count = 200;
		const defaults = {
			origin: { y: 0.7 },
		};

		function fire(particleRatio: number, opts: any) {
			confetti(
				Object.assign({}, defaults, opts, {
					particleCount: Math.floor(count * particleRatio),
				})
			);
		}

		fire(0.25, {
			spread: 26,
			startVelocity: 55,
		});

		fire(0.2, {
			spread: 60,
		});

		fire(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		});

		fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		});

		fire(0.1, {
			spread: 120,
			startVelocity: 45,
		});

		setOpen(false);
	};

	const checkTransactionConfirmation = (txhash: string): Promise<string> => {
		const checkTransactionLoop = (): Promise<string> => {
			return (
				// @ts-ignore
				ethereum
					.request({ method: "eth_getTransactionReceipt", params: [txhash] })
					// @ts-ignore
					.then(receipt => {
						if (receipt != null) return "Transction confirmed!";
						else return checkTransactionLoop();
					})
			);
		};
		return checkTransactionLoop();
	};

	return (
		<Box className='mr-5 max-w'>
			<button onClick={handleOpen} className=''>
				<GiReceiveMoney />
			</button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					{translate("pages.BlockChainTip.Title", "Blockchain Tip")}
				</DialogTitle>
				<DialogContent className='flex justify-around'>
					<Box className='flex justify-center items-center'>
						{web3.currentProvider && (
							<>
								{account ? null : (
									<button
										className='bg-primary text-white rounded-lg py-1 px-3 font-bold'
										onClick={handleConnect}>
										{translate(
											"pages.BlockChainTip.Connect",
											"Connect Metamask"
										)}
									</button>
								)}
								{account && (
									<Box className='flex flex-col'>
										<Box>
											<TextField
												className='mt-10'
												id='transactionValue'
												type='number'
												color='info'
												label='Value (ETH)'
												variant='outlined'
												value={transactionValue}
												onChange={handleTransactionValueChange}
											/>
										</Box>
										<button
											className={`bg-primary mt-2 text-white rounded-lg py-1 px-3 font-bold ${
												transactionValue === "" ||
												transactionValue <= 0 ||
												typeof transactionValue === "undefined" ||
												transactionValue === null
													? "opacity-50 cursor-not-allowed"
													: ""
											}`}
											onClick={handleSend}
											disabled={
												transactionValue === "" ||
												typeof transactionValue !== "number" ||
												transactionValue === null ||
												transactionValue <= 0
											}>
											Tip {transactionValue} ETH
										</button>
									</Box>
								)}
							</>
						)}
						{!web3.currentProvider && (
							<Box>
								{translate(
									"pages.BlockChainTip.NoMetamask",
									"Please install MetaMask"
								)}
							</Box>
						)}
					</Box>
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default BlockchainTips;
