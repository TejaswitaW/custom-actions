const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // Get some input values
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: true});
    const distFolder = core.getInput('dist-folder', {required: true});
    core.notice('Hello from my custom Javascript Action');
    core.notice('Uploading static site to AWS s3');

    // Using these inputs we upload files
    // creating identifier of S3 bucket, that path is constructed dynamically
    const s3Uri = `s3://${bucket}`;
    // exec.exec('aws s3 sync <localFolder> <s3-bucket path> ')
    // exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)
    exec.exec(`echo "Dist-Folder: ${distFolder} S3Uri: ${s3Uri} Bucket-Region: ${bucketRegion}"`);
    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    exec.exec(`echo "Website Url: ${websiteUrl}"`);
    core.setOutput('website-url',websiteUrl);
  
}

run();