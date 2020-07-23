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

  ![BuildPipelineName](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineName.png)

The following is the detail of the build pipeline:

![BuildPipelineDetailAll](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineDetailAll.png)

The following lists explanations for each part:

![BuildPipelineDetailTrigger](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineDetailTrigger.png)

In the "trigger" section, the pipeline is set to run only when a commit is pushed to the 'master' branch and 'develop' branch except that only change was made to the 'README.md' file or any '.yml' files started with azure.



![BuildPipelineDetailVariables](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineDetailVariables.png)

In the variables section, buildDir was set as folder called 'build'.



![BuildPipelineDetailDownloadSecureFile](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineDetailDownloadSecureFile.png)

In the step of 'Download .env.local', the secure file '.env.local' that stored in the Azure DevOps Pipelines was downloaded to agent machine.



You can manage yourselves secure files in the tag shown below. For more details about how to access secure files stored in AzureDevOps, read https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/download-secure-file?view=azure-devops

![LibrarySecureFiles](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/LibrarySecureFiles.png)



![BuildPipelineDetailCopyEnv](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineDetailCopyEnv.png)

In the next step, the '.env.local' that stores APIkey would be copied to the root folder of React application. In this step, actually only the copy command line is necessary. 



![BuildPipelineDetailInstalNodeJs](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineDetailInstalNodeJs.png)

Then, we download Node.js in the agent machine.



Then, install and build the React app

![BuildPipelineDetailInstalNPMandBuild](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineDetailInstalNPMandBuild.png)



In the last two steps, the build folder would be compressed and published as artifacts.









###### Release Pipeline:

![ReleasePipelineOverview](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineOverview.png)

In the release pipeline, the above build pipeline was set as source that published the artifact.

![ReleasePipelineAritifact](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineAritifact.png)

Meanwhile, enable the trigger that would automatically start release pipeline if new build pipeline from 'master' branch completed.

![ReleasePipelineTrigger](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineTrigger.png)



Once release pipeline start, the task of deployment would begin to deploy React app to corresponding Azure web service.

![ReleasePipelineStage1](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineStage1.png)