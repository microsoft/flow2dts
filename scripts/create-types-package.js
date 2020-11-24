const fs = require("fs")
const fse = require("fs-extra")
const os = require("os")
const path = require("path")
const childProcess = require("child_process")

const packageTemplate = process.argv[2]
const outDir = process.argv[3]

const tempdir = path.join(os.tmpdir(), `flow2dts-${new Date().getTime()}`)
fse.copySync(outDir, tempdir)

const package = JSON.parse(fs.readFileSync(packageTemplate, "utf8"))
package.name = "@types/react-native"
fs.writeFileSync(path.join(tempdir, "package.json"), JSON.stringify(package), "utf8")

const cwd = process.cwd()
process.chdir(tempdir)
childProcess.execFileSync("npm", ["pack"])
const packageFilename = `types-react-native-${package.version}.tgz`
fse.moveSync(path.join(tempdir, packageFilename), path.join(cwd, packageFilename))
