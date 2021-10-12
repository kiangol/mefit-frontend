import React, {useCallback, useEffect, useRef} from 'react';
import styles from './Modal.module.css';
import {useSpring, animated} from "react-spring";
import {MdClose} from 'react-icons/md';

const Modal = ({ showModal, setShowModal }) => {

    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    return (
        <>
            <div className={styles.background}>
                <animated.div style={animation}>
                    <div className={styles.modalWrapper}>
                        <img className={styles.modalImg} src={'./modal.jpg'} alt={'camera'} />
                        <div className={styles.modalContent}>
                            <h1>HEI MODAL</h1>
                        </div>
                        <MdClose className={styles.closeModalButton} aria-label={'Close modal'} onClick={() => setShowModal(prev => !prev)} />
                    </div>

                </animated.div>
            </div>

        </>
    )
}

export default Modal;