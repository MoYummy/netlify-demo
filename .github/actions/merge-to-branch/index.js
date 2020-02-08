const core = require('@actions/core');
const { execSync } = require('child_process');

const execAndPrint = (cmd, ...args) => console.info(execSync(cmd, ...args).toString());

const run = () => {
  try {
    const repo = core.getInput('repo').trim();
    const token = core.getInput('token').trim();
    const commit = core.getInput('commit').trim();
    const branch = core.getInput('branch').trim();
    const origin = `https://x-access-token:${token}@github.com/${repo}.git`;
    const cwd = `/tmp/temp_repo`;
    const diffPatch = `/tmp/${commit}.patch`;

    core.info('==== Generate diff patch ====');
    execAndPrint(`git diff origin/${branch} ${commit}> ${diffPatch}`);
    execSync(`git clone --quiet --branch ${branch} --depth 1 ${origin} ${cwd}`);
    execSync('git config --local user.name bot', { cwd });
    execSync('git config --local user.email "<>"', { cwd });
    core.info('==== Apply diff patch ====');
    execSync(`git apply ${diffPatch}`, { cwd });
    execSync(`echo ${commit}> .netlify/.trigger.txt`, { cwd });
    core.info('==== Commit & Push ====');
    execAndPrint('git add --all .', { cwd });
    execAndPrint(`git commit -m ${commit}`, { cwd });
    execAndPrint(`git push ${origin} ${branch}`, { cwd, encoding: 'utf8' });
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
};

run();
