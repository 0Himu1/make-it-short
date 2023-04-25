export default function Nav() {
	return (
		<nav className="flex items-center justify-between">
			<a
				href="https://shrtco.de/"
				className="font-bold uppercase text-xl cursor-pointer"
			>
				shrtcode
			</a>
			<a
				href="https://shrtco.de/docs"
				className="bg-button px-7 py-2 font-medium rounded-md"
			>
				API
			</a>
		</nav>
	);
}
