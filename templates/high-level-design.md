---
description: "Generate a high-level design document for a project"
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

We are working on the {{projectName}} design and implementation.
The project is in a folder called {{projectsParentFolder}}/{{projectFolder}}

1. PURPOSE

- STATE the core function of the system
- LIST all supported environments
- EXPLAIN key constraints

2. CORE REQUIREMENTS
   ORGANIZE into these MANDATORY categories:

- STORAGE requirements
- ENVIRONMENT support
- PERFORMANCE needs
- OPERATIONAL needs
- POLICY/COMPLIANCE rules

For each requirement:

- START with "MUST" or "SHOULD"
- MAKE it measurable/testable
- CITE any source or justification

3. ARCHITECTURE DECISIONS
   For each major system aspect:

- STATE the chosen approach
- LIST key constraints it addresses
- EXPLAIN why this choice over alternatives

MUST COVER:

- Database technology
- Error handling
- Configuration
- Testing approach

4. COMPONENT ORGANIZATION
   CREATE a table with columns:

- Component NAME
- Primary PURPOSE
- Key FUNCTIONALITY

SHOW how components interact using references

5. DATA MODEL REQUIREMENTS
   For each data entity:

- LIST required attributes
- SPECIFY validation rules
- DEFINE relationships
- STATE indexing needs

6. FEATURE-SPECIFIC REQUIREMENTS
   For each major feature:

- LIST operation requirements
- STATE business rules
- SPECIFY validation needs
- DEFINE management policies

7. TEST REQUIREMENTS
   DEFINE test scenarios that:

- USE Jest-compatible approaches
- COVER all requirements
- INCLUDE error cases
- VERIFY compliance rules

8. MODULE LIST
   CREATE a tree showing:

- Source file organization
- Test suite structure

For each module:

- STATE its purpose
- LIST key test scenarios
- SPECIFY test considerations

9. IMPLEMENTATION SEQUENCE
   CREATE a table with all of the modules to implement
   INDICATE any other modules it uses that should be implemented first
   SORT the table in order of least dependency first
