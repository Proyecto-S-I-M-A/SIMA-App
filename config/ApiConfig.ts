import Constants from "expo-constants";

export const API_URL = Constants.expoConfig?.extra?.apiUrl || "";

const ApiConfig = {
  API_URL,
};

export default ApiConfig;