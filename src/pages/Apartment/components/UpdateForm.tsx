import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { ProTable, FooterToolbar } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { useRef } from 'react';
import { Card, message, Button, Drawer } from 'antd';

export type UpdateFormProps = {
  onCancel: any;
  infoDrawerOpen: boolean;
  dorm: API.DormList;
};

const defaultData: API.StudentList[] = [
  {
    stuId: '624748504',
    stuName: 'wjy',
    stuSex: 'female',
    grade: 19,
  },
  {
    stuId: '624691229',
    stuName: 'wjy2',
    stuSex: 'female',
    grade: 19,
  },
];

const InfoDrawer: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, infoDrawerOpen, dorm } = props;
  const [selectedRowsState, setSelectedRows] = useState<API.StudentList[]>([]);

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.StudentList>[] = [
    {
      title: '学号',
      dataIndex: 'stuId',
    },
    {
      title: '姓名',
      dataIndex: 'stuName',
      valueType: 'textarea',
    },
    {
      title: '性别',
      dataIndex: 'stuSex',
      hideInForm: true,
      valueEnum: {
        male: {
          text: '男',
        },
        female: {
          text: '女',
        },
      },
    },
    {
      title: '年级',
      dataIndex: 'grade',
      hideInForm: true,
    },
    {
      title: '专业',
      dataIndex: 'major',
      hideInForm: true,
    },
    {
      title: '学院',
      dataIndex: 'faculty',
      hideInForm: true,
    },
  ];

  const handleAdd = async (fields: API.StudentList) => {
    const hide = message.loading('正在操作中');
    try {
      // await addStudent({ ...fields });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  return (
    <Drawer title="详细信息" visible={infoDrawerOpen} onClose={onCancel} size="large">
      <Card>
        <ProDescriptions title={dorm.dormId} column={2} dataSource={dorm}>
          <ProDescriptions.Item label="楼栋" dataIndex="buildingNumber" />
          <ProDescriptions.Item label="楼层" dataIndex="dormFloor" />
          <ProDescriptions.Item label="类型" dataIndex="dormType" />
          <ProDescriptions.Item label="已住人数" dataIndex="dormRemainder" />
        </ProDescriptions>
      </Card>
      <ProTable<API.StudentList>
        actionRef={actionRef}
        dataSource={defaultData}
        rowKey="stuId"
        pagination={false}
        columns={columns}
        search={false}
        dateFormatter="string"
        headerTitle="入住学生"
        toolBarRender={() => [
          <Button type="default" key="checkOut" disabled={selectedRowsState?.length === 0}>
            办理退宿
          </Button>,
          <Button type="primary" key="checkIn">
            学生入住
          </Button>,
        ]}
        toolbar={{
          settings: undefined,
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
    </Drawer>
  );
};

export default InfoDrawer;
