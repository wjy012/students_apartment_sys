import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addStudent, updateStudent } from '@/services/students';

export type UpdateFormProps = {
  shouldUpdate: () => void;
  onCancel: any;
  updateModalVisible: boolean;
  values: Partial<API.StudentList>;
  type: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, type, updateModalVisible, values, shouldUpdate } = props;
  const formRef = useRef<ProFormInstance>();

  const initialForm = (value: API.StudentList) => {
    formRef.current?.setFieldsValue({ ...value });
  };

  useEffect(() => {
    if (updateModalVisible === true && type === '修改信息') {
      initialForm(values);
    }
  }, [updateModalVisible]);

  return (
    <ModalForm
      layout="horizontal"
      width="550px"
      title={type}
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
          let res: any;
          if (type === '添加宿舍') res = await addStudent({ ...value });
          else res = await updateStudent({ ...value });
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
      <ProFormText required width="md" name="dormId" label="宿舍号" />
      <ProFormText required width="md" name="buildingNumber" label="宿舍楼" />
      <ProFormDigit required width="md" name="dormFloor" label="楼层" />
      <ProFormText required width="md" name="dormTotal" label="总床位" />
    </ModalForm>
  );
};

export default UpdateForm;
