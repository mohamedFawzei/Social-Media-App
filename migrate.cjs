const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const srcDir = path.join(rootDir, "src");

const targets = [];

// Helper to convert string to PascalCase
function toPascalCase(str) {
  if (!str) return str;
  return str.replace(/(^|[-_])(\w)/g, (match, separator, char) => {
    return char.toUpperCase();
  });
}

function walk(dir) {
  let items;
  try {
    items = fs.readdirSync(dir);
  } catch (e) {
    console.error(`Could not read dir ${dir}`, e);
    return;
  }

  for (const item of items) {
    const fullPath = path.join(dir, item);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      walk(fullPath);
    }

    const newName = toPascalCase(item);
    if (newName !== item) {
      targets.push({
        path: fullPath,
        parent: dir,
        oldName: item,
        newName: newName,
        type: stat.isDirectory() ? "dir" : "file",
      });
    }
  }
}

if (fs.existsSync(srcDir)) {
  walk(srcDir);
} else {
  console.error("src directory not found!");
  process.exit(1);
}

console.log(`Found ${targets.length} items to rename.`);

function updateFileContent(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;

    content = content.replace(
      /(["'])(\.?\.?\/.*?)(\1)/g,
      (match, quote, pathStr, endQuote) => {
        if (
          !pathStr.startsWith(".") &&
          !pathStr.startsWith("/src") &&
          !pathStr.startsWith("src/")
        ) {
          return match;
        }

        const parts = pathStr.split("/");
        const newParts = parts.map((p) => {
          if (p === "." || p === "..") return p;
          if (p === "") return p;
          if (p === "src") return p;

          return toPascalCase(p);
        });

        const newPath = newParts.join("/");
        if (newPath !== pathStr) {
          changed = true;
          return quote + newPath + endQuote;
        }
        return match;
      },
    );

    if (changed) {
      console.log(`Updating imports in ${filePath}`);
      fs.writeFileSync(filePath, content, "utf8");
    }
  } catch (e) {
    console.error(`Error processing ${filePath}`, e);
  }
}

function walkForContent(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkForContent(fullPath);
    } else {
      if (/\.(jsx?|css|html|json)$/.test(item)) {
        updateFileContent(fullPath);
      }
    }
  }
}

console.log("Updating file contents...");
walkForContent(srcDir);
if (fs.existsSync(path.join(rootDir, "router.jsx")))
  updateFileContent(path.join(rootDir, "router.jsx"));
if (fs.existsSync(path.join(rootDir, "index.html")))
  updateFileContent(path.join(rootDir, "index.html"));

console.log("Renaming files...");
for (const target of targets) {
  const oldPath = target.path;
  const newPath = path.join(target.parent, target.newName);

  try {
    if (target.oldName.toLowerCase() === target.newName.toLowerCase()) {
      const tempPath = path.join(
        target.parent,
        target.newName + "_temp_" + Date.now(),
      );
      fs.renameSync(oldPath, tempPath);
      fs.renameSync(tempPath, newPath);
    } else {
      fs.renameSync(oldPath, newPath);
    }
    console.log(`Renamed: ${target.oldName} -> ${target.newName}`);
  } catch (e) {
    console.error(`Failed to rename ${oldPath} to ${target.newName}`, e);
  }
}
