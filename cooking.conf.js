var path = require('path');
// 引入 cooking 依赖
var cooking = require('cooking');

// 调用 set 方法传入自定义配置
cooking.set({
  entry: './src/main.js', // 指定入口文件
  dist: './pro-seeker', // 设置打包后的文件目录
  hash: true, // 打包的文件是否带 hash
  sourceMap: true, // 是否带 sourceMap
  clean: true,
  template: './index.tpl', // 加载 index.html 模板
  devServer: { // 开启 webpack-dev-server
    port: 8888, // 端口为 8888
    protocol: 'http:',
    hot: true, //热替换
    hostname: '0.0.0.0',
    publicPath: '/' // 开启 dev-server 时默认打包的资源文件路径是和 index.html 同级的
  },
  chunk: true,
  publicPath: '/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: true,
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'sass', 'lint', 'autoprefixer']
});

// 生成 webpack 配置并导出
module.exports = cooking.resolve();
