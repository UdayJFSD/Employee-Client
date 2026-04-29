import axios from "axios";

// 🔥 Validate ENV early (fail fast, not silently)
const API = import.meta.env.VITE_API_URL;

if (!API) {
  throw new Error("VITE_API_URL is not defined. Check Vercel environment variables.");
}

// Axios instance
const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Helper to normalize API response
const extractArray = (data) => {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.data)) return data.data;

  console.error("Expected array but got:", data);
  return [];
};

const EmployeeService = {
  // ✅ Get all employees (safe)
  getAll: async () => {
    try {
      const response = await api.get("");
      console.log("GET ALL RESPONSE:", response.data);

      return extractArray(response.data);
    } catch (error) {
      console.error("GET ALL ERROR:", error);
      return [];
    }
  },

  // ✅ Get by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`GET BY ID ERROR (${id}):`, error);
      return null;
    }
  },

  // ✅ Create employee
  create: async (employee) => {
    try {
      const response = await api.post("", employee);
      return response.data;
    } catch (error) {
      console.error("CREATE ERROR:", error);
      throw error;
    }
  },

  // ✅ Update employee
  update: async (id, employee) => {
    try {
      const response = await api.put(`/${id}`, employee);
      return response.data;
    } catch (error) {
      console.error(`UPDATE ERROR (${id}):`, error);
      throw error;
    }
  },

  // ✅ Delete employee
  delete: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`DELETE ERROR (${id}):`, error);
      throw error;
    }
  },
};

export default EmployeeService;
