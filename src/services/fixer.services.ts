import axios from "axios";

const fixerAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIXER_API_URL,
});

export const getCurrencyRates = async (currency?: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_FIXER_API_KEY;
  const params = currency
    ? { base: currency, access_key: API_KEY }
    : { access_key: API_KEY };

  const response = await fixerAPI.get("/latest", { params });
  return response.data;
};
