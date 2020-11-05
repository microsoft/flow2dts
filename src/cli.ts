import { transformFileSync } from "@babel/core"
// @ts-ignore
import pluginSyntaxFlow from "@babel/plugin-syntax-flow"
import { transform as pluginFlow2DTS } from "./transform"

function main() {
  const inputs = process.argv.slice(2)
  inputs.forEach((input) => {
    const result = transformFileSync(input, {
      plugins: [pluginSyntaxFlow, pluginFlow2DTS],
    })
    console.log(result!.code)
  })
}

main()
