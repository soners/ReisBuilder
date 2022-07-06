import MapIcon from '@mui/icons-material/Map';
import * as React from "react";
import {useState} from "react";
import Toolset from "../Toolset/Toolset";
import CityMap from "../CityMap/CityMap";
import './CityBuilder.css';
import {useCityMap} from "../../hooks/useCityMap";
import useTools from "../../hooks/useTools";

const rows = 20;
const cols = 30;

export default function CityBuilder() {
    const [editMode, setEditMode] = useState(false);
    const {map, clearMap, applyTool, constructRailLine} = useCityMap({rows, cols});
    const {tool, pickTool} = useTools({map, clearMap});

    return (
        <div onMouseLeave={() => setEditMode(false)} onMouseUp={() => setEditMode(false)}>
            <div className={"header"}>
                <div className={"title"}>
                    <span>City Map (NL)</span>
                    <MapIcon/>
                </div>
                <div className={"right"}>
                    <Toolset
                        tool={tool}
                        pickTool={pickTool}
                        construct={constructRailLine}
                    />
                </div>
            </div>
            <div
                className={"builder"}
                onMouseDown={() => setEditMode(true)}
            >
                <CityMap
                    map={map}
                    onTileDown={(x, y) => applyTool({x, y}, tool)}
                    onTileHover={(x, y) => editMode && applyTool({x, y}, tool)}
                />
            </div>
        </div>
    )
}
