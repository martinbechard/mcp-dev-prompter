/*
Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
This software is licensed under the MIT License.
File: /Users/martinbechard/dev/mcp-dev-prompter/scripts/validate-templates.ts
*/

import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';
import Handlebars from 'handlebars';
import { PromptValidator } from '../src/PromptValidator';

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

class ValidationError extends Error {
  constructor(
    message: string, 
    public readonly filePath: string, 
    public readonly lineNumber?: number
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

async function validateTemplate(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  const frontmatterEndLine = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  
  if (frontmatterEndLine === -1) {
    throw new ValidationError('Missing YAML frontmatter', filePath, 1);
  }

  try {
    const { data: metadata, content: templateContent } = matter(content);
    
    try {
      PromptValidator.validateMetadata(metadata);
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError(
          `Metadata validation failed: ${error.message}`,
          filePath,
          error.message.includes('arguments') ? 3 : undefined // Typical position of arguments
        );
      }
      throw error;
    }

    try {
      const sections = PromptValidator.validateTemplateStructure(templateContent);
      
      try {
        Handlebars.precompile(sections.template);
      } catch (error) {
        if (error instanceof Error) {
          // Find line number in template section
          const templateStartLine = lines.findIndex(line => 
            line.trim().startsWith('```handlebars')
          );
          throw new ValidationError(
            `Invalid Handlebars syntax: ${error.message}`,
            filePath,
            templateStartLine !== -1 ? templateStartLine + 1 : undefined
          );
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError(
          `Template structure validation failed: ${error.message}`,
          filePath,
          frontmatterEndLine + 1
        );
      }
      throw error;
    }

  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new ValidationError(`Frontmatter parsing failed: ${error.message}`, filePath, 1);
    }
    throw error;
  }
}

async function validateAllTemplates() {
  try {
    const files = await fs.readdir(TEMPLATES_DIR);
    const templateFiles = files.filter(f => f.endsWith('.md'));
    const errors: ValidationError[] = [];
    
    for (const file of templateFiles) {
      const filePath = path.join(TEMPLATES_DIR, file);
      try {
        await validateTemplate(filePath);
        console.log(`✓ ${file}`);
      } catch (error) {
        if (error instanceof ValidationError) {
          errors.push(error);
        } else if (error instanceof Error) {
          errors.push(new ValidationError(error.message, filePath));
        }
      }
    }

    if (errors.length > 0) {
      console.error('\nTemplate validation failed:');
      errors.forEach(error => {
        console.error(`\n${error.filePath}${error.lineNumber ? `:${error.lineNumber}` : ''}`);
        console.error(`  ${error.message}`);
      });
      process.exit(1);
    }

    console.log(`\nValidated ${templateFiles.length} templates successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to read templates directory:', error);
    process.exit(1);
  }
}

validateAllTemplates();