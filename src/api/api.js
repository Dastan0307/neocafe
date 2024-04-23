import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.example.com',
})
<<<<<<< HEAD
=======


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
export const changeCafeOrderStatus = async (id, data) => {
  const res = await api.patch(`/orders/update-order/${id}/`, data);
  return res;
};
export const getOrderInfo = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res;
};
>>>>>>> f0f51b7884d21807c405a1a45341b44827ba3d22
