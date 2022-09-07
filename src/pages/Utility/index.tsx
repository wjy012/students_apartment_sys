import type { ProDescriptionsActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { stuFee, getPrice, updatePrice } from '@/services/utility';
import { message } from 'antd';

const Utility: React.FC = () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  const [fee, setFee] = useState({});
  const getFee = async () => {
    const res = await getPrice();
    setFee(res);
  };
  useEffect(() => {
    getFee();
  }, []);
  const columns: ProColumns<API.FeeItem>[] = [
    {
      title: '学号',
      dataIndex: 'stuId',
    },
    {
      title: '姓名',
      dataIndex: 'stuName',
    },
    {
      title: '用水量/吨',
      dataIndex: 'waterNumber',
      search: false,
    },
    {
      title: '应交水费',
      search: false,
      valueType: 'money',
      renderText(_, record) {
        return record.waterNumber * fee.waterPrice;
      },
    },
    {
      title: '用电量/度',
      dataIndex: 'electricNumber',
      search: false,
    },
    {
      title: '应交电费',
      search: false,
      valueType: 'money',
      renderText(_, record) {
        return record.electricNumber * fee.electricPrice;
      },
    },
    {
      title: '总应付金额',
      // dataIndex: 'cost',
      search: false,
      valueType: 'money',
      sorter: (a, b) => a.cost - b.cost,
      renderText(_, record) {
        return record.waterNumber * fee.waterPrice + record.electricNumber * fee.electricPrice;
      },
    },
  ];

  return (
    <PageContainer>
      <ProDescriptions
        actionRef={actionRef}
        title="当前水电费标准"
        column={2}
        dataSource={fee}
        editable={{
          onSave: async (_, newInfo) => {
            const res = await updatePrice(newInfo);
            if (res.code === 200) {
              message.success('修改成功！');
              getFee();
              return true;
            } else {
              message.error('修改失败！');
            }
          },
        }}
      >
        <ProDescriptions.Item valueType={'money'} label="水费（RMB/吨）" dataIndex="waterPrice" />
        <ProDescriptions.Item
          valueType={'money'}
          label="电费（RMB/度）"
          dataIndex="electricPrice"
        />
      </ProDescriptions>
      <ProTable<API.FeeItem, API.PageParams>
        headerTitle="水电详情"
        actionRef={actionRef}
        rowKey="stuId"
        search={false}
        options={{
          search: true,
        }}
        columns={columns}
        request={stuFee}
      />
    </PageContainer>
  );
};

export default Utility;
