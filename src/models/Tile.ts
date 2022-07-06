import {CityTileEnum} from "./CityTileEnum";

export interface ITile {
    type: CityTileEnum;
    icon: JSX.Element;
    color: string;
    backgroundColor: string;
}
