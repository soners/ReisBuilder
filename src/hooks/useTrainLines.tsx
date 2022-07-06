import {CityTileEnum} from "../models/CityTileEnum";
import {Location} from "../models/Location";
import {CityMap} from "../models/CityMap";
import {possibleMove} from "../models/Constants";
import {useState} from "react";

export interface TrainLineResult {
    start: Location;
    path: Location[];
}

interface SourceNode {
    node: Location,
    source?: Location
}

interface UseTrainLinesOutputs {
    findTrainLines: (outerCities: Location[], capital: Location) => TrainLineResult[];
    done: boolean;
    trainLines: TrainLineResult[];
}

export default function useTrainLines(map: CityMap): UseTrainLinesOutputs {
    const [done, setDone] = useState(false);
    const [trainLines, setTrainLines] = useState<TrainLineResult[]>([]);

    const traverse = (start: Location, target: Location): SourceNode[] => {
        const visited = map.map(row => {
            return row.map(() => {
                return false;
            })
        });

        const s = [start];
        const q: SourceNode[] = [{node: start, source: undefined}]
        while (s.length) {
            const node = s.shift()!;

            for (let [i, j] of possibleMove) {
                const x = node.x + i;
                const y = node.y + j;
                const newLocation = {x, y};

                if (newLocation.x === target.x && newLocation.y === target.y) {
                    q.push({node: newLocation, source: node});
                    return q;
                }

                const unvisitable = [CityTileEnum.CITY, CityTileEnum.WALL, CityTileEnum.WATER, CityTileEnum.GRASS]
                if (
                    x < 0 || x >= map.length ||
                    y < 0 || y >= map[0].length ||
                    unvisitable.includes(map[x][y])
                ) {
                    continue;
                }

                if (!visited[x][y]) {
                    visited[x][y] = true;
                    s.push(newLocation);
                    q.push({node: newLocation, source: node});
                }
            }
        }

        return [];
    }

    const findPath = (start: Location, target: Location) => {
        const bfsResult = traverse(start, target);

        let walk = target;
        const path = [];
        for (let i = bfsResult.length - 1; i >= 0; i--) {
            const {node, source} = bfsResult[i];
            if (walk.x === node.x && walk.y === node.y) {
                path.push(node);
                walk = source!;
            }
        }

        return path;
    }

    function findTrainLines(outerCities: Location[], capital: Location): TrainLineResult[] {
        const paths: TrainLineResult[] = []
        for (let i = 0; i < outerCities.length; i++) {
            const start = outerCities[i];
            const path = findPath(start, capital);

            paths.push({start, path});
        }

        return paths;
    }

    return {findTrainLines, done, trainLines}
}
