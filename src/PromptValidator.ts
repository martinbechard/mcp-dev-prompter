/*
Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
This software is licensed under the MIT License.
File: /Users/martinbechard/dev/mcp-dev-prompter/src/PromptValidator.ts
*/

import { z } from "zod";
import {
  TemplateMetadata,
  TemplateArgument,
  LoadedTemplate,
  PromptConfig,
} from "./PromptConfig.js";

export class PromptValidator {
  private static readonly argumentSchema = z
    .object({
      name: z.string().min(1),
      description: z.string().min(1, "Argument description cannot be empty"),
      required: z.boolean(),
    })
    .required();

  private static readonly metadataSchema = z
    .object({
      description: z.string().min(1, "Template must have a description"),
      version: z
        .string()
        .regex(/^\d+\.\d+\.\d+$/, "Version must be semantic (e.g., 1.0.0)"),
      arguments: z.array(this.argumentSchema).min(1),
    })
    .required() as z.ZodType<TemplateMetadata>;

  private static readonly templateContentSchema = z
    .string()
    .min(1, "Template must have content");

  private static readonly sectionsSchema = z
    .object({
      description: z.string().min(1, "Template must have a description"),
      template: z.string().min(1, "Template must have content"),
    })
    .required();

  private static readonly loadedTemplateSchema = z
    .object({
      id: z.string().min(1),
      metadata: this.metadataSchema,
      sections: this.sectionsSchema,
      rawContent: z.string().min(1),
    })
    .required() as z.ZodType<LoadedTemplate>;

  private static readonly promptConfigSchema = z
    .object({
      templateId: z.string().min(1),
      arguments: z.record(z.string(), z.unknown()),
    })
    .required()
    .transform(
      (data): PromptConfig => ({
        templateId: data.templateId,
        arguments: data.arguments,
      })
    );

  private static createArgumentsValidator(
    templateMetadata: TemplateMetadata
  ): z.ZodType<Record<string, unknown>> {
    const shape: Record<string, z.ZodType<unknown>> = {};

    templateMetadata.arguments.forEach((arg) => {
      const schema = z.unknown();
      shape[arg.name] = arg.required ? schema : schema.optional();
    });

    return z.object(shape).required();
  }

  static validateMetadata(metadata: unknown): TemplateMetadata {
    return this.metadataSchema.parse(metadata);
  }

  static validateTemplateStructure(templateContent: string) {
    const validatedContent = this.templateContentSchema.parse(templateContent);
    return {
      description: validatedContent,
      template: validatedContent,
    };
  }

  static validateLoadedTemplate(template: unknown): LoadedTemplate {
    return this.loadedTemplateSchema.parse(template);
  }

  static validatePromptConfig(
    config: unknown,
    template: LoadedTemplate
  ): PromptConfig {
    const baseConfig = this.promptConfigSchema.parse(config);
    const argsValidator = this.createArgumentsValidator(template.metadata);
    baseConfig.arguments = argsValidator.parse(baseConfig.arguments);
    return baseConfig;
  }
}
