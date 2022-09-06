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
  const res = await request('/dorm/getAll', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  console.log(res);
  return { data: res.data.list };
}

export async function dormDetail(dormId: string) {
  const res = await request('dorm/get', {
    method: 'GET',
    params: { dormId },
  });
  console.log('dormDetail', res);
  return;
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
