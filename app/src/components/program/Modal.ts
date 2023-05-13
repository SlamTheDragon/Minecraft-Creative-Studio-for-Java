import { useState } from "react";
import { setShowModal, showModal } from "../common/Modal/Modal";


// Open Modal
function openModal() {
    setShowModal(true);
    document.body.classList.add('disable-events');
    document.addEventListener('keydown', handleEscapeKeyPress);
    // you could also add other selectors e.g.; ...rAll('button, div, a, ...');
    const outsideElements = document.querySelectorAll('button');
    outsideElements.forEach((element) => {
        element.setAttribute('tabindex', '-1');
    });
};
function handleMouseEnter() {
    document.body.classList.remove('disable-events');
};
// Keybind Listner
function handleEscapeKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeModal();
    }
};
// Closes Modal
function closeModal() {
    setShowModal(false);
    document.removeEventListener('keydown', handleEscapeKeyPress);
    const outsideElements = document.querySelectorAll('button');
    outsideElements.forEach((element) => {
        element.removeAttribute('tabindex');
    });
};

export default { openModal, closeModal, handleMouseEnter, handleEscapeKeyPress, showModal }