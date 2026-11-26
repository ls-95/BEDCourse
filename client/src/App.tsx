import axios from "axios";
import { useEffect } from "react";

function App() {
	const fetchBooks = async () => {
		const response = await axios.get("http://localhost:3001/books");
		console.log(response);
		console.log(response.data);
		console.log(response.data[0]);
	};
	useEffect(() => {
		fetchBooks();
	}, []);
	return <h1>Library</h1>;
}
export default App;
