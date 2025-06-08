import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import diskIcon from "../assets/harddisk.png";
import {
   buildPath,
   getViewNode,
   getViewNodeGraph,
   buildFullPath,
   diskItemToD3Hierarchy,
   itemMap,
} from "../pruneData";
import { FileLine } from "./FileLine";
import { ParentFolder } from "./ParentFolder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import { removeFile, removeDir } from "@tauri-apps/api/fs";
import { ResponsiveTreeMapHtml } from "@nivo/treemap";
(window as any).LockDNDEdgeScrolling = () => true;

const Scanning = () => {
   let {
      state: { disk, used, fullscan },
   } = useLocation() as any;

   const navigate = useNavigate();
   const baseData = useRef<DiskItem | null>(null);
   const baseDataD3Hierarchy = useRef<D3HierarchyDiskItem | null>(null);
   const data = {
      name: "nivo",
      children: [
         {
            name: "viz",
            children: [
               {
                  name: "stack",
                  children: [
                     {
                        name: "cchart",
                        loc: 106382,
                     },
                     {
                        name: "xAxis",
                        loc: 73477,
                     },
                     {
                        name: "yAxis",
                        loc: 115115,
                     },
                     {
                        name: "layers",
                        loc: 109847,
                     },
                  ],
               },
               {
                  name: "ppie",
                  children: [
                     {
                        name: "chart",
                        children: [
                           {
                              name: "pie",
                              children: [
                                 {
                                    name: "outline",
                                    loc: 129724,
                                 },
                                 {
                                    name: "slices",
                                    loc: 95027,
                                 },
                                 {
                                    name: "bbox",
                                    loc: 99865,
                                 },
                              ],
                           },
                           {
                              name: "donut",
                              loc: 75052,
                           },
                           {
                              name: "gauge",
                              loc: 135603,
                           },
                        ],
                     },
                     {
                        name: "legends",
                        loc: 93269,
                     },
                  ],
               },
            ],
         },
         {
            name: "colors",
            children: [
               {
                  name: "rgb",
                  loc: 7268,
               },
               {
                  name: "hsl",
                  loc: 184934,
               },
            ],
         },
         {
            name: "utils",
            children: [
               {
                  name: "randomize",
                  loc: 92638,
               },
               {
                  name: "resetClock",
                  loc: 189237,
               },
               {
                  name: "noop",
                  loc: 61142,
               },
               {
                  name: "tick",
                  loc: 45634,
               },
               {
                  name: "forceGC",
                  loc: 169876,
               },
               {
                  name: "stackTrace",
                  loc: 159868,
               },
               {
                  name: "dbg",
                  loc: 94993,
               },
            ],
         },
         {
            name: "generators",
            children: [
               {
                  name: "address",
                  loc: 173254,
               },
               {
                  name: "city",
                  loc: 90845,
               },
               {
                  name: "animal",
                  loc: 140233,
               },
               {
                  name: "movie",
                  loc: 84750,
               },
               {
                  name: "user",
                  loc: 83448,
               },
            ],
         },
         {
            name: "set",
            children: [
               {
                  name: "clone",
                  loc: 22153,
               },
               {
                  name: "intersect",
                  loc: 37460,
               },
               {
                  name: "merge",
                  loc: 189520,
               },
               {
                  name: "reverse",
                  loc: 157981,
               },
               {
                  name: "toArray",
                  loc: 115704,
               },
               {
                  name: "toObject",
                  loc: 162027,
               },
               {
                  name: "fromCSV",
                  loc: 115590,
               },
               {
                  name: "slice",
                  loc: 158149,
               },
               {
                  name: "append",
                  loc: 129285,
               },
               {
                  name: "prepend",
                  loc: 190715,
               },
               {
                  name: "shuffle",
                  loc: 176104,
               },
               {
                  name: "pick",
                  loc: 128279,
               },
               {
                  name: "plouc",
                  loc: 101890,
               },
            ],
         },
         {
            name: "text",
            children: [
               {
                  name: "trim",
                  loc: 8811,
               },
               {
                  name: "slugify",
                  loc: 8160,
               },
               {
                  name: "snakeCase",
                  loc: 24758,
               },
               {
                  name: "camelCase",
                  loc: 19670,
               },
               {
                  name: "repeat",
                  loc: 121939,
               },
               {
                  name: "padLeft",
                  loc: 101556,
               },
               {
                  name: "padRight",
                  loc: 149978,
               },
               {
                  name: "sanitize",
                  loc: 103041,
               },
               {
                  name: "ploucify",
                  loc: 71618,
               },
            ],
         },
         {
            name: "misc",
            children: [
               {
                  name: "greetings",
                  children: [
                     {
                        name: "hey",
                        loc: 66948,
                     },
                     {
                        name: "HOWDY",
                        loc: 105090,
                     },
                     {
                        name: "aloha",
                        loc: 189019,
                     },
                     {
                        name: "AHOY",
                        loc: 75273,
                     },
                  ],
               },
               {
                  name: "other",
                  loc: 94554,
               },
               {
                  name: "path",
                  children: [
                     {
                        name: "pathA",
                        loc: 57886,
                     },
                     {
                        name: "pathB",
                        children: [
                           {
                              name: "pathB1",
                              loc: 129198,
                           },
                           {
                              name: "pathB2",
                              loc: 17577,
                           },
                           {
                              name: "pathB3",
                              loc: 198262,
                           },
                           {
                              name: "pathB4",
                              loc: 36090,
                           },
                        ],
                     },
                     {
                        name: "pathC",
                        children: [
                           {
                              name: "pathC1",
                              loc: 145022,
                           },
                           {
                              name: "pathC2",
                              loc: 6721,
                           },
                           {
                              name: "pathC3",
                              loc: 65938,
                           },
                           {
                              name: "pathC4",
                              loc: 140452,
                           },
                           {
                              name: "pathC5",
                              loc: 149936,
                           },
                           {
                              name: "pathC6",
                              loc: 149614,
                           },
                           {
                              name: "pathC7",
                              loc: 20078,
                           },
                           {
                              name: "pathC8",
                              loc: 29108,
                           },
                           {
                              name: "pathC9",
                              loc: 89092,
                           },
                        ],
                     },
                  ],
               },
            ],
         },
      ],
   };

   // Current Directory
   const [focusedDirectory, setFocusedDirectory] = useState<D3HierarchyDiskItem | null>(
      null
   );
   // Hovered Item
   const [hoveredItem, setHoveredItem] = useState<DiskItem | null>(null);

   const d3Chart = useRef(null) as any;
   const [view, setView] = useState("loading");
   const [bytesProcessed, setByteProcessed] = useState(0);
   const [status, setStatus]: any = useState();
   const [deleteState, setDeleteState] = useState({
      isDeleting: false,
      total: 0,
      current: 0,
   });

   const [deleteList, setDeleteList] = useState<Array<D3HierarchyDiskItem>>([]);
   const deleteMap = useRef<Map<string, boolean>>(new Map());
   // Avvio il worker e attendo i dati
   useEffect(() => {
      if (baseData.current) {
         // Skip if already loaded data
         return;
      }
      const unlisten = listen("scan_status", (event: any) => {
         // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
         // event.payload is the payload object
         setStatus(event.payload);
      });

      const unlisten2 = listen("scan_completed", (event: any) => {
         // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
         // event.payload is the payload object
         baseData.current = JSON.parse(event.payload).tree;
         const mapped = itemMap(baseData.current);
         baseDataD3Hierarchy.current = diskItemToD3Hierarchy(mapped as any);
         setView("disk");
      });

      invoke("start_scanning", { path: disk, ratio: fullscan ? "0" : "0.001" });

      return () => {
         unlisten.then((f) => f());
         unlisten2.then((f) => f());
         invoke("stop_scanning", { path: disk });
         //   worker.current!.postMessage({ type: "stop" });
      };
   }, [disk, setStatus]);

   // Appena ho i dati
    useEffect(() => {
       if (view == 'disk') {
          // Remove old chart
          const rootDir = baseDataD3Hierarchy.current!
          setFocusedDirectory(rootDir)
       }
    }, [view])
   // Avoid progress bar going to the star due to undetectable fs hardlinks
   const cappedTotal = Math.min(status ? status.total : 0, used);
   return (
      <>
         {view == "loading" && status && (
            <div className="flex-1 flex flex-col justify-center items-center justify-items-center">
               <img src={diskIcon} className="w-16 h-16"></img>
               <div className="w-2/3">
                  <div className="mt-5 mb-1 text-base text-center font-medium text-white">
                     Scanning {disk} {((cappedTotal / used) * 100).toFixed(2)}
                     %
                     <br />
                     {/* <span className="text-sm">{itemPath}</span> */}
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                     <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                           width: ((cappedTotal / used) * 100).toFixed(2) + "%",
                        }}
                     ></div>
                  </div>
               </div>
               <button
                  onClick={() => navigate("/")}
                  className="mt-6 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:ring-blue-300 focus:ring-blue-800"
               >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75  bg-gray-900 rounded-md group-hover:bg-opacity-0">
                     Back
                  </span>
               </button>
            </div>
         )}
         {view == "disk" && (
            <div className="flex-1 flex">
               <DragDropContext
                  onDragEnd={(result) => {
                     console.log(result);
                     if (result.destination?.droppableId !== "deletelist") {
                        return;
                     }
                     const item = focusedDirectory!.children!.find(
                        (i) => i.data.id === result.draggableId
                     );
                     setDeleteList((val) => {
                        if (!val.find((e) => e.data.id === item!.data.id)) {
                           deleteMap.current.set(item!.data.id, true);

                           return [...val, item!];
                        } else {
                           return val;
                        }
                     });
                  }}
               >
                  <div className="flex flex-1">
                     <div className="flex-1 flex">
                        <ResponsiveTreeMapHtml
                           data={data}
                           identity="name"
                           value="loc"
                           labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                           parentLabelTextColor={{
                              from: "color",
                              modifiers: [["darker", 3]],
                           }}
                           colors={{ scheme: "yellow_orange_red" }}
                        />
                     </div>

                     <div className="bg-gray-900 w-1/3 p-2 flex flex-col">
                        {focusedDirectory && (
                           <ParentFolder
                              focusedDirectory={focusedDirectory}
                              d3Chart={d3Chart}
                           ></ParentFolder>
                        )}
                        <Droppable droppableId="filelist">
                           {(provided) => (
                              <div
                                 className="overflow-y-auto"
                                 style={{ flex: "1 1 auto", height: 100 }}
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                              >
                                 {focusedDirectory &&
                                    focusedDirectory.children &&
                                    focusedDirectory.children.map((c, index) => (
                                       <FileLine
                                          key={c.data.id}
                                          item={c}
                                          hoveredItem={hoveredItem}
                                          d3Chart={d3Chart}
                                          index={index}
                                          deleteMap={deleteMap.current}
                                       ></FileLine>
                                    ))}

                                 {provided.placeholder}
                              </div>
                           )}
                        </Droppable>
                        <Droppable droppableId="deletelist">
                           {(provided) => (
                              <div
                                 className="pt-1 flex-initial"
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                              >
                                 <div className="rounded-lg border	border-gray-500	border-dashed p-2 text-gray-500 text-center mb-0">
                                    {deleteList.length == 0 && (
                                       <>Drag file and folders here to delete</>
                                    )}
                                    {deleteList.length > 0 && (
                                       <div>
                                          <div>
                                             {deleteList.length} files selected -{" "}
                                             <a
                                                href="#"
                                                className="underline underline-offset-2"
                                                onClick={() => {
                                                   setDeleteList([]);
                                                   deleteMap.current.clear();
                                                }}
                                             >
                                                Clear Selection
                                             </a>
                                          </div>
                                       </div>
                                    )}
                                    <div>{provided.placeholder}</div>
                                    {deleteList.length > 0 && (
                                       <button
                                          onClick={async () => {
                                             setDeleteState({
                                                isDeleting: true,
                                                total: deleteList.length,
                                                current: 0,
                                             });
                                             // Avvio spinner
                                             let successful: Array<D3HierarchyDiskItem> =
                                                [];
                                             // Cancello (errori li scarto da eliminare quindi vengono tenuti)
                                             for (let node of deleteList) {
                                                const nodePath = buildFullPath(node)
                                                   .replace("\\/", "/")
                                                   .replace("\\", "/");
                                                try {
                                                   //   await window.electron.diskUtils.rimraf(
                                                   //     nodePath
                                                   //   );
                                                   //   if (
                                                   //     node.children &&
                                                   //     node.children.length > 0
                                                   //   ) {
                                                   // Workaroound: Since sometimes if the tree has some trimmed leafs a folder has no children
                                                   removeDir(nodePath, {
                                                      recursive: true,
                                                   }).catch((err) =>
                                                      removeFile(nodePath).catch((err2) =>
                                                         console.error(err, err2)
                                                      )
                                                   );
                                                   //   } else {
                                                   //     removeFile(nodePath).catch((err) => console.error(err));
                                                   //   }
                                                   successful.push(node);
                                                   setDeleteState((prev) => ({
                                                      ...prev,
                                                      current: prev.current + 1,
                                                   }));
                                                } catch (e) {
                                                   console.error(e);
                                                }
                                             }
                                             // Una volta finito aggiorno il grafico
                                             d3Chart.current.deleteNodes(successful);
                                             setDeleteState((prev) => ({
                                                isDeleting: false,
                                                total: 0,
                                                current: 0,
                                             }));
                                             setDeleteList([]);
                                             deleteMap.current.clear();
                                          }}
                                          type="button"
                                          disabled={deleteState.isDeleting}
                                          className="text-white w-full mt-3 bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:ring-red-800 shadow-sm shadow-red-500/50 shadow-lg shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                       >
                                          {deleteState.isDeleting
                                             ? "Deleting " +
                                               deleteState.current +
                                               " of " +
                                               deleteState.total
                                             : "Delete"}
                                       </button>
                                    )}
                                 </div>
                              </div>
                           )}
                        </Droppable>
                     </div>
                  </div>
               </DragDropContext>
            </div>
         )}
      </>
   );
};

export default Scanning;
