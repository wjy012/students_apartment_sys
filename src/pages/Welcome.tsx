import { PageContainer } from '@ant-design/pro-components';
import { Result, Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Result icon={<SmileOutlined />} title="你好" />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
