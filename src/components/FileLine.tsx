import prettyBytes from "pretty-bytes";
import { buildFullPath } from "../pruneData";
import { getIconForFile, getIconForFolder } from "vscode-icons-js";
// import { iconImages } from "./iconImages";
import { Draggable } from "react-beautiful-dnd";
import { invoke } from "@tauri-apps/api/tauri";

interface FileLineProps {
  item: DiskItem;
  // hoveredItem: DiskItem | null;
  // d3Chart: any;
  index: number;
  // deleteMap: Map<string, boolean>;
}
const mul = window.OS_TYPE === "Windows_NT" ? 1024 : 1000;
export const FileLine = ({
  item,
  // hoveredItem,
  // d3Chart,
  index,
  // deleteMap,
}: FileLineProps) => {

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className={
            "bg-gray-900 p-2 text-white flex justify-between rounded-md mt-1 pl-4 cursor-pointer hover:bg-black/20 " +
            ""
            // (hoveredItem && item.data && hoveredItem.id === item.data.id
            //   ? "bg-black/20"
            //   : " ") +
            // (deleteMap.has(item.data.id)
            //   ? "border border-red-800 hover:border-red-900"
            //   : " ")
          }
          onContextMenu={(e) => {
            e.preventDefault();
            invoke("show_in_folder", { path: buildFullPath(item) });
          }}
          // onClick={() => {
          //   item.children
          //     ? d3Chart.current.focusDirectory(
          //         item
          //       ) /*window.electron.diskUtils.showItemInFolder(buildFullPath(c))*/
          //     : invoke("show_in_folder", { path: buildFullPath(item) });
          // }}
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
            {/* {JSON.stringify(item.data)} */}
            {item &&
              (item.value / mul / mul / mul).toFixed(2)}{" "}
            GB
          </div>
        </div>
      )}
    </Draggable>
  );
};
