import {CityMap} from "../models/CityMap";
import {isCity, Location} from "../models/Location";
import {useState} from "react";

interface FindOuterCities {
    outerCities: Location[];
    done: boolean;
    findOuterCities: () => void;
}

export default function useOuterCities(map: CityMap): FindOuterCities {
    const [outerCities, setOuterCities] = useState<Location[]>([]);
    const [done, setDone] = useState(false);

    const distance = (p: Location, q: Location) => (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y);

    const orientation = (p: Location, q: Location, r: Location) => {
        const compare = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)

        if (!compare) {
            return 0
        } else if (compare > 0) {
            return 1;
        }
        return 2;
    }

    const compare = (p0: Location, p1: Location, p2: Location) => {
        const orient = orientation(p0, p1, p2);

        if (orient) {
            return orient === 2 ? -1 : 1;
        }

        return distance(p0, p2) >= distance(p0, p1) ? -1 : 1;
    }

    const topMostCity = (cities: Location[]) => {
        return cities.reduce(
            ({city, index}, curCity, curIndex) =>
                curCity.y < city.y ||
                (city.y === curCity.y && curCity.x < city.x) ?
                    {city, index} : {city: cities[0], index: 0}
            , {city: cities[0], index: 0}
        )
    }

    const swapMinAndTopMost = (cities: Location[], minIndex: number) => {
        const tempCities = [];
        for (let i = 0; i < cities.length; i++) {
            tempCities[i] = cities[i];
        }

        tempCities[minIndex] = cities[0];
        tempCities[0] = cities[minIndex];

        return tempCities;
    }

    const sortByFirst = (cities: Location[]) => {
        const {index} = topMostCity(cities);
        const tempCities = swapMinAndTopMost(cities, index);
        const first = tempCities[0];
        const n = tempCities.length;
        const sortedCities = tempCities.sort((c1, c2) => compare(first, c1, c2));
        let m = 1;

        for (let i = 1; i < sortedCities.length; i++) {
            while ((i < n - 1) && orientation(first, sortedCities[i], sortedCities[i + 1]) === 0) {
                i += 1;
            }

            sortedCities[m] = sortedCities[i];
            m++;
        }

        return {sortedCities, m};
    }

    const findConvexHull = (cities: Location[]) => {
        const {sortedCities, m} = sortByFirst(cities);

        if (m < 3) {
            return [];
        }

        const hullCities = [sortedCities[0], sortedCities[1], sortedCities[2]];

        for (let i = 3; i < m; i++) {
            setTimeout(() => {
                while (
                    hullCities.length > 1 &&
                    orientation(
                        hullCities[hullCities.length - 2],
                        hullCities[hullCities.length - 1],
                        sortedCities[i]
                    ) !== 2) {
                    hullCities.pop();
                }
                hullCities.push(sortedCities[i]);

                console.log(i, m, hullCities);
                if (i === m - 1) {
                    console.log('done')
                    setDone(true);
                }
                setOuterCities([...hullCities]);
            }, 200 * i);
        }
    }

    function findOuterCities() {
        setDone(false);
        const cities: Location[] = [];
        map.forEach((row, x) => {
            row.forEach((col, y) => {
                if (isCity(col)) {
                    cities.push({x, y});
                }
            })
        });

        return findConvexHull(cities)
    }

    return {findOuterCities, done, outerCities}
}
