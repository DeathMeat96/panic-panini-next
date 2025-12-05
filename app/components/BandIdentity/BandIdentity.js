"use client";

import Image from "next/image";
import Container from "@/app/global-components/Container/Container";
import ButtonPrimary from "@/app/global-components/ButtonPrimary/ButtonPrimary";
import NewAlbum from "../NewAlbum/NewAlbum";
import ScrollTo from "@/app/global-components/ScrollTo/ScrollTo";

export default function BandIdentity() {
	return (
		<>
			<div className="w-full py-3 z-50 lg:hidden">
				<Container customClasses="px-2.5 flex items-center justify-between font-sm">
					<Image
						className="max-w-24 h-auto "
						src="/logo-portrait.png"
						width={324}
						height={236}
						alt="Panic Panini logo"
					/>
				</Container>
			</div>
			<div className="hidden h-full flex-col justify-between grow-0 shrink-0  z-10 bg-opacity-30 lg:flex">
				<div className="logo-container  py-4">
					<Image
						className="px-12 py-3 max-w-75 h-auto"
						src="/logo-portrait.png"
						width={324}
						height={236}
						alt="Panic Panini logo"
					/>
				</div>

			</div>
		</>
	);
}
