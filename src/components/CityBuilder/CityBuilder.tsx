import MapIcon from '@mui/icons-material/Map';
import * as React from "react";
import {useState} from "react";
import Toolset from "../Toolset/Toolset";
import CityMap from "../CityMap/CityMap";
import './CityBuilder.scss';
import {useCityMap} from "../../hooks/useCityMap";
import useTools from "../../hooks/useTools";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Tutorial from "../Tutorial/Tutorial";

const rows = 20;
const cols = 30;

export default function CityBuilder() {
    const [editMode, setEditMode] = useState(false);
    const [showTutorial, setShowTutorial] = useState(true);
    const {map, clearMap, applyTool, isConstructing, constructRailLine} = useCityMap({rows, cols});
    const {tool, pickTool} = useTools({map, showTutorial: () => setShowTutorial(true), clearMap});

    const handleClose = () => {
        setShowTutorial(false);
    };

    return (
        <>
            <Dialog
                open={showTutorial}
                onClose={handleClose}
                color={"primary"}
            >
                <DialogTitle>
                    {"Welcome to Train Line Builder"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Tutorial/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        sx={{
                            borderRadius: '25px',
                        }}
                        onClick={handleClose}
                    >
                        Let's go
                    </Button>
                </DialogActions>
            </Dialog>
            <div onMouseLeave={() => setEditMode(false)} onMouseUp={() => setEditMode(false)}>
                <div className={"header"}>
                    <div className={"title"}>
                        <span className={"sub"}>City Map</span>
                        <MapIcon/>
                    </div>
                    <div className={"right"}>
                        <Toolset
                            tool={tool}
                            pickTool={pickTool}
                            isConstructing={isConstructing}
                            construct={constructRailLine}
                        />
                    </div>
                </div>
                <div
                    className={"builder"}
                    onMouseDown={() => setEditMode(true)}
                >
                    <CityMap
                        map={map}
                        onTileDown={(x, y) => applyTool({x, y}, tool)}
                        onTileHover={(x, y) => editMode && applyTool({x, y}, tool)}
                    />
                </div>
            </div>
        </>
    )
}
