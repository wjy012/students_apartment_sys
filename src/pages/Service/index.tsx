import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { serviceList, updateService } from '@/services/service';

const Service: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const columns: ProColumns<API.ServiceItem>[] = [
    {
      title: '保修编号',
      dataIndex: 'id',
      editable: false,
      width: '7%',
    },
    {
      title: '宿舍',
      dataIndex: 'dormitoryNo',
      hideInForm: true,
      width: '10%',
      editable: false,
    },
    {
      title: '报修信息',
      dataIndex: 'warrantyInfo',
      hideInForm: true,
      editable: false,
    },
    {
      title: '申请时间',
      dataIndex: 'applicationTime',
      valueType: 'date',
      hideInForm: true,
      editable: false,
    },
    {
      title: '状态',
      dataIndex: 'isState',
      hideInForm: true,
      width: '10%',
      valueEnum: {
        0: {
          text: '已取消',
          status: 'Default',
        },
        1: {
          text: '待处理',
          status: 'Warning',
        },
        2: {
          text: '已派出',
          status: 'Processing',
        },
        3: {
          text: '已完成',
          status: 'Success',
        },
      },
    },
    {
      title: '维修时间',
      dataIndex: 'warrantyTime',
      valueType: 'date',
      hideInForm: true,
      width: '15%',
      editable: (text) => {
        return !text;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ServiceItem, API.PageParams>
        headerTitle="报修记录列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined />
            添加记录
          </Button>,
        ]}
        request={serviceList}
        columns={columns}
        editable={{
          type: 'single',
          editableKeys,
          onSave: async (_, data) => {
            const res = await updateService(data);
            if (res.code === 200) {
              message.success('修改成功！');
            } else {
              message.error(res.msg);
            }
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />
      <UpdateForm
        shouldUpdate={() => actionRef.current?.reloadAndRest?.()}
        onCancel={handleUpdateModalVisible}
        updateModalVisible={updateModalVisible}
      />
    </PageContainer>
  );
};

export default Service;
