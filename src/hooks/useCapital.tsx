import {CityMap} from "../models/CityMap";
import {isCity, Location} from "../models/Location";
import {useState} from "react";

interface UseCapitalOutputs {
    findCapital: () => Location;
    capital?: Location;
    reset: () => void;
}

export default function useCapital(map: CityMap): UseCapitalOutputs {
    const [capital, setCapital] = useState<Location>();

    function reset() {
        setCapital(undefined);
    }

    function findCapital(): Location {
        const locations: Location[] = [];

        let sumx = 0;
        let sumy = 0;
        map.forEach((row, x) => {
            row.forEach((col, y) => {
                if (isCity(map[x][y])) {
                    locations.push({x, y});
                    sumx += x;
                    sumy += y;
                }
            });
        });

        const n = sumx / locations.length;
        const m = sumy / locations.length;

        let candidate = locations[0];
        for (let i = 0; i < locations.length; i++) {
            const city = locations[i];
            const distance = (city.y - m) * (city.y - m) + (city.x - n) * (city.x - n);
            const minDistance = (candidate.y - m) * (candidate.y - m) + (candidate.x - n) * (candidate.x - n)

            if (distance < minDistance) {
                setCapital(city);
                candidate = city;
            }
        }

        setCapital(candidate);
        return candidate
    }

    return {findCapital, reset, capital}
}
