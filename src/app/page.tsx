import { ReduxProvider } from "@/redux/provider";
import { ConfigProvider } from "antd";
import PagesRotater from "@/components/PagesRotater";

function RootPage() {
  const themeToken = {
    colorBgElevated: "#282827",
    colorText: "#fff",
    lineHeight: 0.5,
    borderRadiusLG: 4,
  };

  return (
    <ReduxProvider>
      <ConfigProvider
        theme={{
          token: themeToken,
        }}
      >
        <PagesRotater />
      </ConfigProvider>
    </ReduxProvider>
  );
}

export default RootPage;
