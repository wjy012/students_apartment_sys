import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import { useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addStudent } from '@/services/students';

export type FormValueType = {
  stuId?: string;
  dormId?: string;
  stuName?: string;
  stuSex?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: any;
  onSubmit: (values: FormValueType) => Promise<boolean>;
  updateModalVisible: boolean;
  // values: Partial<API.StudentList>;
  values: any;
  type: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, onSubmit, type, updateModalVisible, values } = props;
  const formRef = useRef<ProFormInstance>();
  console.log(values);

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
        const res = await addStudent({ ...value });
        console.log(res);
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
            value: 'male',
          },
          {
            label: '女',
            value: 'female',
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
