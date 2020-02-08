const core = require('@actions/core');
const { execSync } = require('child_process');
const { exec } = require('@actions/exec');
const fs = require('fs');
const path = require('path');

const run = async () => {
  try {
    const commit = core.getInput('commit') || process.env.GITHUB_SHA;
    const branch = core.getInput('branch');
    const diffPatch = `/tmp/${commit}.patch`;
    execSync(`git diff ${branch} ${commit}> ${diffPatch}`);
    await exec(`git checkout ${branch}`);
    await exec(`git apply ${diffPatch}`);
    await exec(`git config --local user.name bot`);
    await exec(`git config --local user.email <>`);
    await exec(`git commit -a -m ${commit}`);
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
};

run();
