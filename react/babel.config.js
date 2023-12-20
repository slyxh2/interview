module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    "plugins": [
        "react-refresh/babel",
        ["auto-import", {
            "declarations": [
                { "default": "React", "path": "react" }
            ]
        }]
    ]
}