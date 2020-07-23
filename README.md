#### Make sure to have the following ready when you submit.

1. - [x] Azure build pipeline

   - Enable a continuous deployment to create releases on new commits to `develop` and `master` branches.

2. - [x] Azure release pipeline

   - Enable a continuous deployment to deploy your release to Azure for new commits to `master` branch.

3. - [x] A deployed website on Azure (Add the URL of your website on your project README)

4. - [ ] Write a short description of your build and release pipelines in your project README (This is a your chance to explain to us what you have implemented for your build & release pipeline and why 😃)

5. - [ ] GitHub repo (Add us as contributor → Submit the invite link)

Submission form on the main page



------

- ######  The URL of my website: 

  https://msa2020-phase1-devops-reactwebapp-assignment.azurewebsites.net/



- ######  short description of your build and release pipelines in your project README

  My build pipeline:

  ![BuildPipelineName](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineName.png)

The following is the detail of the build pipeline:

![BuildPipelineDetailAll](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineDetailAll.png)

The following lists explanations for each part:

![BuildPipelineDetailTrigger](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineDetailTrigger.png)

In the "trigger" section, the pipeline is set to run only when a commit is pushed to the 'master' branch and 'develop' branch except that only change was made to the 'README.md' file or any '.yml' files started with azure.



![BuildPipelineDetailVariables](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineDetailVariables.png)

In the variables section, buildDir was set as folder called 'build'.



![BuildPipelineDetailDownloadSecureFile](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineDetailDownloadSecureFile.png)

In the step of 'Download .env.local', the secure file '.env.local' that stored in the Azure DevOps Pipelines was downloaded to agent machine.



You can manage yourselves secure files in the tag shown below. For more details about how to access secure files stored in AzureDevOps, read https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/download-secure-file?view=azure-devops

![LibrarySecureFiles](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\LibrarySecureFiles.png)



![BuildPipelineDetailCopyEnv](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineDetailCopyEnv.png)

In the next step, the '.env.local' that stores APIkey would be copied to the root folder of React application. In this step, actually only the copy command line is necessary. 



![BuildPipelineDetailInstalNodeJs](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineDetailInstalNodeJs.png)

Then, we download Node.js in the agent machine.



Then, install and build the React app

![BuildPipelineDetailInstalNPMandBuild](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\BuildPipelineDetailInstalNPMandBuild.png)



In the last two steps, the build folder would be compressed and published as artifacts.









###### Release Pipeline:

![ReleasePipelineOverview](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\ReleasePipelineOverview.png)

In the release pipeline, the above build pipeline was set as source that published the artifact.

![ReleasePipelineAritifact](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\ReleasePipelineAritifact.png)

Meanwhile, enable the trigger that would automatically start release pipeline if new build pipeline from 'master' branch completed.

![ReleasePipelineTrigger](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\ReleasePipelineTrigger.png)



Once release pipeline start, the task of deployment would begin to deploy React app to corresponding Azure web service.

![ReleasePipelineStage1](D:\Dev Folder\MSA Projects\msa-2020-phase1-frontenddev-reactwebapp-assignment\Images\ReleasePipelineStage1.png)