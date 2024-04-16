import axios from 'axios'
import { getCookie } from '@utils/Cookie'

export const api = axios.create({
  baseURL: 'https://helsinki-backender.org.kg',
  headers: {
    "Content-Type": "application/json",
  },
})


api.interceptors.request.use(
  async (config) => {
    const token = getCookie('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export const getOrders = async () => {
  const res = await api.get("orders/order-list/");
  return res;
};

export const getNewOrdersTakeAway = async () => {
  const res = await api.get("/orders/order-list/?status__in=Новый&order_type=Навынос");
  return res;
};

export const changeOrderInfo = async (id, data) => {
  const res = await api.patch(`/orders/update-customer-order/${id}/`, data);
  return res;
};

export const getOrderInfo = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res;
};