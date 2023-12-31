"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateServerMenu from "./CreateServerMenu";
import { useState } from "react";
import JoinServer from "./JoinServer";
import CreateServerForm from "./CreateServerForm";
import { useModal } from "@/hooks/useModalStore";

interface CreateModalProps {
	username: string;
};

function CreateServerModal({
	username 
}: CreateModalProps) {
	const { isOpen, onClose, type } = useModal();
	const [currentContent, setCurrentContent] = useState('menu');

	const isModalOpen = isOpen && type === "createServer";

	const goBackToMenu = () => {
		setCurrentContent('menu');
	};

	const goToForm = () => {
		setCurrentContent('form');
	};

	const goToJoin = () => {
		setCurrentContent('join');
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="bg-white dark:bg-white text-black p-0 overflow-hidden">
				{ currentContent === 'menu' && <CreateServerMenu createForm={goToForm} joinForm={goToJoin} isFirst={false} /> }
				{ currentContent === 'form' && <CreateServerForm backFn={goBackToMenu} username={username} closeModal={handleClose} /> }
				{ currentContent === 'join' && <JoinServer backFn={goBackToMenu} closeModal={handleClose} /> }
			</DialogContent>
		</Dialog>
	);
}

export default CreateServerModal;
