import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import { useRef } from 'react';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addUser } from '@/services/system/authorization';

export type UpdateFormProps = {
  shouldUpdate: () => void;
  onCancel: any;
  updateModalVisible: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, updateModalVisible, shouldUpdate } = props;
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      width="550px"
      title="添加用户"
      formRef={formRef}
      visible={updateModalVisible}
      onVisibleChange={(v) => {
        if (!v) {
          onCancel();
          formRef.current?.resetFields();
        }
      }}
      onFinish={async (value) => {
        console.log(value);
        const hide = message.loading('正在操作中...');
        try {
          const res = await addUser({ ...value });
          if (res.code === 200) {
            hide();
            message.success('操作成功！');
            shouldUpdate();
            return true;
          } else {
            hide();
            message.error('操作失败，请稍后重试！');
            return false;
          }
        } catch (error) {
          hide();
          message.error('操作失败，请稍后重试！');
          return false;
        }
      }}
    >
      <ProFormText required width="md" name="userName" label="用户名" />
      <ProFormText.Password required width="md" name="password" label="密码" />
      <ProFormRadio.Group
        name="userType"
        label="用户权限"
        required
        options={[
          {
            label: '系统管理员',
            value: 'admin',
          },
          {
            label: '宿舍管理员',
            value: 'dorm',
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
