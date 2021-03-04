import React, { useRef } from "react";

import "./HorizontalScroll.scss";

type Props = {
  children: React.ReactNode;
};
const HorizontalScroll: React.FC<Props> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  let childrenNum = React.Children.count(children);
  type Direction = "left" | "right";
  const handleScroll = (direction: Direction) => {
    console.log("width", scrollRef.current?.scrollWidth);
    console.log(scrollRef.current?.getClientRects()[0].width);
    let width = scrollRef.current!.getClientRects()[0].width;

    if (direction === "left") {
      scrollRef.current &&
        (scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - width);
    } else {
      scrollRef.current &&
        (scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + width);
    }
  };

  return (
    <div className="scroll-container">
      {childrenNum > 1 && (
        <div className="left-btn">
          <button onClick={() => handleScroll("left")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <rect fill="none" height="24" width="24" />
              <g>
                <polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" />
              </g>
            </svg>
          </button>
        </div>
      )}
      <div className="scroll-wrapper" ref={scrollRef}>
        {children}
      </div>
      {childrenNum > 1 && (
        <div className="right-btn">
          <button onClick={() => handleScroll("right")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
              </g>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HorizontalScroll;
