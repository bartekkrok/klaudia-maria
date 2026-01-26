# VSCode / Cursor Configuration

## Required Extensions

Install the following extension for the best development experience:

### 1. Biome (Required)
```
ext install biomejs.biome
```
Or install from: https://marketplace.visualstudio.com/items?itemName=biomejs.biome

### 2. Tailwind CSS IntelliSense (Recommended)
```
ext install bradlc.vscode-tailwindcss
```

## Setup

1. **Install Biome Extension**
   - Open Cursor/VSCode
   - Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
   - Search for "Biome"
   - Install the official Biome extension

2. **Reload Window**
   - Press Cmd+Shift+P / Ctrl+Shift+P
   - Type "Reload Window"
   - Press Enter

3. **Verify Configuration**
   - Open any `.ts` or `.tsx` file
   - Check bottom right - should show "Biome" as formatter
   - Save file (Cmd+S / Ctrl+S) - should auto-format

## Features Enabled

✅ **Format on Save**: Files auto-format when you save
✅ **Auto Organize Imports**: Imports sorted automatically
✅ **Quick Fixes**: Biome suggestions appear as you type
✅ **Linting**: Real-time error and warning detection

## Commands

### Format Current File
```
Cmd+Shift+P / Ctrl+Shift+P → "Format Document"
```

### Organize Imports
```
Cmd+Shift+P / Ctrl+Shift+P → "Organize Imports"
```

### Show Problems
```
Cmd+Shift+M / Ctrl+Shift+M
```

## Troubleshooting

### Biome Not Working?

1. **Check Extension is Installed**
   - Go to Extensions
   - Search "Biome"
   - Should show "Installed"

2. **Check Biome is Set as Default Formatter**
   - Open Settings (Cmd+, / Ctrl+,)
   - Search "default formatter"
   - Should be "biomejs.biome"

3. **Reload Window**
   - Cmd+Shift+P / Ctrl+Shift+P
   - Type "Reload Window"

4. **Check Output**
   - Open Output panel (Cmd+Shift+U / Ctrl+Shift+U)
   - Select "Biome" from dropdown
   - Check for errors

### Format on Save Not Working?

1. Check settings.json has:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome"
}
```

2. Make sure file type is supported:
   - `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.jsonc`

### Conflicting with Prettier/ESLint?

Disable them in settings:
```json
{
  "prettier.enable": false,
  "eslint.enable": false
}
```

## NPM Scripts

You can also run Biome from command line:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run format

# Build (includes type checking)
npm run build
```

## More Info

- [Biome Documentation](https://biomejs.dev/)
- [Biome VSCode Extension](https://biomejs.dev/reference/vscode/)
- [Project biome.json](../biome.json)
- [Project .cursorrules](../.cursorrules)
