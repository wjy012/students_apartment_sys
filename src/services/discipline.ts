import { request } from '@umijs/max';

export async function discList(
  params?: {
    currentPage?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = await request('/disc/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return { data: res.data.list };
}

export async function addDisc(data: API.DisciplineItem) {
  return request('/disc/add', {
    method: 'POST',
    data,
  });
}

export async function updateDisc(data: API.DisciplineItem) {
  return request('/disc/update', {
    method: 'POST',
    data,
  });
}

export async function deleteDisc(data?: { [key: string]: any }) {
  return request('/disc/delete', {
    method: 'POST',
    data: data?.stuId,
  });
}
