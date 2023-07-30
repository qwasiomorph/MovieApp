import React from "react";
import { Alert, Space } from "antd";

const AlertComponent = ({ errorMsg }) => (
  <Space direction="vertical" style={{ width: "100%" }}>
    <Alert
      message="Error"
      description={errorMsg.message}
      type="error"
      showIcon
    />
  </Space>
);

export default AlertComponent;
