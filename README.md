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

  ![image-20200720142743107](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720142743107.png)

The following is the detail of the build pipeline:

![image-20200720143007574](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720143007574.png)

The following lists explanations for each part:

![image-20200720145042208](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720145042208.png)

In the "trigger" section, the pipeline is set to run only when a commit is pushed to the 'master' branch and 'develop' branch except that only change was made to the 'README.md' file or any '.yml' files started with azure.



![image-20200720162438545](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720162438545.png)

In the variables section, buildDir was set as folder called 'build'.



![image-20200720154617033](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720154617033.png)

In the step of 'Download .env.local', the secure file '.env.local' that stored in the Azure DevOps Pipelines was downloaded to agent machine.



You can manage yourselves secure files in the tag shown below. For more details about how to access secure files stored in AzureDevOps, read https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/download-secure-file?view=azure-devops

![image-20200720155536865](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720155536865.png)



![image-20200720160715010](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720160715010.png)

In the next step, the '.env.local' that stores APIkey would be copied to the root folder of React application. In this step, actually only the copy command line is necessary. 



![image-20200720161841363](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720161841363.png)

Then, we download Node.js in the agent machine.



Then, install and build the React app

![image-20200720162050437](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720162050437.png)



In the last two steps, the build folder would be compressed and published as artifacts.









###### Release Pipeline:

![image-20200720164015232](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720164015232.png)

In the release pipeline, the above build pipeline was set as source that published the artifact.

![image-20200720163659130](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720163659130.png)

Meanwhile, enable the trigger that would automatically start release pipeline if new build pipeline from 'master' branch completed.

![image-20200720163945555](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720163945555.png)



Once release pipeline start, the task of deployment would begin to deploy React app to corresponding Azure web service.

![image-20200720164813787](C:\Users\czl19\AppData\Roaming\Typora\typora-user-images\image-20200720164813787.png)