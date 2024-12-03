---
description: "Generate code for all project components based on their detailed designs"
version: "1.0.0"
arguments:
  projectName:
    description: "User-friendly project name"
    required: true
  projectsParentFolder:
    description: "Parent folder for all projects"
    required: true
  projectFolder:
    description: "Subfolder of projectsParent folder containing all project files "
    required: true
---

We are working on the implementation of code for the {{projectName}} project.
The project is in a folder called {{projectsParentFolder}}/{{projectFolder}}.

Review the project's custom instructions and project knowledge now so you won't forget to use it during our work.
Read the high-level design document in the design subfolder.

List the contents of the src and test subfolders.
IDENTIFY the components from the high-level-design.md that have already been created in the src folder.
LIST the components NOT YET CREATED in the src folder.
SUGGEST the next component to work on from the list of files NOT YET CREATED.

FOR EACH component:
Read the component detailed design
FOR EACH file determine if there is a test design and create the test according to the design, otherwise do not create any tests
Create each code file as per the component detailed design, making sure the code respects the use cases covered in the tests

If there are any test suites not yet created after all components have been created, then create those.
