import { request } from '@umijs/max';

type CheckInData = {
  dormId?: string;
  stuId?: string[];
};

export async function dormList(
  params?: {
    currentPage?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.DormList>('/student/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function checkIn(data: CheckInData) {
  return request<CheckInData>('/student/add', {
    method: 'POST',
    data,
  });
}

export async function checkOut(options?: { [key: string]: any }) {
  return request<API.StudentList>('/student/delete', {
    method: 'POST',
    ...(options || {}),
  });
}
