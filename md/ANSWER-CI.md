# Easy

## Exercise 1

**Question:**

**on** is used to define events that trigger a workflow. These events in this case are **push** and **pull_request**, both limited to the `week12/ci` branch.

**runs-on** is a setting in the workflow file. It tells GitHub which operating system to run your job on. So in thes case ubuntu-latest which is a version of linux.

**strategy.matrix**  is a way to run the same job several times. For us, `node-version: [18.x, 20.x, 22.x]` means that it will run the job three times, once with each Node version in the list.

**steps** is a list of tasks a job does, in order, from top to bottom. Two steps used are **uses** and **run**. **uses** runs a ready-made action that someone else wrote. **run** runs a command.

![Start Workflow](../screenshots/start-workflow.png)

![Failed Workflow](../screenshots/failed-workflow.png)

![Failed Build](../screenshots/failed-build.png)

Something did happen for me. Pushing the branch started the workflow because the branch matched the `on` sectoin. The tests did run but the run failed. The node 18 job crashed because a package needs a newer node version. The node 20 job was cancelled because of that failure and the node 22 passed.