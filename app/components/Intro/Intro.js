"use client";

import { useRef, useState, useEffect } from "react";
import BandIdentity from "../BandIdentity/BandIdentity";
import BackToTop from "../BackToTop/BackToTop";
import { useInView } from "framer-motion";
import CookieConsent from "react-cookie-consent";

const observerOptions = {
	rootMargin: "0px",
	threshold: 0,
};

const SLIDE_IMAGES = [
	"/frame-band.jpg",
	"/frame-band2.jpg",
	"/frame-band3.jpg",
	"/frame-band4.jpg",
];

const SLIDE_INTERVAL_MS = 7000;

export default function Intro() {
	const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const [showScrollArrow, setShowScrollArrow] = useState(true);

	const sectionRef = useRef(null);

	const setSectionRef = (node) => {
		sectionRef.current = node;
	};

	const isInView = useInView(sectionRef, observerOptions);

	useEffect(() => {
		const handleWindowScroll = () => {
			if (window.scrollY > 80) {
				setShowScrollArrow(false);
			} else {
				setShowScrollArrow(true);
			}
		};

		window.addEventListener("scroll", handleWindowScroll);
		return () => window.removeEventListener("scroll", handleWindowScroll);
	}, []);

	useEffect(() => {
		const { scrollY } = window;
		if (scrollY > 50 && !isInView) {
			setIsScrollTopVisible(true);
		} else {
			setIsScrollTopVisible(false);
		}
	}, [isInView]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % SLIDE_IMAGES.length);
		}, SLIDE_INTERVAL_MS);

		return () => clearInterval(intervalId);
	}, []);

	// Smooth scroll on arrow click
	const scrollDown = () => {
		window.scrollTo({
			top: window.innerHeight,
			behavior: "smooth",
		});
	};

	return (
		<section
			id="intro"
			ref={setSectionRef}
			className={`
				lg:w-full relative overflow-hidden max-h-204
				flex flex-col items-center
				h-200 lg:h-screen lg:min-h-180 lg:max-h-256
				lg:flex-row lg:justify-start
			`}
		>
			<BandIdentity />

			{/* Background wrapper */}
			<div className="absolute w-full h-full top-0 left-0 overflow-hidden">
				{SLIDE_IMAGES.map((src, index) => (
					<div
						key={src}
						className={`
							absolute w-full h-full top-0 left-0
							bg-cover bg-no-repeat
							bg-[80%_center] lg:bg-center
							transition-opacity duration-1000 ease-in-out
							${index === currentImage ? "opacity-100" : "opacity-0"}
						`}
						style={{ backgroundImage: `url('${src}')` }}
					/>
				))}

				<div className="absolute w-full h-full top-0 left-0 bg-linear-to-b from-purple-500 to-pink-500 opacity-10" />
				<div className="absolute w-full h-full top-0 left-0 bg-hero-pattern bg-repeat" />
			</div>

			{/* ▼▼▼ Scroll Down Arrow with smooth fade ▼▼▼ */}
			<button
				onClick={scrollDown}
				className={`
					absolute bottom-6 left-1/2 -translate-x-1/2
					text-white 
					animate-bounce z-50
					transition-opacity duration-500
					${showScrollArrow ? "opacity-80 pointer-events-auto" : "opacity-0 pointer-events-none"}
				`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-16 w-16"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			{/* ▲▲▲ END Scroll Down Arrow ▲▲▲ */}

			<BackToTop customClasses={`reveal${isScrollTopVisible ? " visible" : ""}`} />

			<CookieConsent
				disableStyles={true}
				buttonText="Consent"
				cookieName="cookie_consent"
				buttonClasses="bg-yellow-btn-primary rounded-full p-1 px-3 text-sm text-xs text-white"
				containerClasses="w-full fixed bottom-0! bg-fluo-green p-3 z-50 lg:bg-stone-300/70 lg:backdrop-blur-lg lg:left-8 lg:bottom-2! lg:rounded-md lg:max-w-md"
				contentClasses="text-sm leading-none mb-1 lg:text-white"
				expires={20}
			>
				This website uses cookies to enhance the user experience.
			</CookieConsent>
		</section>
	);
}
