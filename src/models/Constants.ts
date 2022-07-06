import {CityTileEnum} from "./CityTileEnum";

const possibleCross = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]

const possibleCrossExtended = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1]
]

export const possibleMove = possibleCross;

export type PurifyMapping = {
    [type in CityTileEnum]: CityTileEnum;
};

export const purifyMapping: PurifyMapping = {
    [CityTileEnum.EMPTY]: CityTileEnum.EMPTY,
    [CityTileEnum.CITY]: CityTileEnum.CITY,
    [CityTileEnum.UNVISITED_CITY]: CityTileEnum.CITY,
    [CityTileEnum.CAPITAL]: CityTileEnum.CITY,
    [CityTileEnum.OUTER_CITY]: CityTileEnum.CITY,
    [CityTileEnum.RAIL]: CityTileEnum.EMPTY,
    [CityTileEnum.CENTRAL_STATION]: CityTileEnum.CITY,
    [CityTileEnum.CLEAR]: CityTileEnum.CLEAR,
    [CityTileEnum.WATER]: CityTileEnum.WATER,
    [CityTileEnum.WALL]: CityTileEnum.WALL,
    [CityTileEnum.GRASS]: CityTileEnum.GRASS
}

export const purifyMappingForOuterCities: PurifyMapping = {
    [CityTileEnum.EMPTY]: CityTileEnum.EMPTY,
    [CityTileEnum.CITY]: CityTileEnum.CITY,
    [CityTileEnum.UNVISITED_CITY]: CityTileEnum.CITY,
    [CityTileEnum.CAPITAL]: CityTileEnum.CITY,
    [CityTileEnum.OUTER_CITY]: CityTileEnum.OUTER_CITY,
    [CityTileEnum.RAIL]: CityTileEnum.EMPTY,
    [CityTileEnum.CENTRAL_STATION]: CityTileEnum.CITY,
    [CityTileEnum.CLEAR]: CityTileEnum.CLEAR,
    [CityTileEnum.WATER]: CityTileEnum.WATER,
    [CityTileEnum.WALL]: CityTileEnum.WALL,
    [CityTileEnum.GRASS]: CityTileEnum.GRASS
}
