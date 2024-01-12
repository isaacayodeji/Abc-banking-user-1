/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table } from "antd";
import { PageProps } from "../application/props";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";


export const PageTable: React.FC<PageProps.TableData> = ({
  column,
  dataSource,
  loading,
  scrollX,
}) => {

//   const itemRender = (current: any, type: any, originalElement: any) => {
//     if (type === "prev") {
//       return (
//         <a style={{ display: "flex", gap: "0.8rem", fontSize: 13 }}>
//           <LeftOutlined /> Previous
//         </a>
//       );
//     }
//     if (type === "next") {
//       return (
//         <a style={{ display: "flex", gap: "0.8rem", fontSize: 13 }}>
//           Next <RightOutlined />
//         </a>
//       );
//     }
//     return originalElement;
//   };

 

  return (
    <Table
      columns={column}
      loading={{ spinning: loading }}
      dataSource={dataSource}
      pagination={{
        position: ["bottomCenter"]}}
      scroll={{ x: scrollX }}
      className="shadow-sm overflow-y-auto"
    />
  );
};
