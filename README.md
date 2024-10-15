# TaskLoaderProgress Sample

### This is a frontend sample project integrating the following packages:

-  [`jrd_task_handler`](https://www.npmjs.com/package/jrd_task_handler)
   
-  [`jrd_task_loader_progress`](https://www.npmjs.com/package/jrd_task_loader_progress)

<br/>

**For the Backend sample [click here](https://github.com/junior-ramos-dev/jrd_task_handler_test)**.

---

To use both packages, **`jrd_task_handler`** and **`jrd_task_loader_progress`**, together effectively in a real-world application, we can outline a development scenario that showcases their functionality and how they interact with one another.


### Overview of Each Package

1. **jrd_task_handler** (backend using Express): 
   - This package contains the logic for handling tasks. It likely includes methods for executing, managing, and tracking the progress of various tasks defined by specs. It may have functionalities to execute asynchronous operations, manage task states, and handle errors that arise during task execution.

2. **jrd_task_loader_progress** (frontend using React): 
   - This package is focused on monitoring the progress of those tasks. It handles periodic requests or updates, tracks how far along a task is, and provides feedback to the user on the task execution status. It may also include a user interface component to display the progress visually.

### Use Case Scenario: User Registration

To use **`jrd_task_handler`** and **`jrd_task_loader_progress`** packages in a user registration flow, we can design a workflow that involves several steps: verifying if an email already exists, obtaining an access token from an API, and loading user data from another API. Each of these steps can be executed as tasks, with progress tracked using the loader component.

### Overview of User Registration Flow 

- **Note:** The following description is a brief overview. Refer to the **backend** and **frontend** repositories files for the complete sample implementation. 

  1. **Verify Email**: Check if the user’s email already exists in the system.
  
  2. **Obtain Access Token**: If the email is valid and does not exist, request an access token from an external API.

  3. **Load User Data**: Once the token is obtained, use it to load user data from the API.

### Implementation Steps

1. **Setup Environment**: Install both packages and set up your project environment similar to the given example.

    ```
    npm i jrd_task_handler

    npm i jrd_task_loader_progress
    ```

### Example Code Implementation

#### 1. Define the Task Specifications

First, define your task specifications for those steps in the registration flow.

```typescript
// Assuming you have relevant imports
const tasksSpecsList = [
  {
    taskId: 1,
    taskName: "Verify Email",
    task: async () => {
      // Logic to verify if the email exists
      return await verifyEmailFunction(email); // Example function
    },
    requestArgs: { requestArgsKeys: ["email"] },
  },
  {
    taskId: 2,
    taskName: "Get Access Token",
    task: async () => {
      // Logic to obtain access token from API
      return await getAccessTokenFunction(email); // Example function
    },
  },
  {
    taskId: 3,
    taskName: "Load User Data",
    task: async () => {
      // Logic to load user data using the access token
      return await loadUserDataFunction(accessToken); // Example function
    },
  },
];
```

#### 2. Use `taskHandler` and `TaskLoaderProgress`

You can then implement the registration flow in your component:

```typescript
import React from 'react';
import { TaskLoaderProgress } from './path-to-task-loader-progress'; // Adjust path as necessary

const UserRegistrationComponent = () => {
  const email = "user@example.com"; // The email to register
  const handleReturnData = (data: any) => {
    console.log('Received data:', data);
    // Handle the returned user data here
  };

  return (
    <TaskLoaderProgress
      taskLoader={yourTaskLoaderFunction} // Implement this function to run tasks
      returnData={handleReturnData}
      request={{ email }} // Pass the email in request args
      totalTasks={3} // Total number of tasks to be executed
      fetchInterval={1000} // Interval for fetching task progress
    >
      <div>Registering...</div>
    </TaskLoaderProgress>
  );
};
```

#### Using the `taskLoader` 


```typescript
import { Request, Response } from "express";

import { registerTasksSpecsList } from "@/example/registerTasksSpecsList";
import {
  handleResponse,
  taskHandler,
  taskHandlerWrapper,
} from "jrd_task_handler";

export const registerEndpoint = async (req: Request, res: Response) => {
  const requestArgs: object = req.body;

  const result = await taskHandlerWrapper(
    taskHandler,
    requestArgs,
    registerTasksSpecsList
  );

  console.log("result:", result);

  handleResponse(result, res);
};
```

### Complete Workflow Example

Putting it all together, here’s how your user registration system might work:

1. **Start Registration**: A user submits their email to register.

2. **Verify Email**:
   - The first task checks whether the email already exists in the system.

3. **Obtain Access Token**:
   - If the email is valid and doesn’t exist, the second task retrieves an access token from an external API.

4. **Load User Data**:
   - The final task uses the access token to fetch and load user-specific data from the API.

5. **Progress Tracking**:
   - Use `TaskLoaderProgress` to provide real-time feedback to the user on the registration status, indicating which step is currently processing.

6. **Error Handling**:
   - If any step fails, catch the error, log it, and display an appropriate user-facing message.

---

