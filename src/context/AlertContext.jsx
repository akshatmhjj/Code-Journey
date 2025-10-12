import { createContext, useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const showAlert = (message, type = "info") => {
    setAlert({ message, type, visible: true });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setAlert((a) => ({ ...a, visible: false }));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* ✅ Floating alert that slides up and down */}
      <div
        className={`fixed left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out z-[9999]
          ${alert.visible ? "bottom-8" : "-bottom-24"}
        `}
      >
        <Stack sx={{ width: "100%", maxWidth: 400 }} spacing={2}>
          <Alert
            severity={alert.type}
            variant="filled"
            sx={{
              width: "100%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {alert.message}
          </Alert>
        </Stack>
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
