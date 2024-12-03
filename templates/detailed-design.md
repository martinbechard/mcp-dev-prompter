---
description: "Generate detailed design documents for all components of a project"
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

We are working on the detailed designs of the {{projectName}} project.
The project is in a folder called {{projectsParentFolder}}/{{projectFolder}}. The detailed designs must be saved in the design subfolder.

Review the project's custom instructions and project knowledge now so you won't forget to use it during our work.
DO NOT use typescript in the design document, USE pseudo-code and FOLLOW pseudo-code rules found in the Project Knowledge.

PROMPT GOAL: Create Detailed Design and typescript artifacts
LIST the files in the design folder.
Read the high-level-design.md document in the design subfolder.
Read the diagrams file to understand other design details.

List the contents of the design subfolder.
IDENTIFY the files from the high-level-design.md that have already been created in the design folder.
LIST the files NOT YET CREATED in the design folder.
SUGGEST the next file to work on from the list of files NOT YET CREATED.
WAIT for approval before continuing.

FOR the selected file in the high-level-design NOT YET CREATED in the design folder, WRITE a markdown design document to the design folder, containing the following information:

- Usual markdown document header (all markdown files should be put in the design folder of the project)
- NO typescript code or examples, use Pseudo-code for all algorithms and sample code
- APPLY pseudo-code rules
- PROCEDURE for code file:

  - CREATE a table of contents which is a list of all the items for this file
  - FOR EVERY SINGLE Item in this file provide the following THOROUGHLY and COMPLETELY no matter how trivial the type or function may seem:
    - CREATE an artifact fragment just for this section
    - CREATE a 1-line explanation of what this represents (if a type, interface or class), or what action it performs (if a function)
    - CREATE a Design Requirements section and list all those that apply from requirements, architecture or other design directives
    - CREATE a Design Consideration section and list all those that you are thinking of
    - List the main attributes and main functions
    - Give some pseudocode for the non-trivial functions if any
    - AFTER EACH Type, Class, Interface or Function, wait for approval

  CREATE a section specifying the code files to create.
  IF a design calls for the creation of a single class, then there should just be one code file create. If the design calls for the creation of more than one class, then specify a folder for that design, put each class in a separate typescript class, create an index file to expose the correct types.
