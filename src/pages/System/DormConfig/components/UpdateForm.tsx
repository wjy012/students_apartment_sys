import { ModalForm, ProFormDigit, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addDorm, updateDorm } from '@/services/system/dormConfig';

export type UpdateFormProps = {
  shouldUpdate: () => void;
  onCancel: any;
  updateModalVisible: boolean;
  values: Partial<API.DormList>;
  type: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onCancel, type, updateModalVisible, values, shouldUpdate } = props;
  const formRef = useRef<ProFormInstance>();

  const initialForm = (value: API.DormList) => {
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
          if (type === '添加宿舍') res = await addDorm({ ...value });
          else res = await updateDorm({ ...value });
          if (res.code === 200) {
            hide();
            message.success('操作成功！');
            shouldUpdate();
            return true;
          } else {
            hide();
            message.error(res.msg);
            return false;
          }
        } catch (error) {
          hide();
          message.error('操作失败，请稍后重试！');
          return false;
        }
      }}
    >
      <ProFormText
        required
        width="md"
        name="dormId"
        label="宿舍号"
        disabled={type === '修改信息'}
      />
      <ProFormText
        required
        width="md"
        name="buildingNumber"
        label="宿舍楼"
        disabled={type === '修改信息'}
      />
      <ProFormDigit
        required
        width="md"
        name="dormFloor"
        label="楼 层"
        disabled={type === '修改信息'}
      />
      <ProFormRadio.Group
        name="dormType"
        label="宿舍类型"
        required
        options={[
          {
            label: '男生宿舍',
            value: '男',
          },
          {
            label: '女生宿舍',
            value: '女',
          },
        ]}
      />
      <ProFormText required width="md" name="dormTotal" label="总床位" />
    </ModalForm>
  );
};

export default UpdateForm;
