import * as React from "react";
import './Toolset.css'
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import ConstructionIcon from "@mui/icons-material/Construction";
import WaterIcon from '@mui/icons-material/Water';
import ParkIcon from '@mui/icons-material/Park';
import FenceIcon from '@mui/icons-material/Fence';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import {CityTileEnum} from "../../models/CityTileEnum";
import Tool from "../Tool/Tool";
import {Button} from "@mui/material";

export interface ToolsetProps {
    tool: CityTileEnum;
    pickTool: (tool: CityTileEnum) => void;
    isConstructing: boolean;
    construct: () => void;
}

interface ToolsProps {
    activeTool: CityTileEnum;
    pickTool: (tool: CityTileEnum) => void;
}

const tools = [
    {
        type: CityTileEnum.TUTORIAL,
        icon: <QuestionMarkIcon/>,
        color: '#2E8B57',
        backgroundColor: '#fffacd'
    },
    {
        type: CityTileEnum.EMPTY,
        icon: <AutoFixNormalIcon/>,
        color: '#e1b100',
        backgroundColor: '#fffacd'
    },
    {
        type: CityTileEnum.CLEAR,
        icon: <DeleteIcon/>,
        color: '#2E8B57',
        backgroundColor: '#fffacd'
    },
    {
        type: CityTileEnum.CITY,
        icon: <LocationCityRoundedIcon/>,
        color: '#dc2424',
        backgroundColor: '#fffacd'
    },
    {
        type: CityTileEnum.WALL,
        icon: <FenceIcon/>,
        color: '#581886',
        backgroundColor: '#fffacd'
    },
    {
        type: CityTileEnum.WATER,
        icon: <WaterIcon/>,
        color: '#43B3CC',
        backgroundColor: '#fffacd'
    },
    {
        type: CityTileEnum.TREE,
        icon: <ParkIcon/>,
        color: '#2E8B57',
        backgroundColor: '#fffacd'
    }
]

function Tools({activeTool, pickTool}: ToolsProps) {
    return (
        <>{
            tools.map(tool => (
                <Tool key={tool.type} tool={tool} isActive={activeTool === tool.type} pickTool={pickTool}/>
            ))
        }</>
    )
}

export default function Toolset({tool, pickTool, isConstructing, construct}: ToolsetProps) {
    return (
        <>
            <Tools activeTool={tool} pickTool={pickTool}/>
            <Button
                onClick={construct}
                variant={"contained"}
                color={"primary"} sx={{
                borderRadius: '25px',
            }}
                endIcon={
                    isConstructing ?
                        <SettingsIcon className={"settings-icon"} fontSize={"medium"}/> :
                        <ConstructionIcon fontSize={"medium"}/>
                }
            >
                Construct
            </Button>
        </>
    )
}
