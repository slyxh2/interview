// remove preset to build tsx to esmodule
module.exports = {
    "presets": [
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    "plugins": [
        ["auto-import", {
            "declarations": [
                { "default": "React", "path": "react" }
            ]
        }]
    ]
}