import {CityMap} from "../models/CityMap";
import {CityTileEnum} from "../models/CityTileEnum";
import {isCity, Location} from "../models/Location";
import {possibleMove} from "../models/Constants";
import {useState} from "react";

interface UseIsolatedCitiesOutputs {
    findIsolatedCities: (capital: Location) => Location[];
    done: boolean;
    isolatedCities: Location[];
}

export default function useIsolatedCities(map: CityMap): UseIsolatedCitiesOutputs {
    const [done, setDone] = useState(false);
    const [isolatedCities, setIsolatedCities] = useState<Location[]>([]);

    function findIsolatedCities(capital: Location): Location[] {
        setDone(false);
        setIsolatedCities([]);
        const visited = map.map(row => {
            return row.map(() => {
                return false;
            })
        });

        const traverse = (location: Location, visited: boolean[][]) => {
            possibleMove.forEach(([i, j]) => {
                const x = location.x + i;
                const y = location.y + j;
                const newLocation = {x, y};

                const unvisitable = [CityTileEnum.WALL, CityTileEnum.WATER, CityTileEnum.GRASS]
                if (
                    x < 0 || x >= map.length ||
                    y < 0 || y >= map[0].length ||
                    unvisitable.includes(map[x][y])
                ) {
                    return;
                }

                if (!visited[x][y]) {
                    visited[x][y] = true;
                    traverse(newLocation, visited);
                }
            });

        }
        traverse(capital, visited);

        const unvisited: Location[] = [];

        visited.forEach((row, x) => {
            row.forEach((v, y) => {
                if (isCity(map[x][y]) && !v) {
                    unvisited.push({x, y})
                }
            })
        });
        setIsolatedCities(unvisited);
        setDone(true);

        return unvisited;
    }

    return {findIsolatedCities, done, isolatedCities}
}
