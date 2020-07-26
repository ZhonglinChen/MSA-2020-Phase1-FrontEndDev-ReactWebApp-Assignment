# Description

This repo is created for assignments of MSA2020 phase1(https://github.com/NZMSA/2020-Phase-1)

Two parts, **React Web App** and **DevOps** of assignments was completed using this repo.

<br/>

Below content lists *the URL of my deployed website of this repo* and *description of build and release pipelines*.

# Table of contents

1. [The URL of my website](https://github.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment#1-the-url-of-my-website)

2. [Description of build and release pipelines](https://github.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment#2-description-of-build-and-release-pipelines)

   2.1 [Build Pipeline](https://github.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment#21-build-pipeline)

   2.2 [Release Pipeline](https://github.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment#22-release-pipeline)

   <br/>

#  1. The URL of my website: 

https://msa2020-phase1-devops-reactwebapp-assignment.azurewebsites.net/

<br/>

#  2. Description of build and release pipelines

The following list explains for each part in my build and release pipelines(what and why):

## 2.1 Build Pipeline

### Access Build Pipeline

Following screenshot shows where my build pipeline to access:

![BuildPipelineName](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/BuildPipelineName.png)

### Build Pipeline - Overview

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

<br/>

### Build Pipeline - Trigger

The following is the trigger of the build pipeline:

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

In the "trigger" section, the pipeline is set to run only when a commit is pushed to the 'master' branch and 'develop' branch except when only change was made to those 'README.md' related files or any '.yml' files started with azure.

<br/>

### Build Pipeline - Variables

The following is the variables of the build pipeline:

```yaml
variables:
  # rootDir: '.'
  buildDir: 'build'
```

In my project, there is no need o set 'rootDir'. Only 'buildDir' was set as folder called 'build' directly under current root.

<br/>

### Build Pipeline - Steps - Download Secure Files

The following is the step of the build pipeline to download secure files:

```yaml
# Download secure file
# Download a secure file to the agent machine
- task: DownloadSecureFile@1
  name: myEnvFile # The name with which to reference the secure file's path on the agent, like $(mySecureFile.secureFilePath)
  displayName: 'Download .env.local'
  inputs:
    secureFile: '.env.local' # The file name or GUID of the secure file
```

In my project, the file called '.env.local' that stores API key will be only stored locally and at Azure DevOps Library. 

Therefore, in the first step, before building project, the secure file '.env.local' should be downloaded from Azure DevOps to agent machine. This file would be temporarily stored in a folder storing secure files.

For more details about how to access secure files stored in AzureDevOps, read https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/download-secure-file?view=azure-devops 

<br/>

To manage yourselves secure files, you could access the tag shown below. 

![LibrarySecureFiles](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/LibrarySecureFiles.png)

<br/>

### Build Pipeline - Steps - Copy '.Env.local' File  

The following is the step of the build pipeline to copy the '.env.local' from downloaded path to the folder of our React application:

```yaml
- script: |
    echo "`ls -la`"
    echo download the env.local containing APIkeys
    echo "`cat $(myEnvFile.secureFilePath)`"
    cp $(myEnvFile.secureFilePath) ./.env.local
    echo "`ls -la`"
  displayName: 'Copy .env.local to App root folder'
```

In this step, the '.env.local' that stores API key would be copied to the root folder of React application. 

For this part of scripts, actually only `cp $(myEnvFile.secureFilePath) ./.env.local` is necessary.  Other command lines of 'echo' are all used to print content in the terminal, which is good for debug.

<br/>

### Build Pipeline - Steps - Install NodeJS  

The following is the step of the build pipeline to install NodeJS :

```yaml
- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'
```

NodeJS is required to build our React application in the following steps.

<br/>

### Build Pipeline - Steps - Install Packages and Build App  

The following is the step of the build pipeline to install NodeJS :

```yaml
- script: |
    npm install
    npm run build
  displayName: 'npm install and build'
```

In this step, we run two NPM command lines to respectively install dependent packages for our application and then build our React application.

<br/>

### Build Pipeline - Steps - Archive and Publish

The following is the step of the build pipeline to install NodeJS :

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

In the last two steps, the build folder would be compressed and published as artifacts.

<br/>

## 2.2 Release Pipeline

### Release Pipeline - Overview

The following is the overview of the release pipeline:

![ReleasePipelineOverview](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineOverview.png)

### Release Pipeline - Artifact

The following is the Artifact setting of the release pipeline:

![ReleasePipelineAritifact](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineAritifact.png)

In the release pipeline, the build pipeline at above section is set as source that would publish the artifact.

<br/>

### Release Pipeline - Trigger

The following is the Trigger setting of the release pipeline:

![ReleasePipelineTrigger](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineTrigger.png)

In the trigger setting, we enable that release pipeline would automatically start if there is any new completion coming up from our build pipeline under 'master' branch. 

<br/>

### Release Pipeline - Tasks - Deployment

The following is the task setting of the release pipeline for development:

![ReleasePipelineStage1](https://raw.githubusercontent.com/ZhonglinChen/MSA-2020-Phase1-FrontEndDev-ReactWebApp-Assignment/master/Images/ReleasePipelineStage1.png)

Once this release pipeline start, the task of deployment would begin to deploy the artifact of our React application online with corresponding Azure web service.