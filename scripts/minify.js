#!/usr/bin/env node
/**
 * Minifies bootlegance.js to bootlegance.min.js at repository root and docs/.
 * Can be run with Node.js directly (`node scripts/minify.js`).
 * Uses terser CLI via child_process or npx terser fallback.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sourceFile = path.join(repoRoot, 'bootlegance.js');
const rootMinFile = path.join(repoRoot, 'bootlegance.min.js');
const docsMinFile = path.join(repoRoot, 'docs', 'bootlegance.min.js');

if (!fs.existsSync(sourceFile)) {
  console.error(`Error: Source file ${sourceFile} does not exist.`);
  process.exit(1);
}

// Preserve banner/license comments if present
const bannerComment = '/*! Bootlegance | MIT License | https://github.com/lesichkovm/bootlegance */\n';

console.log(`Minifying ${sourceFile}...`);

// Determine terser command: local binary, npx terser, or terser in PATH
let terserCmd = null;
const possibleCmds = [
  'terser',
  'npx --yes terser'
];

for (const cmd of possibleCmds) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    terserCmd = cmd;
    break;
  } catch (e) {
    // Continue to next
  }
}

if (!terserCmd) {
  console.error('Error: Could not find `terser` or run `npx --yes terser`.');
  process.exit(1);
}

try {
  // Run terser with compression, mangling, and comment preservation
  const minifiedCode = execSync(
    `${terserCmd} "${sourceFile}" --compress --mangle --comments "/^!/"`,
    { encoding: 'utf8' }
  );

  const finalOutput = (minifiedCode.startsWith('/*!') ? '' : bannerComment) + minifiedCode.trim() + '\n';

  // Write to repository root
  fs.writeFileSync(rootMinFile, finalOutput, 'utf8');
  console.log(`Wrote minified script to ${rootMinFile} (${fs.statSync(rootMinFile).size} bytes)`);

  // Mirror to docs/ if docs directory exists
  const docsDir = path.join(repoRoot, 'docs');
  if (fs.existsSync(docsDir)) {
    fs.writeFileSync(docsMinFile, finalOutput, 'utf8');
    console.log(`Mirrored minified script to ${docsMinFile}`);
  }

  // Also make sure docs/bootlegance.js stays synchronized with bootlegance.js
  const docsSourceFile = path.join(docsDir, 'bootlegance.js');
  if (fs.existsSync(docsDir)) {
    fs.copyFileSync(sourceFile, docsSourceFile);
  }

  console.log('Minification completed successfully.');
} catch (err) {
  console.error('Error during minification:', err.message);
  process.exit(1);
}
