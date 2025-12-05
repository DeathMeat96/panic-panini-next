"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Container from "@/app/global-components/Container/Container";
import TourDates from "../TourDates/TourDates";
import { ArrowBottom } from "@/app/svg-icons/svg-icons";

export default function Shows() {
	const [isScrollMoreVisible, setIsScrollMoreVisible] = useState(true);
	const showsContainerRef = useRef(null);
	const scrollableDivRef = useRef(null);
	const isInView = useInView(showsContainerRef, { once: true });

	const clickHandler = () => {
		const scrollableDiv = scrollableDivRef.current;
		if (!scrollableDiv) return;

		scrollableDiv.scrollTo({
			top: scrollableDiv.scrollTop + scrollableDiv.offsetHeight,
			behavior: "smooth",
		});
	};

	// React-based scroll handler (no addEventListener)
	const handleScroll = () => {
		const scrollableDiv = scrollableDivRef.current;
		if (!scrollableDiv) return;

		// This mirrors your original logic but with safety checks
		const firstChild = scrollableDiv.childNodes[0];
		const innerFirstChild = firstChild?.children?.[0];
		const extraHeight = innerFirstChild?.offsetHeight || 0;

		if (
			scrollableDiv.scrollTop +
				scrollableDiv.offsetHeight +
				extraHeight >=
			scrollableDiv.scrollHeight
		) {
			setIsScrollMoreVisible(false);
		} else {
			setIsScrollMoreVisible(true);
		}
	};

	// Optional: run once after mount to set initial state correctly
	useEffect(() => {
		handleScroll();
	}, []);

	return (
		<section
			id="shows"
			className={`w-full relative mt-16 bg-incoming-shows bg-cover bg-no-repeat bg-center h-128 lg:h-screen lg:min-h-180 lg:max-h-196 lg:mt-56`}
			style={{
				transform: isInView ? "none" : "translateY(100px)",
				opacity: isInView ? 1 : 0,
				transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
			}}
			ref={showsContainerRef}
		>
			{/* Background pattern overlay */}
			<div className="absolute w-full h-full top-0 left-0 bg-hero-pattern bg-repeat z-[-1]" />

			{/* Scrollable content */}
			
		</section>
	);
}
