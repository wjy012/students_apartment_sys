import { request } from '@umijs/max';
import { flattenObj } from '@/utils/object';

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
  const data = res.data.list.map((e: any) => flattenObj()(e));

  return { data };
}

export async function addStudent(data: API.StudentList) {
  return request('/student/add', {
    method: 'POST',
    data,
  });
}

export async function updateStudent(data?: { [key: string]: any }) {
  return request('/student/update', {
    method: 'POST',
    data,
  });
}

export async function deleteStudent(data?: { [key: string]: any }) {
  return request('/student/delete', {
    method: 'POST',
    data: data?.stuId,
  });
}
