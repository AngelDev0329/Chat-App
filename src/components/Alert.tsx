import Alert from "@mui/material/Alert";

import { useEffect } from "react";

type AlertProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  text: string;
  isError?: boolean;
  duration?: number;
};

export const Alerts = ({
  isOpen,
  setIsOpen,
  text,
  duration = 500000,
}: AlertProps) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <Alert sx={{ width: "280px" }} severity="error">
          {text}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};
