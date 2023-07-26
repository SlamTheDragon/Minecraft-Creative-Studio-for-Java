import { useState, useEffect } from "react";
import { imageFiles } from "./utils/imagesFiles";
import { soundEffectFiles } from "./utils/sfxFiles";
import { videoFiles } from "./utils/videoFiles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalState } from "./components/slice/modal-slices/modalSlice";
import { readHeader } from "./components/slice/modal-slices/modalHeaderSlice";
import { readModalInterface } from "./components/slice/modal-slices/modalInterfaceSlice";
import { filesystem } from "@neutralinojs/lib"
import Interface from "./components/.Interface/Interface";
import Modal from "./components/common/Modal";
import Sample1 from "./components/widgets/modal-contents/SsampleContentA";
import DefaultModal from "./components/widgets/modal-contents/DefaulModal";
import Sample2 from "./components/widgets/modal-contents/SsampleContentB";
import Sample3 from "./components/widgets/modal-contents/SsampleContentC";


function App() {
	const [isLoading, setIsLoading] = useState(true); // use isLoading if you want to hide the interface at start
	const theme = window.localStorage.getItem("theme"); // FIXME: use local config instead of browser cache
	
	// Theme Setter
	useEffect(() => {
		if (theme !== null) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}, []);

	// Log current directory or error after component is mounted
	useEffect(() => {
		filesystem.readDirectory('./').then((data) => {
			console.log(data)
		}).catch((err) => {
			console.log(err)
		})
	}, [])

	useEffect(() => {
		const images = Object.values(imageFiles)
		const sounds = Object.values(soundEffectFiles);
		const videos = Object.values(videoFiles)
		const totalAssets = images.length + sounds.length + videos.length;
		let loadedAssets = 0;
		const assetLoaded = () => {
			loadedAssets++;
			if (loadedAssets === totalAssets) {
				setIsLoading(false); // All assets are loaded
			}
		}

		const preloadImage = (url: string) => {
			const img = new Image();
			img.onload = assetLoaded;
			img.src = url;
		}

		const preloadSound = (url: string) => {
			const audio = new Audio();
			audio.oncanplaythrough = assetLoaded;
			audio.src = url;
		}

		const preloadVideo = (url: string) => {
			const video = document.createElement('video');
			video.oncanplaythrough = assetLoaded;
			video.src = url;
		}

		// Preload images, sounds, and videos
		images.forEach(preloadImage);
		// sounds.forEach(preloadSound);
		// videos.forEach(preloadVideo);
	}, []);


	/***************[ INITIALIZERS ]**************/

	// # Redux get
	// ...
	const isModalOpen = useSelector(modalState)
	const getHeader = useSelector(readHeader)
	const getInterfaceID = useSelector(readModalInterface)

	// # Redux set
	const dispatch = useDispatch()


	// # Initialize Events
	// Browser
	window.addEventListener("contextmenu", (e) => { e.preventDefault() })
	
	// Keyboard
	window.addEventListener('keydown', keyEscape)
	// window.addEventListener('keydown', keyF1)
	// window.addEventListener('keydown', keyF2)
	// window.addEventListener('keydown', keyF3)
	// window.addEventListener('keydown', keyF4)
	// window.addEventListener('keydown', keyF5)
	// window.addEventListener('keydown', keyF6)
	// window.addEventListener('keydown', keyF7)
	// window.addEventListener('keydown', keyF8)
	// window.addEventListener('keydown', keyF9)
	// window.addEventListener('keydown', keyF10)
	// window.addEventListener('keydown', keyF11)
	// window.addEventListener('keydown', keyF12)
	
	// Mouse
	// window.addEventListener('mousedown', mouseLeft)
	


	/***************[ SURFACE FUNCTIONS ]**************/
	function keyEscape(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			dispatch(closeModal())
		}
	}

	// function keyF1(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF2(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF3(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF4(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF5(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF6(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF7(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF8(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF9(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF10(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF11(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }
	// function keyF12(e: KeyboardEvent) {
	// 	e.preventDefault();
	// 	console.error("Function not implemented.");
	// }


	// function mouseLeft(e: MouseEvent) {
	// 	if (e.button === 2) {
	// 		console.error("Function not implemented.")
	// 	}
	// }


	return (
		<>
			<Modal
				// Usage:
				// ... Component() {
				// 		const foo = useModalOperation()
				//
				//		return (
				//				<button onClick={() => foo( modalTitle: string, modalInterfaceID: number }> Open Modal </button>	
				// 		)
				// }

				modalTitle={getHeader}
				isOpen={isModalOpen}
				onClose={() => dispatch(closeModal())}
				selectInterface={getInterfaceID}
				selectAction={0}
			>
				<DefaultModal key={0} />

				{/* List All Components */}
				<Sample1 key={1} />
				<Sample2 key={2} />
				<Sample3 key={3} />
			</Modal>
			<Interface />
		</>
	);
}

export default App;
