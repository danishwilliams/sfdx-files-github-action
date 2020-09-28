const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const changedFiles = core.getInput('changed-files');
    console.log(`changedFiles json ${JSON.stringify(changedFiles)}`);
    console.log('changedFiles raw', changedFiles);

    let sfFilePaths = [];
    changedFiles.forEach(filePath => {
        if (filePath.indexOf('force-app/main/default') === 0)
            sfFilePaths.push(filePath);
    });

    console.log(sfFilePaths.join(','));
    core.setOutput("files-to-deploy", sfFilePaths.join(','));

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}