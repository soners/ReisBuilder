import {useEffect, useState} from "react";
import {CityTileEnum} from "../models/CityTileEnum";
import {Location} from "../models/Location";
import {CityMap} from "../models/CityMap";
import useOuterCities from "./useOuterCities";
import useIsolatedCities from "./useIsolatedCities";
import useCapital from "./useCapital";
import useTrainLines from "./useTrainLines";

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
    const {findCapital, done: capitalFound, capital} = useCapital(map);
    const {findIsolatedCities, done: isolatedCitiesFound, isolatedCities} = useIsolatedCities(map);
    const {findOuterCities, done: outerCitiesFound, outerCities} = useOuterCities(map);
    const {findTrainLines, done, trainLines} = useTrainLines(map);

    useEffect(() => {
        clearMap();
    }, []);

    useEffect(() => {
        if (!capital) {
            return;
        }
        const newMap: CityMap = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                if (capitalFound) {
                    row.push(map[i][j] === CityTileEnum.CAPITAL ? CityTileEnum.CITY : map[i][j])
                } else {
                    row.push(map[i][j]);
                }
            }
            newMap.push(row);
        }
        if (capital) {
            newMap[capital.x][capital.y] = CityTileEnum.CAPITAL;
        }
        if (capitalFound) {
            findIsolatedCities(capital);
        }
        setMap(newMap);
    }, [capital, capitalFound]);

    useEffect(() => {
        console.log('isolatedcity ef')
        if (isolatedCitiesFound) {
            console.log('isolatedcity ef found')
            findOuterCities();
        }
    }, [isolatedCities, isolatedCities]);

    useEffect(() => {
        if (outerCities.length) {
            const newMap = [];
            for (let i = 0; i < rows; i++) {
                const row = [];
                for (let j = 0; j < cols; j++) {
                    row.push(map[i][j] === CityTileEnum.OUTER_CITY ? CityTileEnum.CITY : map[i][j])
                }
                newMap.push(row);
            }
            for (const outerCity of outerCities) {
                newMap[outerCity.x][outerCity.y] = CityTileEnum.OUTER_CITY;
            }
            if (outerCitiesFound && capital) {
                newMap[capital.x][capital.y] = CityTileEnum.CAPITAL;
            }
            setMap(newMap);
        }
        if (outerCitiesFound && capital) {
            findTrainLines(outerCities, capital);
        }
    }, [outerCities, outerCitiesFound])

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
        findCapital();
    }

    return {map, applyTool, constructRailLine, clearMap};
}
