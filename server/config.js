'use strict';

function getEnv() {
	if (process.env.NODE_ENV === 'production') {
		return 'prod'
	} else {
		return 'dev';
	}
}

module.exports = appInfo => {
	const env = getEnv();
	console.log(`当前环境：${env}, 生效的配置文件：./config/config.${env}.js`);
	return require(`./config/config.${env}.js`)(appInfo);
};

