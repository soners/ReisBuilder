import {Box, Button, IconButton, Step, StepLabel, Stepper} from "@mui/material";
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import ConstructionIcon from "@mui/icons-material/Construction";
import WaterIcon from '@mui/icons-material/Water';
import ParkIcon from '@mui/icons-material/Park';
import FenceIcon from '@mui/icons-material/Fence';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import TrainIcon from '@mui/icons-material/Train';
import * as React from "react";
import {useState} from "react";
import './Tutorial.scss';

export interface TutorialItem {
    icon: JSX.Element;
    description: string;
}

export default function Tutorial() {
    const [activeStep, setActiveStep] = useState(0);

    const tutorial = (
        <Stepper nonLinear activeStep={activeStep} className={"stepper"}>
            <Step className={"tutorial-step"} key={1} onClick={() => setActiveStep(0)}>
                <StepLabel>Build your city!</StepLabel>
            </Step>
            <Step className={"tutorial-step"} key={2} onClick={() => setActiveStep(1)}>
                <StepLabel>Construct your rail line!</StepLabel>
            </Step>
        </Stepper>
    )

    const tutorialItems: TutorialItem[] = [
        {
            icon: <LocationCityRoundedIcon sx={{color: '#dc2424'}}/>,
            description: 'Place a house acting as target'
        },
        {
            icon: <FenceIcon sx={{color: '#581886'}}/>,
            description: 'Place a fence acting as obstacle'
        },
        {
            icon: <WaterIcon sx={{color: '#43B3CC'}}/>,
            description: 'Place a water acting as obstacle'
        },
        {
            icon: <ParkIcon sx={{color: '#2E8B57'}}/>,
            description: 'Place a tree acting as obstacle'
        },
        {
            icon: <AutoFixNormalIcon sx={{color: '#E1B100'}}/>,
            description: 'Delete a tile'
        },
        {
            icon: <DeleteIcon sx={{color: '#a60f1a'}}/>,
            description: 'Clear the entire map'
        }
    ]

    const toolTutorials = tutorialItems.map(item => (
        <div className={"tool-tutorials"}>
            <IconButton className={"tutorial-icon"} sx={{backgroundColor: '#fffacd'}}>
                {item.icon}
            </IconButton>
            {item.description}
        </div>
    ));

    const constructTutorial = (
        <>
            <Button
                variant={"contained"}
                color={"primary"}
                sx={{
                    borderRadius: '25px',
                }}
                onClick={() => setActiveStep(1)}
                endIcon={<ConstructionIcon fontSize={"medium"}/>}
            >
                Construct
            </Button>
            <div>
                When you have a beautiful city, let us construct your rail line
            </div>
        </>
    );

    const constructionTutorial = (
        <>
            <Stepper className={"stepper"} orientation={"vertical"}>
                <Step className={"step"} key={1}>
                    <IconButton className={"tutorial-icon"} sx={{backgroundColor: '#000000'}}>
                        <LocationCityRoundedIcon sx={{color: '#20bac0'}}/>
                    </IconButton>
                    <span className={"text"}>We will choose a central location</span>
                </Step>
                <Step className={"step"} key={2}>
                    <IconButton className={"tutorial-icon"} sx={{backgroundColor: '#000000'}}>
                        <LocationCityRoundedIcon sx={{color: '#dc2424'}}/>
                    </IconButton>
                    <span className={"text"}>If there is an inaccessible location, modify your city</span>
                </Step>
                <Step className={"step"} key={3}>
                    <IconButton className={"tutorial-icon"} sx={{backgroundColor: '#000000'}}>
                        <LocationCityRoundedIcon sx={{color: '#0c830b'}}/>
                    </IconButton>
                    <span className={"text"}>We will choose main cities as starting point for the train line</span>
                </Step>
                <Step className={"step"} key={4}>
                    <IconButton className={"tutorial-icon"} sx={{backgroundColor: '#1b2791'}}>
                        <TrainIcon sx={{color: '#d7ba3c'}}/>
                    </IconButton>
                    <span className={"text"}>We will construct a train line for your beautiful city</span>
                    <div/>
                    <IconButton className={"tutorial-icon"} sx={{backgroundColor: '#fffacd'}}>
                        <LocationCityRoundedIcon sx={{color: '#6412b0'}}/>
                    </IconButton>
                    <span className={"text"}>There will be places with rail lines in between</span>
                </Step>
            </Stepper>
        </>
    );

    return (
        <Box sx={{width: '100%'}}>
            {tutorial}

            {activeStep === 0 ? <div>
                {toolTutorials}
                {constructTutorial}
            </div> : <></>}
            {activeStep === 1 ? <div>
                {constructionTutorial}
            </div> : <></>}
        </Box>
    )
}
