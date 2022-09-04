import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = '2022秋工程设计·第二小组';

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={` ${defaultMessage}`}
    />
  );
};

export default Footer;
