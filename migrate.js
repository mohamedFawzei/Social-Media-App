const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const srcDir = path.join(rootDir, "src");

const targets = [];

// Helper to convert string to PascalCase
function toPascalCase(str) {
  if (!str) return str;
  // Capitalize first letter of the string (and after delimiters)
  // Handle 'post-details' -> 'PostDetails', 'createPost' -> 'CreatePost'
  // 'auth.api.js' -> 'Auth.api.js' (Treat dots as separators? User didn't specify, but for consistency I will capitalize usually only the leading char of segments if dots act as extensions or types)
  // Re-evaluating 'auth.api.js'. If I use logic: replace start or [- _] with Upper.
  // 'auth.api.js': 'auth' -> 'Auth'. '.api' -> '.api' (dot not in regex).
  // Result: 'Auth.api.js'. This is safe and looks like convention.

  return str.replace(/(^|[-_])(\w)/g, (match, separator, char) => {
    return char.toUpperCase();
  });
}

// Recursive walker to collect renames
function walk(dir) {
  let items;
  try {
    items = fs.readdirSync(dir);
  } catch (e) {
    console.error(`Could not read dir ${dir}`, e);
    return;
  }

  // Sort items to ensure consistent order if needed, but recursion order matters most
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
        type: stat.isDirectory() ? "dir" : "file", // actually logic is same
      });
    }
  }
}

// Collect renames
if (fs.existsSync(srcDir)) {
  walk(srcDir);
} else {
  console.error("src directory not found!");
  process.exit(1);
}

console.log(`Found ${targets.length} items to rename.`);

// Update File Content Logic
function updateFileContent(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;

    // Regex to find paths in imports/exports/src attrs.
    // Captures: 1=prefix, 2=path, 3=suffix
    // We look for paths starting with . or /src or src/
    // NOTE: We must be careful not to break non-path strings.
    // Heuristic: Strings inside quotes that look like paths.

    content = content.replace(
      /(["'])(\.?\.?\/.*?)(\1)/g,
      (match, quote, pathStr, endQuote) => {
        // Check if it looks like a relative path or src path
        if (
          !pathStr.startsWith(".") &&
          !pathStr.startsWith("/src") &&
          !pathStr.startsWith("src/")
        ) {
          return match;
        }

        // Split and transform
        const parts = pathStr.split("/");
        const newParts = parts.map((p) => {
          if (p === "." || p === "..") return p;
          if (p === "") return p;
          // Don't rename 'src' itself if checks match, but inside src yes.
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
// Targets are collected bottom-up (children processed in recursion before adding self to list? No.)
// wait. `walk` calls `walk(child)`. Then adds `item`.
// So children loops finish. Then parent is added.
// So `targets` has children first?
// Example: src/a/b. `walk(src) -> walk(a) -> walk(b)`.
// `walk(b)`: adds `b` -> `B`.
// `walk(a)`: adds `a` -> `A`.
// So `targets = [B, A]`.
// If I rename B first: `src/a/b` -> `src/a/B`. OK.
// Then A: `src/a` -> `src/A`. OK.
// Order is correct.

for (const target of targets) {
  const oldPath = target.path;
  // Wait. If I renamed a child, the parent path is still valid for capturing the *parent's* rename?
  // Target.path was captured at start.
  // If I rename `src/a/b` -> `src/a/B`.
  // Next target is `src/a`. Rename to `src/A`.
  // The path `src/a` is still valid on disk? Yes, until I rename it.
  // So the order MUST be Children First.
  // My walk adds children *after* recursion returns?
  // `walk(parent)`:
  //    `walk(child)` -> adds child.
  //    adds parent.
  // Yes. `targets` has children before parents.

  // BUT! Since `oldPath` is absolute, if I rename the child, the parent's absolute path hasn't changed.
  // So renaming child `../a/b` to `../a/B` works.
  // Then renaming parent `../a` to `../A` works.
  // Because `fs.renameSync` takes the old path.
  // Perfect.

  const newPath = path.join(target.parent, target.newName);

  // Windows Rename Case Sensitivity fix
  // Only needed if oldName.toLowerCase() === newName.toLowerCase()

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
