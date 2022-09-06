import { request } from '@umijs/max';

export async function userList(
  params?: {
    currentPage?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = await request('/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return { data: res.data.list };
}

export async function addUser(data: API.UserInfo) {
  return request<API.StudentList>('/user/add', {
    method: 'POST',
    data,
  });
}

export async function deleteUser(data: any) {
  console.log('delete', data);

  return request<API.StudentList>('/user/delete', {
    method: 'POST',
    data: data?.userId,
  });
}
