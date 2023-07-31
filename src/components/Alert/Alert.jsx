import { Alert, Space } from "antd";

import PropTypes from "prop-types";

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

AlertComponent.defaultProps = {
  errorMsg: new Error("Unexpected error"),
};

AlertComponent.propTypes = {
  errorMsg: PropTypes.object,
};

export default AlertComponent;
