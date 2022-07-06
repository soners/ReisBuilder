import {useState} from "react";
import {CityMap} from "../models/CityMap";

interface UseMapProps {
    rows: number;
    cols: number;
}

interface UseMapOutputs {
    map: CityMap;
    setMap: () => void;
    clearMap: () => void;
}

export default function useMap({rows, cols}: UseMapProps) {
    const [map, setMap] = useState<CityMap>([]);


}
