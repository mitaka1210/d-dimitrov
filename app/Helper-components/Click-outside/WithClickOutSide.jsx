import React, {useEffect, useRef, useState} from "react";

const WithClickOutSide = (WrappedComponent) => {
  const Component = (props) => {
    const [open, setOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!ref.current?.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />;
  };

  return Component
};

export default WithClickOutSide;
