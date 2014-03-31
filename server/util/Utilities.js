module.exports = Utilities;

function Utilities() {
	this.buffers = [];
}

Utilities.now = function (argument) {
    return new Date().getTime();
}
