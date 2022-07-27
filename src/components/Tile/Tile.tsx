import {Box} from '@mui/material';
import './Tile.css';
import {CityTileEnum} from "../../models/CityTileEnum";
import {ITile} from "../../models/Tile";
import WaterIcon from "@mui/icons-material/Water";
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import ParkIcon from '@mui/icons-material/Park';
import FenceIcon from '@mui/icons-material/Fence';
import TrainIcon from '@mui/icons-material/Train';
import * as React from "react";

export interface TileProps {
    type: CityTileEnum;
    onDown: () => void;
    onHover: () => void;
}

export const tiles: {
    [type: number]: ITile
} = {
    [CityTileEnum.EMPTY]: {
        type: CityTileEnum.EMPTY,
        icon: <></>,
        color: '#4B0082',
        backgroundColor: '#b24731'
    },
    [CityTileEnum.CITY]: {
        type: CityTileEnum.CITY,
        icon: <LocationCityRoundedIcon className={"icon"} sx={{color: '#dc2424'}}/>,
        color: '#dc2424',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.UNVISITED_CITY]: {
        type: CityTileEnum.UNVISITED_CITY,
        icon: <LocationCityRoundedIcon className={"icon"} sx={{color: '#dc2424'}}/>,
        color: '#dc2424',
        backgroundColor: '#000000'
    },
    [CityTileEnum.CAPITAL]: {
        type: CityTileEnum.CAPITAL,
        icon: <LocationCityRoundedIcon className={"icon"} sx={{color: '#20bac0'}}/>,
        color: '#20bac0',
        backgroundColor: '#000000'
    },
    [CityTileEnum.OUTER_CITY]: {
        type: CityTileEnum.OUTER_CITY,
        icon: <LocationCityRoundedIcon className={"icon"} sx={{color: '#0c830b'}}/>,
        color: '#0c830b',
        backgroundColor: '#000000'
    },
    [CityTileEnum.RAIL]: {
        type: CityTileEnum.RAIL,
        icon: <TrainIcon className={"icon"} sx={{color: '#d7ba3c'}}/>,
        color: '#d7ba3c',
        backgroundColor: '#1b2791'
    },
    [CityTileEnum.CENTRAL_STATION]: {
        type: CityTileEnum.CENTRAL_STATION,
        icon: <LocationCityRoundedIcon className={"icon"} sx={{color: '#6412b0'}}/>,
        color: '#6412b0',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.WALL]: {
        type: CityTileEnum.WALL,
        icon: <FenceIcon className={"icon"} sx={{color: '#581886'}}/>,
        color: '#581886',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.WATER]: {
        type: CityTileEnum.WATER,
        icon: <WaterIcon className={"icon"} sx={{color: '#43B3CC'}}/>,
        color: '#43B3CC',
        backgroundColor: '#fffacd'
    },
    [CityTileEnum.TREE]: {
        type: CityTileEnum.TREE,
        icon: <ParkIcon className={"icon"} sx={{color: '#2E8B57'}}/>,
        color: '#2E8B57',
        backgroundColor: '#fffacd'
    }
}

export default function Tile({type, onDown, onHover}: TileProps) {
    const tile = tiles[type];
    return (
        <Box
            onMouseEnter={onHover}
            onMouseDown={onDown}
            sx={{
                width: 30,
                height: 30,
                backgroundColor: tile.backgroundColor,
                border: '.1px solid lemonchiffon',
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: '#98290e'
                }
            }}
        >
            {tile.icon}
        </Box>
    )
}
