import Tile from "../Tile/Tile";
import {CityTileEnum} from "../../models/CityTileEnum";

export interface CityMapProps {
    map: CityTileEnum[][];
    onTileDown: (x: number, y: number) => void
    onTileHover: (x: number, y: number) => void
}

export default function CityMap({map, onTileDown, onTileHover}: CityMapProps) {
    return (
        <div>{
            map.map((row, i) => (
                <div key={i} className={"row"}>{
                    row.map((col, j) => (
                        <Tile
                            key={`${i}-${j}`}
                            type={col}
                            onDown={() => onTileDown(i, j)}
                            onHover={() => onTileHover(i, j)}
                        />
                    ))
                }</div>
            ))
        }</div>
    )
}
