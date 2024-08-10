import styles from "@/components/PagesRotater/components/RotateBox/index.module.css";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

// @ts-ignore
import Decimal from "decimal";
import { setScale } from "@/redux/features/rotater-slice";

type ButtonGroupType = {
  handleRotateAllPdf: () => void;
  handleRemovePdf: () => void;
};

function ButtonGroup({ handleRotateAllPdf, handleRemovePdf }: ButtonGroupType) {
  const dispatch = useDispatch<AppDispatch>();
  const scale = useAppSelector((state) => state.rotaterReducer.scale);

  const incScale = () => {
    if (scale < 4) {
      dispatch(setScale(Decimal(scale).add(0.2).toNumber()));
    }
  };

  const decScale = () => {
    if (scale > 0.4) {
      dispatch(setScale(Decimal(scale).add(-0.2).toNumber()));
    }
  };

  return (
    <div className={styles.buttonGroup}>
      <button className={styles.orangeButton} onClick={handleRotateAllPdf}>
        Rotate all
      </button>
      <button className={styles.blackButton} onClick={handleRemovePdf}>
        Remove PDF
      </button>
      <button
        className={styles.circleButton}
        disabled={scale === 4}
        onClick={incScale}
      >
        <ZoomInOutlined style={{ fontSize: "16px" }} />
      </button>
      <button
        className={styles.circleButton}
        disabled={scale === 0.4}
        onClick={decScale}
      >
        <ZoomOutOutlined style={{ fontSize: "16px" }} />
      </button>
    </div>
  );
}

export default ButtonGroup;
