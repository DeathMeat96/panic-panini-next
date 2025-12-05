"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import Container from "@/app/global-components/Container/Container";
import ContactForm from "@/app/global-components/ContactForm/ContactForm";

export default function ContactUs() {
	const textRef = useRef(null);
	const isInView = useInView(textRef, { once: true });

	return (
		<section
			id="contacts"
			className="
				relative 
				flex 
				items-center 
				justify-center 
				w-full 
				min-h-screen 
				mt-16 
				lg:mt-16
				px-4
			"
		>
			<Container customClasses="flex flex-col items-center justify-center w-full max-w-3xl overflow-hidden">
				
				<div
					ref={textRef}
					className="flex flex-col items-center text-center w-full"
					style={{
						transform: isInView ? "none" : "translateY(40px)",
						opacity: isInView ? 1 : 0,
						transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
					}}
				>
					{/* Title / Intro Section */}
					<div className="overflow-hidden">
						<h2
							className={`
								font-bold 
								text-5xl 
								lg:text-6xl 
								pb-6 
								opacity-0
								${isInView ? "animate-slide-up" : ""}
							`}
						>
							Contact us
						</h2>
					</div>

					

					{/* The Contact Form (centered) */}
					<div className="w-full flex justify-center">
						<ContactForm />
					</div>
				</div>
			</Container>
		</section>
	);
}
