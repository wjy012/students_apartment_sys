import { request } from '@umijs/max';

export async function dormList(
  params?: {
    currentPage?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = await request('/dorm/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return { data: res.data.list };
}

export async function dormDetail(dormId: string) {
  const res = await request('/live/get', {
    method: 'GET',
    params: { dormId },
  });
  return res.data;
}

export async function checkIn(data: any) {
  return request('/live/add', {
    method: 'POST',
    data,
  });
}

export async function checkOut(data?: { [key: string]: any }) {
  return request('/live/delete', {
    method: 'POST',
    data: data?.stuId,
  });
}
