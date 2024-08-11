import { ReduxProvider } from "@/redux/provider";
import { ConfigProvider } from "antd";
import PagesRotater from "@/components/PagesRotater";
import styles from "./index.module.css";

function RootPage() {
  const themeToken = {
    colorBgElevated: "#282827",
    colorText: "#fff",
    lineHeight: 0.5,
    borderRadiusLG: 4,
  };

  return (
    <div className={styles.main}>
      <ReduxProvider>
        <ConfigProvider
          theme={{
            token: themeToken,
          }}
        >
          <PagesRotater />
        </ConfigProvider>
      </ReduxProvider>
    </div>
  );
}

export default RootPage;
