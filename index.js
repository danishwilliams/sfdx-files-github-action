const core = require('@actions/core');
const github = require('@actions/github');

try {
    const changedFiles = JSON.parse(core.getInput('changed-files'));
    const addedFiles = JSON.parse(core.getInput('added-files'));
    const renamedFiles = JSON.parse(core.getInput('renamed-files'));

    const allFiles = [...changedFiles, ...addedFiles, ...renamedFiles];

    console.log('allFiles raw', allFiles);

    let sfFilePaths = [];
    let sfTestFilePaths = [];
    allFiles.forEach(filePath => {
        if (filePath.indexOf('force-app/main/default') === 0)
            sfFilePaths.push(filePath);

        var filename = filePath.replace(/^.*[\\\/]/, '');
        if (filename.toLowerCase().includes('test') && filename.endsWith('.cls'))
            sfTestFilePaths.push(filePath);
    });

    var sfFilePathsComma = sfFilePaths.join(',')
    var sfTestFilePathsComma = sfTestFilePaths.join(',')

    console.log('sfFilePathsComma', sfFilePathsComma);
    console.log('sfTestFilePathsComma', sfTestFilePathsComma);
    
    core.setOutput("files-to-deploy", sfFilePathsComma);
    core.setOutput("test-files", sfTestFilePathsComma);

    // Get the JSON webhook payload for the event that triggered the workflow
    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}