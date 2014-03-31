module.exports = BufferHelper;

function BufferHelper() {
	this.buffers = [];
}

BufferHelper.prototype.add = function(buffer) {
	this.buffers.push(buffer);
	return this;
}

BufferHelper.prototype.clear = function() {
	this.buffers = [];
	return this;
}

BufferHelper.prototype.toBuffer = function() {
	return Buffer.concat(this.buffers); 
}

BufferHelper.prototype.toString = function(encoding) {
	return this.toBuffer().toString(encoding);
}