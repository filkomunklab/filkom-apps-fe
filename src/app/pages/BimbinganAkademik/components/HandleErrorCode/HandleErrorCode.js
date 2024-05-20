import Swal from "sweetalert2";

const blueTheme = {
  confirmButtonColor: "#007BFF",
};

const handleAuthenticationError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Unable to process your authentication token. Please try signing in again.",
    ...blueTheme,
  });
};

export { handleAuthenticationError };
