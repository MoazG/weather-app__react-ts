import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./Message.scss";

type Props = {
  setError: (m: "") => void;
  children: React.ReactNode;
};

const Message: React.FC<Props> = ({ children, setError }) => {
  let messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t = setTimeout(() => {
      messageRef.current!.style.display = "none";
      setError("");
    }, 5000);
    return () => {
      clearTimeout(t);
    };
  });

  return ReactDOM.createPortal(
    <div ref={messageRef} className="message-root">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        </svg>
      </div>
      <div className="message">{children}</div>
    </div>,
    document.body
  );
};

export default Message;
