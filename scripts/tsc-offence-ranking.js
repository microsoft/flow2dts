const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

const errors = {}

readline.on("line", (line) => {
  const match = line.match(/\bTS\d+\b/)
  if (match) {
    errors[match[0]] = (errors[match[0]] || 0) + 1
  }
})

readline.on("close", () => {
  Array.from(Object.entries(errors))
    .sort((a, b) => b[1] - a[1])
    .forEach(([code, occurrences]) => {
      console.log(`${occurrences.toString().padStart(4, " ")} ${code}`)
    })
})
