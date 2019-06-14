const isProduction = process.env.NODE_ENV === "production";

module.exports = {

    //     default     //
    outputDir: "dist",
    assetsDir: "",
    indexPath: "index.html",
    filenameHashing: true,
    runtimeCompiler: false,
    productionSourceMap: true,
    //     default     //

    lintOnSave: !isProduction,
    publicPath: isProduction ? "/" : "/",
    chainWebpack: config => {

        !isProduction && config.module.rule("eslint").use("eslint-loader").loader("eslint-loader").tap(options => ({ ...options, fix: true, emitError: true, failOnWarning: true, failOnError: true }));

    },
    devServer: {
        proxy: ""
    },
    pluginOptions: {
        // lintStyleOnBuild: true,
        stylelint: {
            fix: true,
            failOnError: true,
            files: ["**/*.{vue,htm,html,css,sss,less,scss,sass}"]
        }
    }
};
