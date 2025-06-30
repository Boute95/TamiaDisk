import { invoke } from "@tauri-apps/api/tauri";
import { buildFullPath } from "../pruneData";

interface ParentFolderProps {
   parentPath: DiskItem;
}
export const ParentFolder = ({ parentPath }: ParentFolderProps) => {
   const mul = window.OS_TYPE === "Windows_NT" ? 1024 : 1000;

   return (
      <div
         className="bg-gray-800 p-2 text-white flex justify-between rounded-md cursor-pointer"
        //  onContextMenu={(e) => {
        //     e.preventDefault();
        //     invoke("show_in_folder", { path: buildFullPath(parentPath) });
        //  }}
         onClick={() => {
            // d3Chart.current.backToParent(parentPath.parent);
            /*window.electron.diskUtils.openPath(buildFullPath(focusedDirectory));*/
            // TODO: change focuesedDirectory to parent path 
         }}
      >
         <div className="">
            {/* {focusedDirectory && (
          <img
            src={
              iconImages[getIconForFolder(focusedDirectory.data.name)].default
            }
            className="h-6 w-6 mr-3"
          ></img>
        )} */}
         </div>
         <div className="truncate pr-6 flex-1 text-xs">
            {parentPath &&
               parentPath.name.replace("\\/", "/").replace("\\", "/")}
         </div>
         <div className="text-xs">
            {parentPath && (parentPath.data! / mul / mul / mul).toFixed(2)} GB
         </div>
      </div>
   );
};
