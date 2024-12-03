/*
Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
This software is licensed under the MIT License.
File: src/PromptTypes.ts
This was generated by Claude Sonnet 3.5, with the assistance of my human mentor

Type definitions for the prompt system
Safety first: Let TypeScript guide the way!
*/

/**
 * MCP prompt registration metadata
 */
export type PromptRegistration = {
    name: string;
    description: string;
    arguments: PromptArgument[];
};

/**
 * MCP argument definition
 */
export type PromptArgument = {
    name: string;
    description: string;
    required: boolean;
};

/**
 * Template metadata from front matter
 */
export type TemplateMetadata = {
    description: string;
    version: string;
    arguments: Record<string, TemplateArgument>;
};

/**
 * Template argument definition
 */
export type TemplateArgument = {
    description: string;
    required?: boolean;
};

/**
 * Processed template ready for rendering
 */
export type PromptTemplate = {
    id: string;
    metadata: TemplateMetadata;
    content: string;
    arguments: {
        name: string;
        description: string;
        required: boolean;
        usageType: 'direct' | 'conditional';
    }[];
};

/**
 * Incoming prompt request
 */
export type PromptRequest = {
    templateId: string;
    arguments: Record<string, unknown>;
    context?: PromptContext;
};

/**
 * Generated prompt response
 */
export type PromptResponse = {
    content: string;
    template: PromptTemplate;
    appliedArguments: Record<string, unknown>;
};

/**
 * Execution context
 */
export type PromptContext = {
    maxLength?: number;
    options?: {
        trimWhitespace?: boolean;
        lineEndings?: 'lf' | 'crlf';
    };
};

/**
 * Base prompt error
 */
export class PromptError extends Error {
    constructor(
        message: string,
        public readonly templateId: string,
        public readonly details?: unknown
    ) {
        super(`Prompt error for ${templateId}: ${message}`);
    }
}

/**
 * Argument validation error
 */
export class ValidationError extends PromptError {
    constructor(
        templateId: string,
        public readonly argument: string,
        public readonly value: unknown,
        public readonly reason: string
    ) {
        super(
            `Invalid argument "${argument}": ${reason}`,
            templateId,
            { argument, value }
        );
    }
}

/**
 * Template processing error
 */
export class TemplateError extends PromptError {
    constructor(
        templateId: string,
        public readonly phase: 'loading' | 'parsing' | 'rendering',
        public readonly reason: string
    ) {
        super(
            `Template error during ${phase}: ${reason}`,
            templateId
        );
    }
}