import React from "react";
import { Modal } from "antd";

const PersonDescription = ({ data }) => (
  <Modal
    title={data.title}
    visible={data.visible}
    onOk={data.onOk}
    onCancel={data.onCancel}
  >
    <p>SomeText</p>
  </Modal>
);

export default PersonDescription;
