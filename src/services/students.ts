import { request } from '@umijs/max';

export async function studentList(
  params?: {
    currentPage?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const res = await request('/student/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return { data: res.data.list };
}

export async function addStudent(data: API.StudentList) {
  return request<API.StudentList>('/student/add', {
    method: 'POST',
    data,
  });
}

export async function updateStudent(data?: { [key: string]: any }) {
  return request<API.StudentList>('/student/update', {
    method: 'POST',
    data,
  });
}

export async function deleteStudent(data?: { [key: string]: any }) {
  return request<API.StudentList>('/student/delete', {
    method: 'POST',
    data: data?.stuId,
  });
}
