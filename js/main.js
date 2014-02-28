var grid = new Grid(gridRowsNum, gridColsNum);
grid.draw();
var tank = new Tank([15,15], 39);
tank.draw();
tank.keyBoardControl();


var tank2 = new Tank([45,45], 39);
tank2.draw();
