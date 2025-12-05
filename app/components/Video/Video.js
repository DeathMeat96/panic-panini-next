"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Container from "@/app/global-components/Container/Container";
import { DailyMotion, Youtube } from "@/app/svg-icons/svg-icons";

export default function Video() {
	const textRef = useRef(null);
	const isInView = useInView(textRef, { once: true });

	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0); // 0–100
	const [duration, setDuration] = useState(0);

	const handlePlayPause = () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused || video.ended) {
			video.play();
			setIsPlaying(true);
		} else {
			video.pause();
			setIsPlaying(false);
		}
	};

	const handleLoadedMetadata = () => {
		const video = videoRef.current;
		if (!video) return;
		setDuration(video.duration || 0);
	};

	const handleTimeUpdate = () => {
		const video = videoRef.current;
		if (!video || !duration) return;

		const current = video.currentTime || 0;
		setProgress((current / duration) * 100);
	};

	const handleVideoClick = () => {
		handlePlayPause();
	};

	const handleProgressClick = (e) => {
		const video = videoRef.current;
		if (!video || !duration) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const ratio = clickX / rect.width;
		const newTime = ratio * duration;

		video.currentTime = newTime;
		setProgress(ratio * 100);

		// optionally start playing if clicked while paused
		if (video.paused) {
			video.play();
			setIsPlaying(true);
		}
	};

	// If video ends, show play button again
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleEnded = () => {
			setIsPlaying(false);
			setProgress(100);
		};

		video.addEventListener("ended", handleEnded);
		return () => video.removeEventListener("ended", handleEnded);
	}, []);

	return (
		<section id="video" className="w-full mt-64 lg:mt-56">
			<Container customClasses="flex flex-col lg:flex-row">
				{/* TEXT SECTION */}
				<div
					className="flex flex-col justify-center basis-2/4 lg:max-w-lg xl:max-w-2xl 2xl:max-w-4xl"
					ref={textRef}
					style={{
						transform: isInView ? "none" : "translateX(-100px)",
						opacity: isInView ? 1 : 0,
						transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
					}}
				>

					<div className="overflow-hidden">
						<h2
							className={`font-bold text-3xl pb-16 opacity-0 ${
								isInView ? "animate-slide-up" : ""
							}`}
						>
							Muzică potrivită pentru orice tip de eveniment
						</h2>
					</div>
					<p className="text-lg lg:text-xl">
						Sunetul Mission / Groove se integrează firesc în spații diverse — de la evenimente corporate, recepții și lansări, până la petreceri private și seri intime.
	</p>
	<br/>
<p className="text-lg lg:text-xl">
Ne ajustăm tonul, ritmul și energia în funcție de context, oferind o atmosferă modernă, curată și atent nuanțată.
				
					</p>
					<div className="flex items-center pt-4 gap-4">
						<Youtube />
						<DailyMotion />
					</div>
				</div>

				{/* VIDEO PLAYER SECTION */}
				<div className="flex justify-end items-center mt-48 basis-2/4 lg:max-w-lg lg:mt-0 xl:max-w-2xl 2xl:max-w-4xl">
					<div className="relative lg:w-[50%]  rounded-lg overflow-hidden">
						<video
							ref={videoRef}
							className="w-full lg:max-h-[70%] rounded-lg block"
							height="400"
							playsInline
							// no native controls – we use custom UI
							onLoadedMetadata={handleLoadedMetadata}
							onTimeUpdate={handleTimeUpdate}
							onClick={handleVideoClick}
							src="/Jazz%20Night.mp4"
						>
							Your browser does not support the video tag.
						</video>

						{/* Minimal center play button */}
						<button
							type="button"
							onClick={handlePlayPause}
							className={`
								absolute inset-0 flex items-center justify-center
								transition-opacity duration-300
								${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
							`}
						>
							<div
								className="
									w-16 h-16 rounded-full border border-white/70 
									flex items-center justify-center bg-black/30
									backdrop-blur-sm
								"
							>
								<div
									className="
										w-0 h-0 
										border-t-[10px] border-b-[10px] border-l-[16px]
										border-t-transparent border-b-transparent border-l-white
										ml-1
									"
								/>
							</div>
						</button>

						{/* Custom progress bar at bottom */}
						<div
							className="
								absolute bottom-0 left-0 w-full 
								h-1.5 
								bg-white/20
								cursor-pointer
							"
							onClick={handleProgressClick}
						>
							<div
								className="h-full bg-white"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
