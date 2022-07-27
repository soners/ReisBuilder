# Welcome to ReisBuilder

This project was created with React, for fun 

### What is ReisBuilder?
ReisBuilder is a React application that finds sub-optimal paths between locations.


### How does it work?
- ReisBuilder provides a toolset to;
  - Insert households
  - Insert obstacles (water, forest, fence)
  - Clear a tile or the entire map
  - View the tutorial on the application for more info
- Construction works as follows;
  - Find the middle household. (Household closest to the average location)
  - Find isolated households (Run BFS from middle household)
  - If there is no isolated household, find main cities. (Run convex hull)
  - Construct train lines for each main city pairs.


### Run / Play
`Online playground`

https://reisbuilder.web.app

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

