#!/usr/bin/env node

/*
 * Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
 * This software is licensed under the MIT License.
 * File: /Users/martinbechard/dev/mcp-perplexity/src/stdio-server.ts
 * This was generated by Claude Sonnet 3.5, with the assistance of my human mentor
 *
 * Entry point for the Perplexity MCP Server using stdio transport
 * Where all the magic begins! ✨
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { DevPrompterServer } from "./DevPrompterServer.js";
import { Logger } from "./Logger.js";

/**
 * Type definition for command line arguments
 */
type ServerArgs = {
  templateDir?: string;
  debug?: boolean;
  help?: boolean;
};

/**
 * Help text displayed with -h or --help
 */
const HELP_TEXT = `
Dev Prompter MCP Server

Usage:
  mcp-server-dev-prompter [options]

Options:
  --debug            Enable debug tracing to log file
  -h, --help         Show this help text

`;

/**
 * Parses command line arguments
 * @param args - Command line arguments
 * @returns Parsed arguments object
 * @throws {Error} If arguments are invalid
 */
function parseArgs(args: string[]): ServerArgs {
  const options: ServerArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "-h":
      case "--help":
        options.help = true;
        break;

      case "--debug":
        console.error("DEBUG parameter is set");
        options.debug = true;
        break;

      case "--templatesDir":
        if (i + 1 < args.length) {
          options.templateDir = args[++i];
        } else {
          throw new Error("--templatesDir requires a value");
        }
        break;

      default:
        throw new Error(
          `Unknown argument: ${arg}, args=${JSON.stringify(args)}`
        );
    }
  }

  return options;
}

/**
 * Main entry point for the Perplexity MCP server
 */
async function runServer(): Promise<void> {
  try {
    // Parse command line arguments
    const options = parseArgs(process.argv.slice(2)); // Skip node and script arguments

    await Logger.initialize(options.debug);

    // Show help if requested
    if (options.help) {
      process.stderr.write(HELP_TEXT + "\n");
      process.exit(0);
    }

    await Logger.trace("SERVER EVENT: Starting server", {});

    // Initialize server
    const server = new DevPrompterServer(options.templateDir, options.debug);
    await server.initialize();

    // Setup stdio transport
    const transport = new StdioServerTransport();
    await server.getServer().connect(transport);

    process.stderr.write("Perplexity MCP Server running on stdio\n");

    if (options.debug) {
      await Logger.trace("SERVER EVENT: Server ready");
    }
  } catch (error) {
    // Initialize logger for error if not already done
    if (!Logger.isInitialized()) {
      await Logger.initialize(true);
    }

    const errorMsg =
      error instanceof Error ? error.stack || error.message : String(error);
    await Logger.error("FATAL ERROR", error);
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

// Check if this is the main module using import.meta
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  runServer().catch(async (error) => {
    // Initialize logger for error if not already done
    if (!Logger.isInitialized()) {
      await Logger.initialize(true);
    }

    const errorMsg =
      error instanceof Error ? error.stack || error.message : String(error);
    await Logger.error("UNHANDLED ERROR", error);
    console.error("Unhandled error:", error);
    process.exit(1);
  });
}

// Export for testing
export { parseArgs, ServerArgs };
