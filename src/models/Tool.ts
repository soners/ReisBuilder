import {CityTileEnum} from "./CityTileEnum";

export interface ITool {
    type: CityTileEnum;
    icon: JSX.Element;
    color: string;
    backgroundColor: string;
}
