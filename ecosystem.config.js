module.exports = {
    apps: [
        {
            name: `drwu`,
            script: "index.js",
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}
