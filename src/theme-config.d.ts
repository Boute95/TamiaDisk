declare module './theme-config' {
  import { ThemeConfig } from 'antd';

  const themeConfig: {
    colors: {
      primary: string;
      primaryLight: string;
      secondary: string;
      primaryBg: string;
      primaryBgLight: string;
      textBase: string;
    };
  };
  export default themeConfig;
}