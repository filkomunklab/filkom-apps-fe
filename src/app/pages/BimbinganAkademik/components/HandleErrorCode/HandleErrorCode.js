import Swal from "sweetalert2";

const blueTheme = {
  confirmButtonColor: "#007BFF",
};

const handlePermissionError = () => {
  Swal.fire({
    icon: "error",
    title: "Sorry",
    text: "You don't have permission to access this page",
    ...blueTheme,
  });
};

const handleAuthenticationError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Unable to process your authentication token. Please try signing in again.",
    ...blueTheme,
  });
};

export { handlePermissionError, handleAuthenticationError };
