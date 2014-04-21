var grid = new Grid(gridRowsNum, gridColsNum);
grid.init();
var tankContainer = new TankContainer();
var tank = new MyTank([15,15], 39);
tank.init();
var tank2 = new NPCTank([45,45], 39);
tank2.init();
tankContainer.tanks.push(tank);
tankContainer.tanks.push(tank2);