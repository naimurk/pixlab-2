import MainLayout from "@/Layout/General/MainLayout";
import { useParams } from "react-router-dom";
import { devices } from "../../constants/devices";

const Device = () => {
  const { device } = useParams();
  const deviceTitle = devices.find((d) => d.slug === device)?.title;
  console.log("🚀 ~ Device ~ deviceTitle:", deviceTitle, device);
  return (
    <>
      <h1 style={{ display: "none" }}>
        {deviceTitle ? `${deviceTitle} Mockup` : "Device Mockup"}
      </h1>
      <MainLayout device={device} />
    </>
  );
};

export default Device;
