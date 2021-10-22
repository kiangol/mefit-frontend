import React, {useCallback, useEffect, useRef} from 'react';
import {animated, useSpring} from 'react-spring';
import styled from 'styled-components';
import {MdClose} from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  //transition: 0.3s;
  position: fixed;
  backdrop-filter: blur(3px) brightness(80%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  transition: 0.3s;
  width: 800px;
  height: 500px;
  background: var(--bg-color);
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0px 1px 21px 11px rgba(0,0,0,0.4);
  -webkit-box-shadow: 0px 1px 21px 11px rgba(0,0,0,0.4);
  -moz-box-shadow: 0px 1px 21px 11px rgba(0,0,0,0.4);
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 10px;
  border-radius: 10px 0 0 10px;
  background: #ffffff;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: var(--text-color);
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({showModal, setShowModal, exercise}) => {
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

    const handleVideoClick = (videoLink) => {
        window.open(videoLink, "_blank")
    }

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                            <ModalImg src={exercise.image} alt='camera'/>
                            <ModalContent>
                                <h1>{exercise.name}</h1>
                                <p>{exercise.description}</p>
                                <div>
                                    <button onClick={() => handleVideoClick(exercise.vidLink)}>Watch video</button>
                                </div>
                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={() => setShowModal(prev => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};