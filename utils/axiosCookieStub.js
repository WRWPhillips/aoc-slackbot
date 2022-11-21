const axios = require("axios");

const axiosCookieStub = (cookie) => {

	return axios.create({
		headers: {
			Cookie: `session=${cookie}`
		}
	});
}

module.exports = axiosCookieStub;
