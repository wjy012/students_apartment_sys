import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import InfoDrawer from './components/UpdateForm';
import { dormList } from '@/services/apartments';

const test: API.DormList[] = [
  {
    dormId: 'II609',
    dormFloor: '6F',
    dormType: '14',
    dormRemainder: 1,
    dormTotal: 14,
    buildingNumber: 11,
  },
];

const Apartment: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [infoDrawerOpen, setInfoDrawerOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.DormList>({});

  const columns: ProColumns<API.DormList>[] = [
    {
      title: '宿舍号',
      dataIndex: 'dormId',
    },
    {
      title: '楼栋',
      dataIndex: 'buildingNumber',
      hideInForm: true,
    },
    {
      title: '楼层',
      dataIndex: 'dormFloor',
      hideInForm: true,
      valueType: 'digit',
    },
    {
      title: '宿舍类型',
      dataIndex: 'dormType',
      hideInForm: true,
    },
    {
      title: '剩余床位',
      dataIndex: 'dormRemainder',
      hideInForm: true,
      search: false,
      valueType: 'digit',
    },
    {
      title: '是否满员',
      hideInTable: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '是',
        },
        1: {
          text: '否',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setInfoDrawerOpen(true);
            setCurrentRow(record);
          }}
        >
          查看/管理
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.DormList, API.PageParams>
        headerTitle="宿舍列表"
        actionRef={actionRef}
        rowKey="dormId"
        search={{
          labelWidth: 120,
        }}
        // request={dormList}
        columns={columns}
        dataSource={test}
      />
      <InfoDrawer
        onCancel={() => setInfoDrawerOpen(false)}
        infoDrawerOpen={infoDrawerOpen}
        dorm={currentRow}
      />
    </PageContainer>
  );
};

export default Apartment;
