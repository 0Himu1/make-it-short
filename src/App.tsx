import { FormEvent, useState, useEffect } from 'react';
import Nav from './components/Nav';
import Notification from './components/Notification';
import { Analytics } from '@vercel/analytics/react';

type datatype = {
	ok: boolean;
	result: {
		code: string;
		short_link: string;
		full_short_link: string;
		original_link: string;
	};
};

export default function App() {
	const [url, setUrl] = useState('');
	const [ogUrl, setOgUrl] = useState('');
	const [messege, setMessege] = useState('');
	const [link, setLink] = useState<string | null>('');
	const [buttonState, setButtonState] = useState('short');

	const fetchData = async (params: string) => {
		const options = { method: 'GET' };
		const res = await fetch(
			`https://api.shrtco.de/v2/shorten?url=${params}`,
			options
		);
		const data: datatype = await res.json();
		setLink(data?.result.full_short_link);
		setButtonState('copy');
	};

	const submitHandlear = (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		const regex =
			/^((http|https):\/\/)?([a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]{1,5})?(\/.*)?$/;
		if (regex.test(url)) {
			setOgUrl(url);
		} else if (url) {
			setMessege('Link is not right ...!');
		}
		console.log();
	};

	const handleCopy = () => {
		const textToCopy: string = link ? link : '';
		if (textToCopy) {
			navigator.clipboard
				.writeText(textToCopy)
				.then(() => {
					setMessege('Text copied to clipboard ...!');
					console.log(messege);
				})
				.catch(err => {
					console.error('Error copying text to clipboard:', err);
				});

			setButtonState('another');
		}
	};

	useEffect(() => {
		if (ogUrl) {
			fetchData(ogUrl);
		}
	}, [ogUrl]);

	return (
		<main
			className="px-7 py-5 md:px-20 lg:px-80 bg-cover h-screen overflow-hidden font-poppins text-white relative"
			style={{ backgroundImage: `url(/BGimg.jpg)` }}
		>
			<Nav />
			<div className="h-full flex flex-col justify-center items-center -mt-10">
				<h1 className="font-semibold text-5xl md:text-7xl text-center w-80 md:w-[450px] capitalize">
					make your <span className="text-secondery">link</span> shorter
				</h1>
				<form
					className="flex flex-col items-center md:flex-row w-full mt-10 "
					onSubmit={e => {
						submitHandlear(e);
					}}
				>
					<input
						type="text"
						className="px-5 py-3 md:py-6 md:px-7 w-full md:flex-1 rounded-md bg-offWhite outline-none text-primary font-medium text-lg"
						placeholder="pest your link"
						value={link ? link : url}
						onChange={e => setUrl(e.target.value)}
					/>
					<button
						type="submit"
						className={`${
							buttonState === 'short' ? 'bg-secondery' : 'bg-green'
						} w-full md:flex md:w-auto px-5 py-3 md:py-6 md:px-7 lg:px-16 rounded-md text-primary font-medium text-xl uppercase mt-4 md:mt-0 md:ml-4 duration-300 transition-all`}
						onClick={() => {
							if (buttonState === 'short') {
								submitHandlear();
							} else if (buttonState === 'copy') {
								handleCopy();
							} else if (buttonState === 'another') {
								setButtonState('short');
								setUrl('');
								setOgUrl('');
								setLink('');
							}
						}}
					>
						{buttonState}
					</button>
				</form>
				<Notification message={messege} />
			</div>
			<div className="absolute flex justify-center bottom-0 left-0 right-0 text-center">
				<p className=" text-base">🤙 Project By </p>
				<a
					href="https://www.instagram.com/himu_nazmul/"
					className="ml-2 text-secondery hover:underline text-base"
				>
					Himu
				</a>
			</div>
			<Analytics />
		</main>
	);
}
