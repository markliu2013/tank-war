var grid = new Grid(50, 50);
grid.draw();
var tank = new Tank([15,15], 39, grid);
tank.draw();
tank.keyBoardControl();