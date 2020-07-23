Todo:

- [ ] re-layout documents
- [ ] frontend part docs

------

##  1. The URL of my website: 

https://msa2020-phase1-devops-reactwebapp-assignment.azurewebsites.net/



##  2. Description of build and release pipelines(what and why)

My build pipeline:

![BuildPipelineName](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineName.png)

The following is the detail of the build pipeline:

```yaml
# Starter pipeline
# Start with a minimal pipeline that you can customize to build and deploy your code.
# Add steps that build, run tests, deploy, and more:
# https://aka.ms/yaml

trigger:
  branches:
    include:
      - master
      - develop
  paths:
    exclude:
    - README.md # This tells the pipeline not to trigger if the only change was made was made to the README.md file regardless of on which branch the change is made.
    - azure*.yml
    - Images/*

variables:
  # rootDir: '.'
  buildDir: 'build'

pool:
  vmImage: 'ubuntu-latest'

steps:
# Download secure file
# Download a secure file to the agent machine
- task: DownloadSecureFile@1
  name: myEnvFile # The name with which to reference the secure file's path on the agent, like $(mySecureFile.secureFilePath)
  displayName: 'Download .env.local'
  inputs:
    secureFile: '.env.local' # The file name or GUID of the secure file

- script: |
    echo "`ls -la`"
    echo download the env.local containing APIkeys
    echo "`cat $(myEnvFile.secureFilePath)`"
    cp $(myEnvFile.secureFilePath) ./.env.local
    echo "`ls -la`"
  displayName: 'Copy .env.local to App root folder'

- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'
  
- script: |
    npm install
    npm run build
  displayName: 'npm install and build'
  
- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '$(buildDir)'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
    replaceExistingArchive: true
    
- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
    publishLocation: 'Container'
```





The following lists explanations for each part:

```yaml
trigger:
  branches:
    include:
      - master
      - develop
  paths:
    exclude:
    - README.md # This tells the pipeline not to trigger if the only change was made was made to the README.md file regardless of on which branch the change is made.
    - azure*.yml
    - Images/*
```



In the "trigger" section, the pipeline is set to run only when a commit is pushed to the 'master' branch and 'develop' branch except that only change was made to the 'README.md' file or any '.yml' files started with azure.



```yaml
variables:
  # rootDir: '.'
  buildDir: 'build'
```

In the variables section, buildDir was set as folder called 'build'.



```yaml
# Download secure file
# Download a secure file to the agent machine
- task: DownloadSecureFile@1
  name: myEnvFile # The name with which to reference the secure file's path on the agent, like $(mySecureFile.secureFilePath)
  displayName: 'Download .env.local'
  inputs:
    secureFile: '.env.local' # The file name or GUID of the secure file
```

In the step of 'Download .env.local', the secure file '.env.local' that stored in the Azure DevOps Pipelines was downloaded to agent machine.



You can manage yourselves secure files in the tag shown below. For more details about how to access secure files stored in AzureDevOps, read https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/download-secure-file?view=azure-devops

![LibrarySecureFiles](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/LibrarySecureFiles.png)

```yaml
- script: |
    echo "`ls -la`"
    echo download the env.local containing APIkeys
    echo "`cat $(myEnvFile.secureFilePath)`"
    cp $(myEnvFile.secureFilePath) ./.env.local
    echo "`ls -la`"
  displayName: 'Copy .env.local to App root folder'
```

In the next step, the '.env.local' that stores APIkey would be copied to the root folder of React application. In this step, actually only the copy command line is necessary. 



```yaml
- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'
```

Then, we download Node.js in the agent machine.



Then, install and build the React app

```yaml
- script: |
    npm install
    npm run build
  displayName: 'npm install and build'
```



In the last two steps, the build folder would be compressed and published as artifacts.

```yaml
- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '$(buildDir)'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
    replaceExistingArchive: true
- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
    publishLocation: 'Container'
```







###### Release Pipeline:

![ReleasePipelineOverview](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineOverview.png)

In the release pipeline, the above build pipeline was set as source that published the artifact.

![ReleasePipelineAritifact](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineAritifact.png)

Meanwhile, enable the trigger that would automatically start release pipeline if new build pipeline from 'master' branch completed.

![ReleasePipelineTrigger](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineTrigger.png)



Once release pipeline start, the task of deployment would begin to deploy React app to corresponding Azure web service.

![ReleasePipelineStage1](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineStage1.png)