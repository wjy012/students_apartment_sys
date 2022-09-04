import { request } from '@umijs/max';

export async function studentList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.StudentList>('/student/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addStudent(data: API.StudentList) {
  return request<API.StudentList>('/student/add', {
    method: 'POST',
    data,
  });
}

export async function updateStudent(options?: { [key: string]: any }) {
  return request<API.StudentList>('/student/update', {
    method: 'POST',
    data: { ...options },
    ...(options || {}),
  });
}

export async function deleteStudent(options?: { [key: string]: any }) {
  return request<API.StudentList>('/student/delete', {
    method: 'POST',
    ...(options || {}),
  });
}
