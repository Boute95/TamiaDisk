import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { invoke } from "@tauri-apps/api/core";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

interface FileContextMenuProps {
  path: string;
  children: React.ReactNode;
}

const FileContextMenu = ({ path, children }: FileContextMenuProps) => {
  const items: MenuProps["items"] = [
    {
      key: "open",
      label: "Open",
      onClick: () => invoke("open_in_os", { path }),
    },
    {
      key: "show",
      label: "Show in folder",
      onClick: () => invoke("show_in_folder", { path }),
    },
    {
      key: "copy",
      label: "Copy path",
      onClick: () => writeText(path),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["contextMenu"]}>
      {children}
    </Dropdown>
  );
};

export default FileContextMenu;
