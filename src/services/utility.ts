import { request } from '@umijs/max';

export async function stuFee(
  params?: {
    currentPage?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = await request('/fare/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return { data: res.data.list };
}

export async function getPrice() {
  const res = await request('/price/get', {
    method: 'GET',
  });
  return res.data[0];
}

export async function updatePrice(data?: { [key: string]: any }) {
  return request('/price/update', {
    method: 'POST',
    data,
  });
}
