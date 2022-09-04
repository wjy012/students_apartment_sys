import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { Alert, Card, Typography } from 'antd';
import { useAccess } from 'umi';
import React from 'react';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const access = useAccess();

  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        {initialState?.currentUser?.access}
        <CodePreview>yarn add @ant-design/pro-components</CodePreview>
        {JSON.stringify(access)}
      </Card>
    </PageContainer>
  );
};

export default Welcome;
