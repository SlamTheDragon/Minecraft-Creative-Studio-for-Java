import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Interface from './interface/Interface';
import ThemePlayground from './components/panels/ThemePlayground';

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Interface />} />
					<Route path="/playground" element={<ThemePlayground />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}