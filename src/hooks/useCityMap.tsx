import {useEffect, useState} from "react";
import {CityTileEnum} from "../models/CityTileEnum";
import {isCity, Location} from "../models/Location";
import {CityMap} from "../models/CityMap";
import useOuterCities from "./useOuterCities";
import useIsolatedCities from "./useIsolatedCities";
import useCapital from "./useCapital";
import useTrainLines from "./useTrainLines";
import {restoreMapping, RestoreMapping, restoreMappingForTrainLines} from "../models/Constants";

export interface UseCityMapProps {
    rows: number;
    cols: number;
}

export interface UseCityMapOutputs {
    map: CityMap;
    clearMap: () => void;
    applyTool: (location: Location, tool: CityTileEnum) => void;
    isConstructing: boolean;
    constructRailLine: () => void;
}

export function useCityMap({rows, cols}: UseCityMapProps): UseCityMapOutputs {
    const [map, setMap] = useState<CityMap>([]);
    const [isConstructing, setConstructing] = useState(false);
    const {findCapital, capital} = useCapital(map);
    const {findIsolatedCities} = useIsolatedCities(map);
    const {findOuterCities, outerCities, done: outerCitiesFound, reset: resetOuterCities} = useOuterCities(map);
    const {findTrainLines, trainLines, done: trainLinesFound, reset: resetTrainLines} = useTrainLines(map);

    useEffect(() => {
        clearMap();
    }, []);

    useEffect(() => {
        if (outerCities.length) {
            const restoredMap = getRestoredMap(map, restoreMapping);
            for (const outerCity of outerCities) {
                restoredMap[outerCity.x][outerCity.y] = CityTileEnum.OUTER_CITY;
            }
            setMap(restoredMap);
        }
        if (outerCitiesFound && outerCities.length && capital) {
            findTrainLines(outerCities, capital);
        }
    }, [outerCities, outerCitiesFound]);

    useEffect(() => {
        if (!trainLinesFound && !trainLines.length) {
            return;
        }
        const newMap = getRestoredMap(map, restoreMappingForTrainLines)
        for (const {start, path} of trainLines) {
            for (const p of path) {
                newMap[p.x][p.y] = isCity(map[p.x][p.y]) ? CityTileEnum.CENTRAL_STATION : CityTileEnum.RAIL;
            }
            newMap[start.x][start.y] = CityTileEnum.OUTER_CITY;

            if (capital) {
                newMap[capital.x][capital.y] = CityTileEnum.CAPITAL;
            }
        }
        setMap(newMap);
        if (trainLinesFound) {
            setConstructing(false);
        }
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

    const getRestoredMap = (map: CityMap, restoreMapping: RestoreMapping) => {
        const newMap: CityMap = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(restoreMapping[map[i][j]])
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
        resetTrainLines();
        resetOuterCities();
        setConstructing(true);
        const capital = findCapital();
        const restoredMap = getRestoredMap(map, restoreMapping);
        restoredMap[capital.x][capital.y] = CityTileEnum.CAPITAL;

        const isolatedCities = findIsolatedCities(capital);
        isolatedCities.forEach(city => {
            restoredMap[city.x][city.y] = CityTileEnum.UNVISITED_CITY;
        })
        setMap(restoredMap);
        if (!isolatedCities.length) {
            findOuterCities();
        } else {
            setConstructing(false);
        }
    }

    return {map, applyTool, isConstructing, constructRailLine, clearMap};
}
