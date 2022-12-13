class BuildTagPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // 需要处理文件
    const extensions = ["html"];

    // emit是异步串行钩子
    compiler.hooks.emit.tapAsync("BuildTagPlugin", (compilation, callback) => {
      debugger
      // compilation.assets包含所有即将输出的资源
      // 通过过滤只保留需要处理的文件
      const assetPaths = Object.keys(compilation.assets).filter((path) => {
        const splitted = path.split(".");
        return extensions.includes(splitted[splitted.length - 1]);
      });

      // 获取计算机日期及时间
      var date = new Date();
      const formatDateStr = date.toLocaleString(); //获取日期与时间

      // 获取版本号

      // 获取编译入参
      const { version, author, description } = this.options

      // 拼接插入内容
      const insertContent = `
  <!--
    app-version: ${version || '-'};
    app-author: ${author || '-'};
    description: ${description};
    build-time: ${formatDateStr};
  -->`


      assetPaths.forEach((assetPath) => {
        const asset = compilation.assets[assetPath];

        const oldSource = asset.source()
				const startIndex = oldSource.indexOf('<head>') + 6
				const newSource = oldSource.slice(0, startIndex) + insertContent + oldSource.slice(startIndex)

        // 覆盖资源
        compilation.assets[assetPath] = {
          // 资源内容
          source() {
            return newSource;
          },
          // 资源大小
          size() {
            return newSource.length;
          },
        };
      });

      callback();
    });
  }
}

module.exports = BuildTagPlugin;
