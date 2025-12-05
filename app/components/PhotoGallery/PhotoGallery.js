"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Container from "@/app/global-components/Container/Container";
import { MapMapper, Calendar } from "@/app/svg-icons/svg-icons";

const galleryThumbnails = [
	{
		id: 1,
		src: "/gallery/thumbnails/thumbnail-1.jpg",
		club: "Grand Hotel Bucharest",
		city: "Bucharest",
		date: "28/12/2025",
		slides: [
			{ src: "/gallery/slider-images/band.jpg" },
			{ src: "/gallery/slider-images/band2.jpg" },
			{ src: "/gallery/slider-images/band3.jpg" },
			{ src: "/gallery/slider-images/band4.jpg" },
			{ src: "/gallery/slider-images/band5.jpg" },
		],
	},
];

export default function PhotoGallery() {
	const [openGallery, setOpenGallery] = useState(false);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true });

	const clickHandler = (index) => {
		setOpenGallery(true);
		setGalleryIndex(index);
	};

	return (
		<section
			id="photo-gallery"
			className={`w-full mt-32 pb-14 lg:mt-56 lg:pb-12 lg:mb-0`}
			style={{
				transform: isInView ? "none" : "translateY(100px)",
				opacity: isInView ? 1 : 0,
				transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
			}}
			ref={sectionRef}>
			<Container>
				<div className="overflow-hidden">
					<h2 className={`font-bold text-6xl pb-6 opacity-0 ${isInView ? "animate-slide-up" : ""}`}>
						Gallery
					</h2>
				</div>
				
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
					{galleryThumbnails.map((item, index) => {
						return (
							<div className="flex flex-col mb-5 leading-none" key={item.id}>
								<div className="w-full h-full rounded-lg bg-fluo-green transition-all">
									<Image
										className="rounded-lg cursor-pointer hover:opacity-60 transition-all"
										src={item.src}
										width={400}
										height={400}
										alt="Gallery gig thumbnail"
										onClick={() => clickHandler(index)}
									/>
								</div>
								<h5 className="text-sm md:text-lg xl:text-xl font-medium">{item.club}</h5>
								<span className="flex">
									<MapMapper />
									<h5 className="ml-2 text-sm md:text-lg">{item.city}</h5>
								</span>
								<span className="flex">
									<Calendar />
									<h5 className="ml-2 text-sm md:text-lg">{item.date}</h5>
								</span>
							</div>
						);
					})}
					<Lightbox
						open={openGallery}
						close={() => setOpenGallery(false)}
						slides={galleryThumbnails[galleryIndex].slides}
					/>
				</div>
			</Container>
		</section>
	);
}
