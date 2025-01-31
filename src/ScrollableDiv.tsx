import React, { PropsWithChildren, useEffect, useRef } from 'react';


type ScrollableDivProps = {
    className?: string;
}

const ScrollableDiv:React.FC<PropsWithChildren<ScrollableDivProps>> = ({ children, ...rest }) => {
  // Create a reference for the scrollable div
  const scrollableDivRef = useRef(null);

  // Scroll to bottom when content changes
  useEffect(() => {
    if (scrollableDivRef.current) {
      const element  = scrollableDivRef.current as HTMLDivElement; 
      element.scrollTop = element.scrollHeight;
    }
  }, [children]);  // Trigger when the `content` prop changes

  return (
    <div
      ref={scrollableDivRef}
      {...rest}
      style={{
        height: '100%', // Adjust to your desired height
        overflowY: 'auto', // Makes it scrollable vertically
        padding: '10px',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableDiv;