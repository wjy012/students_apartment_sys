import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addStudent, updateStudent } from '@/services/students';

export type FormValueType = {
  stuId?: string;
  dormId?: string;
  stuName?: string;
  stuSex?: string;
} & Partial<API.StudentList>;

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
        const hide = message.loading('正在操作中...');
        try {
          let res: any;
          if (type === '添加学生') res = await addStudent({ ...value });
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
      <ProFormText required width="md" name="stuId" label="学号" />
      <ProFormText required width="md" name="stuName" label="姓名" />
      <ProFormRadio.Group
        name="stuSex"
        label="性别"
        required
        options={[
          {
            label: '男',
            value: '男',
          },
          {
            label: '女',
            value: '女',
          },
        ]}
      />
      <ProFormText width="md" name="dormId" label="宿舍号" />
      <ProFormText width="md" name="major" label="专 业" />
      <ProFormText width="md" name="faculty" label="学 院" />
      <ProFormText width="md" name="grade" label="年 级" />
    </ModalForm>
  );
};

export default UpdateForm;
