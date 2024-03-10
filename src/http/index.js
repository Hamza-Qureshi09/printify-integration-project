import axios from "axios";

// server apis
const serverApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_PRINTIFY_BASE_URL}`,
  headers: {
    "Content-Type": "Application/json",
    Accept: "Application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERINTIFY_SHOP_TOKEN}`,
  },
  withCredentials: true,
});
const SHOPID = process.env.NEXT_PUBLIC_SHOP_ID;
export const GetAllPrintifyProducts = (limit) => {
  return serverApi.get(`/v1/shops/${SHOPID}/products.json?limit=${limit}`);
};
export const PlacePrintifyProduct = (data) => {
  return serverApi.post(`/v1/shops/${SHOPID}/orders.json`, data);
};

// client apis
const clientApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APPLICATION_BASE_URL}`,
  headers: {
    "Content-Type": "Application/json",
    Accept: "Application/json",
  },
  withCredentials: true,
});
export const PrintifyProducts = ({ limit }) => {
  return clientApi.get(`/api/products?limit=${limit ? limit : 4}`);
};
export const CreateShipNowOrder = (data) =>
  clientApi.post("/api/create-checkout-session", data);
