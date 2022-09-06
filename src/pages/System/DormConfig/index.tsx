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
const handleRemove = async (selectedRows: API.DormList[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteStudent({
      stuId: selectedRows.map((row) => row.dormId),
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

const DormConfig: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('添加宿舍');

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.DormList>();
  const [selectedRowsState, setSelectedRows] = useState<API.DormList[]>([]);

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
      <ProTable<API.DormList, API.PageParams>
        headerTitle="宿舍列表"
        actionRef={actionRef}
        rowKey="dormId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setType('添加宿舍');
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined />
            添加宿舍
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

export default DormConfig;
