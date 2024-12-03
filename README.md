# MCP Server Dev Prompter

MCP Server implementation for Dev Prompter.

## Log Management

This project includes scripts for managing Claude log files:

- `npm run logs` - Tails and follows the last 20 lines of Claude log files
- `npm run logs:clean` - Deletes all Claude log files

## Development

```bash
# Install dependencies
pnpm install

# Build with source maps for debugging
pnpm run build:debug

# Run tests
pnpm test

# Start the server
pnpm start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
