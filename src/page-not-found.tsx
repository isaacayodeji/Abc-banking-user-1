import { Button, Result } from "antd";
import React, { useLayoutEffect } from "react";

export const PageNotFound: React.FC = () => {
  useLayoutEffect(() => {
    document.title = "Page Not Found | Abc ";
  }, []);

  return (
    <>
      <Result
        status="404"
        title={<h1 className="font-bold">Page Not Found</h1>}
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => window.history.back()}
            className="bg-orange-600"
          >
            Go back
          </Button>
        }
      />
    </>
  );
};
