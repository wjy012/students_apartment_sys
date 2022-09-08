import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { studentList, deleteStudent } from '@/services/students';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.StudentList[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteStudent({
      stuId: selectedRows.map((row) => row.stuId),
    });
    hide();
    message.success('删除成功！');
    return true;
  } catch (error) {
    hide();
    message.error('同学当前有住宿，无法删除！');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('添加学生');

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StudentList>();
  const [selectedRowsState, setSelectedRows] = useState<API.StudentList[]>([]);

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
        男: {
          text: '男',
        },
        女: {
          text: '女',
        },
      },
    },
    {
      title: '宿舍号',
      dataIndex: 'dormId',
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
    {
      title: '年级',
      dataIndex: 'grade',
      hideInForm: true,
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
      <ProTable<API.StudentList, API.PageParams>
        headerTitle="学生列表"
        actionRef={actionRef}
        rowKey="stuId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setType('添加学生');
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined />
            添加学生
          </Button>,
        ]}
        request={studentList}
        columns={columns}
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

export default TableList;
