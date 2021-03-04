import React, { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

import "./Modal.scss";

interface ModalProps {
  isShown: boolean;
  showHandler: (show: boolean) => void;
  children: React.ReactNode;
  height?: string;
}

const Modal = ({ isShown, showHandler, children, height = "" }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let track = 0;
    function keyListener(e: KeyboardEvent) {
      const handleTabKey = (e: KeyboardEvent) => {
        const focusableElement = modalRef.current?.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="search"], select'
        )!;

        let currentElm: HTMLElement;

        if (!e.shiftKey) {
          currentElm = focusableElement[track] as HTMLElement;
          currentElm.focus();
          track = (track + 1) % focusableElement.length;
        } else if (e.shiftKey) {
          track =
            (track + focusableElement.length - 1) % focusableElement.length;
          if (track === 0) {
            const lastElement = focusableElement[
              focusableElement.length - 1
            ] as HTMLElement;
            lastElement.focus();
          } else {
            currentElm = focusableElement[track - 1] as HTMLElement;
            currentElm.focus();
          }
        }
        return e.preventDefault();
      };

      let keyListenersMap = {
        Escape: () => showHandler(false),
        Tab: handleTabKey,
      };
      if (e.key === "Tab" || e.key === "Escape") {
        let listener = keyListenersMap[e.key];
        return listener(e);
      }
    }
    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, [showHandler]);

  return ReactDOM.createPortal(
    <div className="modal-root">
      <Backdrop show={isShown} showHandler={showHandler} />
      <div
        className="modal-container"
        style={height ? { minHeight: height } : {}}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

type HeaderProps = {
  showHandler: (show: boolean) => void;
  children: React.ReactNode;
};
Modal.Header = function ModalHeader({ showHandler, children }: HeaderProps) {
  return (
    <div className="modal-header">
      <h3>{children}</h3>
      <button
        className="cross-btn"
        title="close modal"
        onClick={() => showHandler(false)}
      >
        ✕
      </button>
    </div>
  );
};

type BodyProps = {
  children: React.ReactNode;
};
Modal.Body = function ModalBody({ children }: BodyProps) {
  return <div className="modal-body">{children}</div>;
};

type FooterProps = {
  children: ReactNode;
};
Modal.Footer = function ModalFooter({ children }: FooterProps) {
  return <div className="modal-footer">{children}</div>;
};

export default Modal;
