import {useState} from "react";
import {CityTileEnum} from "../models/CityTileEnum";

interface UseToolsProps {
    map: CityTileEnum[][];
    clearMap: () => void;
    showTutorial: () => void;
}

interface UseToolsOutputs {
    tool: CityTileEnum;
    pickTool: (tool: CityTileEnum) => void;
}

export default function useTools({showTutorial, clearMap}: UseToolsProps): UseToolsOutputs {
    const [tool, setTool] = useState(CityTileEnum.EMPTY);

    function pickTool(tool: CityTileEnum) {
        if (tool === CityTileEnum.CLEAR) {
            clearMap();
            setTool(CityTileEnum.EMPTY);
        } else if (tool === CityTileEnum.TUTORIAL) {
            showTutorial();
        } else {
            setTool(tool);
        }
    }

    return {tool, pickTool}
}
