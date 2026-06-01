import prettyBytes from "pretty-bytes";
import { buildFullPath } from "../pruneData";
import { getIconForFile, getIconForFolder } from "vscode-icons-js";
import { Draggable } from "react-beautiful-dnd";
import { invoke } from "@tauri-apps/api/core";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

interface FileLineProps {
  item: DiskItem;
  index: number;
  className?: string;
  setFocusedPath?: (path: string) => void;
}

const mul = window.OS_TYPE === "windows" ? 1024 : 1000;
export const FileLine = ({
  item,
  index,
  className = "",
  setFocusedPath,
}: FileLineProps) => {
  const path = buildFullPath(item);

  const menuItems: MenuProps["items"] = [
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
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <Dropdown menu={{ items: menuItems }} trigger={["contextMenu"]}>
          <div
            className={`p-2 text-white flex justify-between rounded-md mt-1 hover:bg-black/20 ${className}`}
            onClick={() => {
               if (setFocusedPath && item.id) {
                 setFocusedPath(item.id);
               }
             }}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef}
          >
            <img
              className="h-4 w-4 basis-1/12 mr-3"
              src={
                item.isLeaf
                  ? "/fileicons/" +
                    (getIconForFile(item.name) || "default_file.svg")
                  : "/fileicons/" + getIconForFolder(item.name)
              }
            />
            <div className="truncate basis-8/12 flex-1 shrink text-xs">
              {item.name}
            </div>
            <div className="flex-1 basis-3/12 text-right text-xs">
              {item &&
                ((item.value ?? item.data) / mul / mul / mul).toFixed(2)}{" "}
              GB
            </div>
          </div>
        </Dropdown>
      )}
    </Draggable>
  );
};
