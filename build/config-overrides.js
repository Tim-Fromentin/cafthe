module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: "asset/resource",
    });
    return config;
};
