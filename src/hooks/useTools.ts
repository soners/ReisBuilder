import {useState} from "react";
import {CityTileEnum} from "../models/CityTileEnum";

interface UseToolsProps {
    map: CityTileEnum[][];
    clearMap: () => void;
}

interface UseToolsOutputs {
    tool: CityTileEnum;
    pickTool: (tool: CityTileEnum) => void;
    applyTool: () => void;
}

export default function useTools({ map, clearMap }: UseToolsProps): UseToolsOutputs {
    const [tool, setTool] = useState(CityTileEnum.EMPTY);

    function applyTool() {

    }

    function pickTool(tool: CityTileEnum) {
        if (tool === CityTileEnum.CLEAR) {
            clearMap();
            setTool(CityTileEnum.EMPTY);
        } else {
            setTool(tool);
        }
    }

    return { tool, applyTool, pickTool }
}
