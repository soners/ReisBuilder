import * as React from "react";
import './Toolset.css'
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import ConstructionIcon from "@mui/icons-material/Construction";
import WaterIcon from '@mui/icons-material/Water';
import ParkIcon from '@mui/icons-material/Park';
import FenceIcon from '@mui/icons-material/Fence';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import {CityTileEnum} from "../../models/CityTileEnum";
import Tool from "../Tool/Tool";
import {ITool} from "../../models/Tool";
import {Button} from "@mui/material";

export interface ToolsetProps {
    tool: CityTileEnum;
    pickTool: (tool: CityTileEnum) => void;
    construct: () => void;
}


interface ToolsProps {
    activeTool: CityTileEnum;
    pickTool: (tool: CityTileEnum) => void;
}

export const tools: {
    [type: number]: ITool
} = {
    [CityTileEnum.EMPTY]: {
        type: CityTileEnum.EMPTY,
        icon: <AutoFixNormalIcon/>,
        color: '#e1b100',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.WALL]: {
        type: CityTileEnum.WALL,
        icon: <FenceIcon/>,
        color: '#581886',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.CITY]: {
        type: CityTileEnum.CITY,
        icon: <LocationCityRoundedIcon/>,
        color: '#dc2424',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.WATER]: {
        type: CityTileEnum.WATER,
        icon: <WaterIcon/>,
        color: '#43B3CC',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.GRASS]: {
        type: CityTileEnum.GRASS,
        icon: <ParkIcon/>,
        color: '#2E8B57',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.CLEAR]: {
        type: CityTileEnum.CLEAR,
        icon: <DeleteIcon/>,
        color: '#2E8B57',
        backgroundColor: '#fffacd'
    }
}

export const allTools: ITool[] = Object.values(tools);

function Tools({activeTool, pickTool}: ToolsProps) {
    return (
        <>{
            allTools.map(tool => (
                <Tool key={tool.type} tool={tool} isActive={activeTool === tool.type} pickTool={pickTool}/>
            ))
        }</>
    )
}

export default function Toolset({tool, pickTool, construct}: ToolsetProps) {
    return (
        <>
            <Tools activeTool={tool} pickTool={pickTool}/>
            <Button
                onClick={construct}
                variant={"contained"}
                color={"primary"} sx={{
                borderRadius: '25px',
            }}
                endIcon={<ConstructionIcon fontSize={"medium"}/>}
            >
                Construct
            </Button>
        </>
    )
}
