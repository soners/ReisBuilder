import {useEffect, useState} from "react";
import {CityTileEnum} from "../models/CityTileEnum";
import {Location} from "../models/Location";
import {CityMap} from "../models/CityMap";
import useOuterCities from "./useOuterCities";
import useIsolatedCities from "./useIsolatedCities";
import useCapital from "./useCapital";
import useTrainLines from "./useTrainLines";
import {purifyMapping, PurifyMapping, purifyMappingForOuterCities} from "../models/Constants";

export interface UseCityMapProps {
    rows: number;
    cols: number;
}

export interface UseCityMapOutputs {
    map: CityMap;
    clearMap: () => void;
    applyTool: (location: Location, tool: CityTileEnum) => void;
    constructRailLine: () => void;
}

export function useCityMap({rows, cols}: UseCityMapProps): UseCityMapOutputs {
    const [map, setMap] = useState<CityMap>([]);
    const {findCapital, capital} = useCapital(map);
    const {findIsolatedCities} = useIsolatedCities(map);
    const {findOuterCities, done: outerCitiesFound, outerCities} = useOuterCities(map);
    const {findTrainLines, done: trainLinesFound, trainLines} = useTrainLines(map);

    useEffect(() => {
        clearMap();
    }, []);

    useEffect(() => {
        if (outerCities.length) {
            const pureMap = getPurifiedMap(map, purifyMapping);
            for (const outerCity of outerCities) {
                pureMap[outerCity.x][outerCity.y] = CityTileEnum.OUTER_CITY;
            }
            setMap(pureMap);
        }
        if (outerCitiesFound && capital) {
            findTrainLines(outerCities, capital);
        }
    }, [outerCities, outerCitiesFound]);

    useEffect(() => {
        if (!trainLinesFound && !trainLines.length) {
            return;
        }
        console.log('sss');
        const newMap: CityMap = [];
        if (trainLines.length) {
            for (let i = 0; i < rows; i++) {
                const row = [];
                for (let j = 0; j < cols; j++) {
                    row.push(map[i][j]);
                }
                newMap.push(row);
            }
        }
        for (const {start, path} of trainLines) {
            for (const p of path) {
                newMap[p.x][p.y] = map[p.x][p.y] === CityTileEnum.CITY ? CityTileEnum.CENTRAL_STATION : CityTileEnum.RAIL;
            }
            newMap[start.x][start.y] = CityTileEnum.OUTER_CITY;
        }
        if (trainLinesFound && capital) {
            newMap[capital.x][capital.y] = CityTileEnum.CAPITAL;
        }
        setMap(newMap);
    }, [trainLines, trainLinesFound])

    const clearMap = () => {
        const newMap: CityMap = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(CityTileEnum.EMPTY)
            }
            newMap.push(row);
        }
        setMap(newMap);
    }

    const getPurifiedMap = (map: CityMap, purifyMapping: PurifyMapping) => {
        const newMap: CityMap = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(purifyMapping[map[i][j]])
            }
            newMap.push(row);
        }
        return newMap;
    }

    const applyTool = (location: Location, tool: CityTileEnum) => {
        setMap(fillMap(map, [location], tool));
    }

    const fillMap = (map: CityMap, locations: Location[], tool: CityTileEnum) => {
        const newMap: CityMap = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(map[i][j])
            }
            newMap.push(row);
        }
        locations.forEach(({x, y}) => {
            newMap[x][y] = tool;
        });

        return newMap;
    }

    function constructRailLine() {
        const capital = findCapital();
        const pureMap = getPurifiedMap(map, purifyMapping);
        pureMap[capital.x][capital.y] = CityTileEnum.CAPITAL;

        const isolatedCities = findIsolatedCities(capital);
        isolatedCities.forEach(city => {
            pureMap[city.x][city.y] = CityTileEnum.UNVISITED_CITY;
        })
        setMap(pureMap);
    }

    return {map, applyTool, constructRailLine, clearMap};
}
