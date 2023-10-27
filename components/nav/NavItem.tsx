"use client"

import ActionTooltip from "@/components/nav/ActionTooltip";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

import { useParams, useRouter } from "next/navigation";

interface NavItemProps {
	id: string;
	avatarUrl?: string | null;
	name: string;
};

function NavItem({
	id,
	avatarUrl,
	name
}: NavItemProps) {
	const params = useParams();
	const router = useRouter();

	const openServer = () => {
		router.push(`/channels/${id}/welcome`);
	};

	return (
		<ActionTooltip side="right" align="center" label={name}>
			<button
				onClick={openServer}
				className="group relative flex items-center">
				<div className={cn(
					"absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
					params?.serverId !== id && "group-hover:h-[20px]",
					params?.serverId === id ? "h-[36px]" : "h-8px"
					)} />
				<div className={cn(
					`relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]
						transition-all overflow-hidden`,
					params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
				)}>
					{ avatarUrl
						? <Image fill src={avatarUrl} alt="Server" />
						: <div className="w-full h-full flex justify-center items-center">{ getInitials(name) }</div>
					}
				</div>
			</button>
		</ActionTooltip>
	);
}

export default NavItem;
