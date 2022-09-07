import {
  ModalForm,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addDisc, updateDisc } from '@/services/discipline';

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
          if (type === '添加记录') res = await addDisc({ ...value });
          else res = await updateDisc({ ...value });
          if (res.code === 200) {
            hide();
            message.success('添加成功！');
            shouldUpdate();
            return true;
          } else {
            hide();
            message.error('添加失败，' + res.msg);
            return false;
          }
        } catch (error) {
          hide();
          message.error('添加失败，请稍后重试！');
          return false;
        }
      }}
    >
      <ProFormText required width="md" name="stuId" label="学 号" />
      <ProFormText required width="md" name="stuName" label="姓 名" />
      <ProFormText required width="md" name="dormitoryNo" label="宿 舍" />
      <ProFormDatePicker
        required
        width="md"
        name="disciplinaryTime"
        label="时 间"
        rules={[
          {
            type: 'date',
            max: Date.now() + 100000,
            message: '不能选择现在以后的时间！',
          },
        ]}
      />
      <ProFormTextArea required width="md" name="disciplinaryInfo" label="原 因" />
    </ModalForm>
  );
};

export default UpdateForm;
