const fs = require("fs-extra");
const path = require("path");

const sourceDir = path.join(__dirname, "../apps/cms/src/config");
const destDir = path.join(__dirname, "../apps/web/payload");

async function removeFile(filePath) {
  try {
    await fs.remove(filePath);
    console.log(`File removed at ${filePath}`);
  } catch (err) {
    console.error("Error during file removal:", err);
  }
}

async function syncDirectories(srcDir, destDir) {
  try {
    // Copy files from source to destination
    await fs.copy(srcDir, destDir, {
      overwrite: true,
      errorOnExist: false,
    });

    // Remove files from destination that do not exist in source
    const srcFiles = await fs.readdir(srcDir);
    const destFiles = await fs.readdir(destDir);

    for (const file of destFiles) {
      if (!srcFiles.includes(file)) {
        await removeFile(path.join(destDir, file));
      }
    }

    console.log(`Directories ${srcDir} and ${destDir} are now in sync`);
  } catch (err) {
    console.error("Error during directory sync:", err);
  }
}

// Sync directories at startup
syncDirectories(sourceDir, destDir);
