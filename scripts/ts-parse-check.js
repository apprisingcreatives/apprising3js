const ts = require("typescript");
const fs = require("fs");
const path = process.argv[2];
const text = fs.readFileSync(path, "utf8");
const sf = ts.createSourceFile(
  path,
  text,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
if (sf.parseDiagnostics.length === 0) {
  console.log("No parse diagnostics");
  process.exit(0);
}
sf.parseDiagnostics.forEach((d) => {
  const { line, character } = sf.getLineAndCharacterOfPosition(d.start || 0);
  console.log(`${path}:${line + 1}:${character + 1} ${d.messageText}`);
});
