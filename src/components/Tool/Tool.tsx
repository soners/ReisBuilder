import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {CityTileEnum} from "../../models/CityTileEnum";
import {ITool} from "../../models/Tool";
import './Tool.css'

export interface ToolProps {
    tool: ITool;
    isActive: boolean;
    pickTool: (type: CityTileEnum) => void
}

export default function Tool({tool, isActive, pickTool}: ToolProps) {
    return (
        <IconButton
            className={"tool"}
            key={tool.type}
            onClick={() => pickTool(tool.type)}
            sx={{
                margin: '3px',
                color: isActive ? tool.color : '#000',
                backgroundColor: tool.backgroundColor
            }}
        >
            {tool.icon}
        </IconButton>
    )
}
