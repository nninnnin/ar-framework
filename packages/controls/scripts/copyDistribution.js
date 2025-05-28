const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const targetDir = path.resolve(
  __dirname,
  "../../../web/public/features/controls"
);

const jsFile = fs
  .readdirSync(distDir)
  .find((file) => /^index\.[a-z0-9]+\.js$/.test(file));

if (jsFile) {
  fs.copyFileSync(
    path.join(distDir, jsFile),
    path.join(targetDir, "index.js")
  );

  console.log(`✔ Copied ${jsFile} → index.js`);
} else {
  console.warn("⚠ No index.[hash].js found");
}

const cssFile = fs
  .readdirSync(distDir)
  .find((file) =>
    /^index\.[a-z0-9]+\.css$/.test(file)
  );

if (cssFile) {
  fs.copyFileSync(
    path.join(distDir, cssFile),
    path.join(targetDir, "index.css")
  );

  console.log(`✔ Copied ${cssFile} → index.css`);
} else {
  console.warn("⚠ No index.[hash].css found");
}
