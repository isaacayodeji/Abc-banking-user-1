import { ThemeConfig } from "antd";

export const getThemeConfig = (state: string): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#ff9933",
      colorPrimaryHover: "#030303",
    },
    components: {
      Table: {
        colorBorderSecondary: "#C4C4C4",
      },
      Menu: {
        colorItemBgSelected: "#ffffff",
        colorItemTextSelected: "#4da6ff",
        colorSubItemBg: "#ffffff",
        controlHeightLG: 40,
        lineWidth: 0,
      },
      Select: {
        controlHeight: 40,
      },
      DatePicker: {
        controlHeight: 40,
      },
      Radio: {
        colorBorder: "#006E01",
      },
      Pagination: {
        colorText: "#006e01",
      },
    },
  };
};
