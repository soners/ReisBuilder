import {CityMap} from "../models/CityMap";
import {Location} from "../models/Location";
import {CityTileEnum} from "../models/CityTileEnum";
import {useState} from "react";

interface FindCapitalProps {
    findCapital: () => void;
    capital?: Location;
    done: boolean;
}

export default function useCapital(map: CityMap): FindCapitalProps {
    const [done, setDone] = useState(false);
    const [capital, setCapital] = useState<Location>();

    function findCapital(): void {
        const locations: Location[] = [];

        let sumx = 0;
        let sumy = 0;
        map.forEach((row, x) => {
            row.forEach((col, y) => {
                if (col === CityTileEnum.CITY) {
                    locations.push({x, y});
                    sumx += x;
                    sumy += y;
                }
            });
        });

        const n = sumx / locations.length;
        const m = sumy / locations.length;

        let capital = locations[0];
        for (let i = 0; i < locations.length; i++) {
            setTimeout(() => {
                const city = locations[i];
                const distance = (city.y - m) * (city.y - m) + (city.x - n) * (city.x - n);
                const minDistance = (capital.y - m) * (capital.y - m) + (capital.x - n) * (capital.x - n)

                if (distance < minDistance) {
                    setCapital(city);
                    capital = city;
                }
                if (i === locations.length - 1) {
                    setDone(true);
                }
            }, 10 * i);
        }
    }

    return {findCapital, capital, done}
}
