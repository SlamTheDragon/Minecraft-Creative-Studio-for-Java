import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Interface from './interface/Interface';

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Interface />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}