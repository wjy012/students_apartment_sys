import type { ProDescriptionsActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';

import { Card } from 'antd';
import React, { useRef } from 'react';

const test = {
  water: 20,
  electricity: 20,
};

const Utility: React.FC = () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  const columns: ProColumns<API.FeeItem>[] = [
    {
      title: '学号',
      dataIndex: 'stuId',
    },
    {
      title: '用水量',
      dataIndex: 'water',
      search: false,
    },
    {
      title: '用电量',
      dataIndex: 'electricity',
      search: false,
    },
  ];

  return (
    <PageContainer>
      <ProDescriptions
        actionRef={actionRef}
        title="当前水电费标准"
        column={2}
        dataSource={test}
        editable={{
          onSave: async (keypath, newInfo, oriInfo) => {
            console.log(keypath, newInfo, oriInfo);
            return true;
          },
        }}
      >
        <ProDescriptions.Item label="水费（RMB/吨）" dataIndex="water" />
        <ProDescriptions.Item label="电费（RMB/度）" dataIndex="electricity" />
        <ProDescriptions.Item label="总计用水" dataIndex="water" editable={false} />
        <ProDescriptions.Item label="总计用电" dataIndex="electricity" editable={false} />
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
      />
    </PageContainer>
  );
};

export default Utility;
