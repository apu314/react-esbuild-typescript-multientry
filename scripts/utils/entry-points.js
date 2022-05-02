/**
 * This module is used to define entry points for the application.
 *
 * It should return an array of strings that will act as the entry points
 */

const path = require("path");
const ts = require("typescript");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const cwd = process.cwd();
console.log("cwd -->", cwd);

const { argv } = yargs(hideBin(process.argv))
    .option("config", {
        describe: "Path to the config file",
        type: "string",
    })
    .option("clean", {
        describe: "Clean the output directory before build",
        type: "boolean",
    });

console.log("argv -->", argv);

const getTSConfig = (_tsConfigFile = "tsconfig.json") => {
    console.log("path.resolve(cwd, 'tsconfig.json') --> ", path.resolve(cwd, "tsconfig.json"));

    const tsConfigFile = ts.findConfigFile(cwd, ts.sys.fileExists, _tsConfigFile)
    if (!tsConfigFile) {
        throw new Error(`tsconfig.json not found on the directory ${cwd}`);
    }

    const configFile = ts.readConfigFile(tsConfigFile, ts.sys.readFile)
    const tsConfig = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        cwd
    )

    return { tsConfig, configFile }

};

getTSConfig();

module.exports = () => {};
