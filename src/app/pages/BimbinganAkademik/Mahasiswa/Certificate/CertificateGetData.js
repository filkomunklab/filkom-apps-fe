import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const viewAllStudentCertificate = async (nik) => {
  try {
    const response = await axios.get(`/certificate/dosen/${nik}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate data:", error);
    throw error;
  }
};
