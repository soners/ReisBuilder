import {CityTileEnum} from "./CityTileEnum";

export interface Location {
    x: number;
    y: number;
}


export const isCity = (tile: CityTileEnum) => {
    return [CityTileEnum.CITY, CityTileEnum.UNVISITED_CITY, CityTileEnum.CAPITAL, CityTileEnum.OUTER_CITY].includes(tile);
}
