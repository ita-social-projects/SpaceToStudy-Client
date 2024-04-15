const fs = require('fs')
const path = require('path')
const sass = require('sass')

const INPUT_FOLDER_PATH = path.resolve(__dirname, '..')
const OUTPUT_FOLDER_PATH = path.resolve(__dirname, '..', '..', 'lib')
const ATOMIC_DESIGN_FOLDERS = ['atoms', 'molecules', 'organisms']

const CONSOLE_COLORS = {
  green: '\x1b[32m',
  gray: '\x1b[90m',
  reset: '\x1b[0m',
  white: '\x1b[37m'
}

// Example usage: "npm run scss-compile --logger --compact"
const isLoggerEnabled = process.argv.includes('--logger')
const isCompactCompilationStyle = process.argv.includes('--compact')

if (!fs.existsSync(OUTPUT_FOLDER_PATH)) {
  fs.mkdirSync(OUTPUT_FOLDER_PATH)
}

compile(
  path.resolve(INPUT_FOLDER_PATH, 'global.scss'),
  path.resolve(OUTPUT_FOLDER_PATH, 'global.css')
)
getComponents().forEach(({ inputFilePath, outputFilePath }) =>
  compile(inputFilePath, outputFilePath)
)

function log(message, color = CONSOLE_COLORS.white) {
  console.log(color, message, CONSOLE_COLORS.reset)
}

function compile(scssFilePath, cssFilePath) {
  const result = sass.compile(scssFilePath, {
    sourceMap: true,
    style: isCompactCompilationStyle ? 'compressed' : 'expanded',
    loadPaths: [INPUT_FOLDER_PATH, 'node_modules/normalize-scss/sass']
  })

  fs.writeFileSync(cssFilePath, result.css)
}

function getComponents() {
  const components = []

  ATOMIC_DESIGN_FOLDERS.forEach((folder) => {
    if (isLoggerEnabled) {
      log(`[${folder}]`, CONSOLE_COLORS.green)
    }

    const folderByTypePath = path.resolve(INPUT_FOLDER_PATH, folder)
    const files = fs.readdirSync(folderByTypePath)

    for (const filePath of files) {
      const isScssFile = path.extname(filePath) === '.scss'

      if (!isScssFile) {
        const filename = path.basename(filePath)
        if (isLoggerEnabled) {
          log(
            `  [skip] "${filename}" is not a .scss file and won't be compiled!`,
            CONSOLE_COLORS.gray
          )
        }
        continue
      }

      if (isLoggerEnabled) {
        log(`  [file] Compiling "${filePath}" file...`)
      }

      const inputFilePath = path.resolve(folderByTypePath, filePath)
      const outputFilePath = path.resolve(
        OUTPUT_FOLDER_PATH,
        filePath.replace(/scss$/, 'css')
      )

      components.push({ inputFilePath, outputFilePath })
    }
  })

  return components
}
