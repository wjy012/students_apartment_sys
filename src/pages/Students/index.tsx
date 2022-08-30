import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import { Card } from 'antd';
import React from 'react';

const Students: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card>{JSON.stringify(initialState?.currentUser)}</Card>
    </PageContainer>
  );
};

export default Students;
