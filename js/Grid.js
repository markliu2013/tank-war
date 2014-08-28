/**
 * Class Grid
 * @param rowsNum
 * @param colsNum
 * @constructor
 */
function Grid(rowsNum, colsNum) {
	this.rowsNum = rowsNum;
	this.colsNum = colsNum;
}
Grid.prototype.draw = function() {
	var gridHTML = '';
	for(var i=0; i<this.rowsNum; i++) {
		gridHTML += '<div class="row clearfix">';
		for(var j=0; j<this.colsNum; j++) {
			gridHTML += '<div class="col">';
			gridHTML += '</div>';
		}
		gridHTML += '</div>';
	}
	jQuery('#tank-grid').html(gridHTML);
}
Grid.prototype.init = function() {
	this.draw();
}