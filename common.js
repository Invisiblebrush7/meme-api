class Common {
	msg = '';

	getMessage() {
		return this.msg;
	}
	setMessage(params) {
		this.msg = params;
	}
}

// let msg = '';
// module.exports = function (param) {
// 	if (param) msg = param;

// 	return msg;
// };

module.exports = new Common();
