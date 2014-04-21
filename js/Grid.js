/**
 * Class Grid
 * @param rowsNum
 * @param colsNum
 * @constructor
 */
function Grid(rowsNum, colsNum) {
	this.rowsNum = rowsNum;
	this.colsNum = colsNum;
	this.draw = function() {
		var gridHTML = '';
		for(var i=0; i<this.rowsNum; i++) {
			gridHTML += '<div class="row clearfix">';
			for(var j=0; j<this.colsNum; j++) {
				gridHTML += '<div class="col">';
				gridHTML += '</div>';
			}
			gridHTML += '</div>';
		}
		dome.get("#tank-grid").html(gridHTML);
	}
	this.init = function() {
		this.draw();
	}
}