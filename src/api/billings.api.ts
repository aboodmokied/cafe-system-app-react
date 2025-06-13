import authAxios from "./authAxios";


export const fetchCollectionBillings = async (page: number, limit: number) => {
  const res = await authAxios.get(`/billing/collection`, {
    params: { page, limit },
  });
  console.log(res.data);
  return res.data;
};

export const fetchPointCollectionBillings = async (page: number, limit: number) => {
  const res = await authAxios.get(`/point-billing/collection`, {
    params: { page, limit },
  });
  console.log(res.data);
  return res.data;
};

export const fetchSupplierCollectionBillings = async (page: number, limit: number) => {
  const res = await authAxios.get(`/supplier-billing/collection`, {
    params: { page, limit },
  });
  console.log(res.data);
  return res.data;
};