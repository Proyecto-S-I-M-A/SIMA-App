import Constants from "expo-constants";

export const API_URL = process.env.API_URL || Constants.expoConfig?.extra?.API_URL || "";

const ApiConfig = {
  API_URL,
};

export default ApiConfig;