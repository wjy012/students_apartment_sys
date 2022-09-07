import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, FooterToolbar } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import UpdateForm from './components/UpdateForm';
import { discList, deleteDisc } from '@/services/discipline';

const handleRemove = async (selectedRows: API.StudentList[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteDisc({
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

const Discipline: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('添加记录');
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.DisciplineItem>({});
  const [selectedRowsState, setSelectedRows] = useState<API.DisciplineItem[]>([]);

  const columns: ProColumns<API.DisciplineItem>[] = [
    {
      title: '学号',
      dataIndex: 'stuId',
    },
    {
      title: '姓名',
      dataIndex: 'stuName',
      hideInForm: true,
    },
    {
      title: '宿舍',
      dataIndex: 'dormitoryNo',
      hideInForm: true,
    },
    {
      title: '原因',
      dataIndex: 'disciplinaryInfo',
      hideInForm: true,
      width: 450,
    },
    {
      title: '记录时间',
      dataIndex: 'disciplinaryTime',
      hideInForm: true,
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setType('修改信息');
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改信息
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.DisciplineItem, API.PageParams>
        headerTitle="记录列表"
        actionRef={actionRef}
        rowKey="stuId"
        search={{
          labelWidth: 120,
        }}
        request={discList}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setType('添加记录');
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined />
            添加记录
          </Button>,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        shouldUpdate={() => actionRef.current?.reloadAndRest?.()}
        type={type}
        onCancel={handleUpdateModalVisible}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default Discipline;
