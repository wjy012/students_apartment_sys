import { ModalForm, ProFormTextArea, ProFormText } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addService } from '@/services/service';

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
      layout="horizontal"
      width="550px"
      title="添加记录"
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
          const res = await addService({
            ...value,
            isState: '1',
          });
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
      <ProFormText required width="md" name="dormitoryNo" label="宿 舍" />
      <ProFormTextArea required width="md" name="warrantyInfo" label="详 情" />
    </ModalForm>
  );
};

export default UpdateForm;
