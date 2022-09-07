import { request } from '@umijs/max';

export async function addDorm(data: API.DormList) {
  return request('/dorm/add', {
    method: 'POST',
    data,
  });
}

export async function updateDorm(data?: { [key: string]: any }) {
  return request('/dorm/update', {
    method: 'POST',
    data,
  });
}

export async function deleteDorm(data?: { [key: string]: any }) {
  return request('/dorm/delete', {
    method: 'POST',
    data: data?.dormId,
  });
}
