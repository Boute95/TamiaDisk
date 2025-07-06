import React from 'react';
import { Button, Flex, Divider } from "antd";
import { MdDriveFolderUpload } from "react-icons/md";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

interface ToolBarProps {
   className?: string;
   onFolderUp?: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ className, onFolderUp }) => {
   return (
      <Flex gap="small" align="center" className={`bg-white/20 ${className}`}>
         <Flex gap="small">
            <Button icon={<TiArrowLeft size={28} />} type="text" title="Previous" />
            <Button icon={<TiArrowRight size={28} />} type="text" title="Next" />
         </Flex>
         <Divider type="vertical" />
         <Button icon={<MdDriveFolderUpload size={28}/>} type="text" title="Folder Up" onClick={onFolderUp} />
      </Flex>
   );
};

export default ToolBar;
