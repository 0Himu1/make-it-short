import { useState, useEffect } from 'react';
type notification = {
	message: string;
};

function Notification({ message }: notification) {
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		if (message) {
			setShowMessage(true);
			setTimeout(() => setShowMessage(false), 3000);
		}
	}, [message]);

	return (
		<div
			className={`${
				showMessage ? 'block' : 'hidden'
			} absolute top-20 before:top-0 transition-all duration-300 ${
				message === 'Text copied to clipboard ...!'
					? 'bg-green/20 border border-green'
					: 'bg-secondery/20 border border-secondery'
			} px-20 py-2 `}
		>
			{message}
		</div>
	);
}

export default Notification;
