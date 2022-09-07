import { request } from '@umijs/max';

export async function serviceList(
  params?: {
    currentPage?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = await request('/main/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

  return { data: res.data.list };
}

export async function addService(data: API.ServiceItem) {
  return request('/main/add', {
    method: 'POST',
    data,
  });
}

export async function updateService(data: { [key: string]: any }) {
  return request('/main/update', {
    method: 'POST',
    data,
  });
}
