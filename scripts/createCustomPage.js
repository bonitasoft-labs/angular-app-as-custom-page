const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const rootPath = process.cwd();
console.log(rootPath);
// Define paths
const sourceFile = path.join(rootPath, 'resources/page.properties');
const distResourcesDir = path.join(rootPath, 'dist/resources');
const distDir = path.join(rootPath, 'dist');
const customPageDir = path.join(rootPath, 'customPage');
const packageJsonPath = path.join(rootPath, 'package.json');

// Ensure directories exist
[distResourcesDir, customPageDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy page.properties
fs.copyFileSync(sourceFile, path.join(distResourcesDir, 'page.properties'));

// Get application name from package.json
const appName = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).name;

// Create a file to stream archive data to
const zipFile = path.join(customPageDir, `${appName}.zip`);
const output = fs.createWriteStream(zipFile);
const archive = archiver('zip', { zlib: { level: 9 } });

// Listen for all archive data to be written
output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('Archiver has been finalized and the output file descriptor has closed.');
});

// Catch warnings and errors
archive.on('warning', err => { if (err.code !== 'ENOENT') throw err; });
archive.on('error', err => { throw err; });

// Pipe archive data to the file
archive.pipe(output);

// Append files from dist directory
archive.directory(distDir, false);

// Finalize the archive
archive.finalize();