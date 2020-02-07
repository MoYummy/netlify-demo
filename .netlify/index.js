const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf').sync;

const prepareNpmrc = () => {
  const npmConfigUserconfig = process.env.NPM_CONFIG_USERCONFIG;
  if (process.env.NPMRC && npmConfigUserconfig) {
    const npmrc = Buffer.from(process.env.NPMRC, 'base64').toString();
    console.info(`writing to ${npmConfigUserconfig}`);
    fs.writeFileSync(npmConfigUserconfig, npmrc, { mode: 0o600, flag: 'w' });
  }
};

const build = () => {
  const base = path.resolve(__dirname, '../packages/host-app');
  const options = { cwd: base, stdio: 'inherit', env: { ...process.env } };
  const npmInstall = execSync('npm install --silient', options);
  console.info(npmInstall);
  const npmRunBuild = execSync('npm run build', options);
  console.info(npmRunBuild);
};

const copyDist = () => {
  const srcDir = path.resolve(__dirname, '../packages/host-app/dist');
  const destDir = path.resolve(__dirname, 'dist');

  if (fs.existsSync(destDir)) {
    rimraf(destDir);
  }

  const queue = [{ src: srcDir, dest: destDir}];
  while (queue.length > 0) {
    const { src, dest } = queue.pop();
    fs.mkdirSync(dest);
    const files = fs.readdirSync(src);
    for (let i = 0, l = files.length; i < l; i += 1) {
      const srcPath = path.join(src, files[i]);
      const destPath = path.join(dest, files[i]);
      if (fs.lstatSync(srcPath).isDirectory()) {
        queue.push({ src: srcPath, dest: destPath });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
};

Promise.resolve().then(prepareNpmrc).then(build).then(copyDist);