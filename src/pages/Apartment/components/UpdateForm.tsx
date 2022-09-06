import type { ProColumns, ActionType, ProFormInstance } from '@ant-design/pro-components';
import { ProDescriptions, ModalForm, ProTable, ProFormText } from '@ant-design/pro-components';
import React, { useState, useRef, useEffect } from 'react';
import { Card, message, Button, Drawer } from 'antd';
import { dormDetail } from '@/services/apartments';

export type UpdateFormProps = {
  onCancel: any;
  infoDrawerOpen: boolean;
  dorm: API.DormList;
};

const defaultData: API.StudentList[] = [
  {
    stuId: '624748504',
    stuName: 'wjy',
    grade: 19,
  },
  {
    stuId: '624691229',
    stuName: 'wjy2',
    grade: 19,
  },
];

const InfoDrawer: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, infoDrawerOpen, dorm } = props;
  const [selectedRowsState, setSelectedRows] = useState<API.StudentList[]>([]);
  const [stuData, setStuData] = useState<API.StudentList[]>([]);
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

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

  const getStudentList = async (dormId: string) => {
    const stu = await dormDetail(dormId);
    console.log(stu);

    // setStuData(stu)
  };
  useEffect(() => {
    const stuList = getStudentList(dorm.dormId);
  }, [dorm]);

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
    <>
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
          // request={dormDetail}
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
            <Button type="primary" key="checkIn" onClick={() => setModalOpen(true)}>
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
      <ModalForm
        title="输入入住学生信息："
        formRef={formRef}
        visible={modalOpen}
        onVisibleChange={setModalOpen}
      >
        <ProFormText required width="md" name="stuId" label="学号" />
      </ModalForm>
    </>
  );
};

export default InfoDrawer;
