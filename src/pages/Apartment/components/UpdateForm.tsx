import { ProColumns, ActionType, ProFormInstance, ProFormSelect } from '@ant-design/pro-components';
import { ProDescriptions, ModalForm, ProTable, ProFormText } from '@ant-design/pro-components';
import React, { useState, useRef, useEffect } from 'react';
import { Card, message, Button, Drawer } from 'antd';
import { dormDetail, checkIn, checkOut } from '@/services/apartments';
import { flattenObj } from '@/utils/object';
import type { DefaultOptionType } from 'antd/lib/select';

export type UpdateFormProps = {
  onCancel: any;
  infoDrawerOpen: boolean;
  dorm: API.DormList;
};

const InfoDrawer: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, infoDrawerOpen, dorm } = props;
  const [selectedRowsState, setSelectedRows] = useState<API.StudentList[]>([]);
  const [emptyBed, setEmptyBed] = useState<number[]>([]);
  const [stuData, setStuData] = useState<API.StudentList[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const columns: ProColumns<API.StudentList>[] = [
    {
      title: '床位',
      dataIndex: 'bedId',
    },
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
    const res = await dormDetail(dormId);
    let stu: API.StudentList[] = [];
    let empty: number[] = [];
    res.forEach((item: any) => {
      if (item.student) stu.push(flattenObj()(item));
      else empty.push(item.bedId);
    });
    setEmptyBed(empty);
    setStuData(stu);
  };
  useEffect(() => {
    getStudentList(dorm.dormId);
  }, [dorm]);

  const handleCheckIn = async (value: API.CheckInData) => {
    const hide = message.loading('正在操作中');
    try {
      const res = await checkIn({ ...value, dormId: dorm.dormId });
      hide();
      if (res.code === 200) {
        message.success('操作成功！');
        getStudentList(dorm.dormId);
        return true;
      } else {
        message.error('操作失败，请稍后重试！');
        return false;
      }
    } catch (error) {
      hide();
      message.error('操作失败，请稍后重试！');
      return false;
    }
  };

  const handleCheckOut = async (selectedRows: API.StudentList[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await checkOut({
        stuId: selectedRows.map((row) => row.stuId),
      });
      hide();
      message.success('删除成功！');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请稍后再试！');
      return false;
    }
  };

  return (
    <>
      <Drawer
        title="详细信息"
        visible={infoDrawerOpen}
        onClose={() => {
          onCancel();
          setSelectedRows([]);
          setStuData([]);
        }}
        size="large"
      >
        <Card>
          <ProDescriptions title={dorm.dormId} column={2} dataSource={dorm}>
            <ProDescriptions.Item label="楼栋" dataIndex="buildingNumber" />
            <ProDescriptions.Item label="楼层" dataIndex="dormFloor" />
            <ProDescriptions.Item label="类型" dataIndex="dormType" />
            <ProDescriptions.Item label="剩余床位" dataIndex="dormRemainder" />
          </ProDescriptions>
        </Card>
        <ProTable<API.StudentList>
          actionRef={actionRef}
          dataSource={stuData}
          rowKey="bedId"
          pagination={false}
          columns={columns}
          search={false}
          dateFormatter="string"
          headerTitle="入住学生"
          toolBarRender={() => [
            <Button
              type="default"
              key="checkOut"
              disabled={selectedRowsState?.length === 0}
              onClick={async () => {
                await handleCheckOut(selectedRowsState);
                setSelectedRows([]);
                getStudentList(dorm.dormId);
              }}
            >
              办理退宿
            </Button>,
            <Button
              type="primary"
              key="checkIn"
              disabled={!emptyBed.length}
              onClick={() => setModalOpen(true)}
            >
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
        width={500}
        title="输入入住学生信息："
        formRef={formRef}
        visible={modalOpen}
        onVisibleChange={(v) => {
          setModalOpen(v);
          formRef.current?.resetFields();
        }}
        onFinish={handleCheckIn}
      >
        <ProFormText required width="md" name="stuId" label="学号" />
        <ProFormSelect
          required
          width="md"
          name="bedId"
          label="入住床位"
          options={emptyBed.map((e) => {
            return {
              label: e,
              value: e,
            };
          })}
        />
      </ModalForm>
    </>
  );
};

export default InfoDrawer;
