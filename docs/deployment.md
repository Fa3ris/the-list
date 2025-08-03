# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages whenever changes are merged to the `master` branch.

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Save the configuration

### 2. Repository Permissions

The workflow requires the following permissions to deploy to GitHub Pages:
- `contents: read` - To read the repository content
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For secure deployment authentication

These permissions are automatically configured in the workflow file.

### 3. Deployment Process

The deployment happens automatically when:
- Code is pushed to the `master` branch
- A pull request is merged to `master`
- The workflow is manually triggered from the Actions tab

#### Manual Deployment

You can also trigger a deployment manually:
1. Go to **Actions** tab in your GitHub repository
2. Select "Deploy VitePress Site" workflow
3. Click "Run workflow" button
4. Choose the branch (typically `master`) and click "Run workflow"

## How It Works

The deployment workflow consists of two jobs:

### Build Job
1. **Checkout**: Downloads the repository code
2. **Setup Node.js**: Installs Node.js v20
3. **Setup pnpm**: Installs pnpm package manager with the exact version specified in `package.json`
4. **Cache**: Caches pnpm dependencies for faster builds
5. **Install**: Installs all project dependencies
6. **Generate**: Runs `pnpm run build` to generate the VitePress content using your scripts
7. **Build**: Runs `pnpm run docs:build` to build the static VitePress site
8. **Upload**: Uploads the built site as an artifact for deployment

### Deploy Job
1. **Deploy**: Deploys the built site to GitHub Pages

## Build Scripts

The deployment uses these npm scripts in sequence:

```json
{
  "build": "tsx scripts/generate-site.ts",    // Generates content from your data
  "docs:build": "vitepress build docs"         // Builds the VitePress static site
}
```

## Output Location

- **Source**: `docs/` directory contains your VitePress markdown files
- **Build Output**: `docs/.vitepress/dist/` contains the built static site
- **Deployment**: The contents of the dist folder are deployed to GitHub Pages

## Troubleshooting

### Build Failures

If the deployment fails:

1. **Check the Actions tab** for detailed error logs
2. **Common issues**:
   - Node.js version compatibility
   - Missing dependencies
   - Build script errors
   - TypeScript compilation errors

### Access Your Site

Once deployed successfully, your site will be available at:
- `https://<username>.github.io/<repository-name>/`
- Or your custom domain if configured

### Local Testing

Before pushing, you can test the build locally:

```bash
# Generate content
pnpm run build

# Build VitePress site
pnpm run docs:build

# Preview the built site
pnpm run docs:preview
```

## Workflow Configuration

The workflow file is located at `.github/workflows/deploy.yml` and includes:

- **Trigger**: Runs on pushes to `master` branch
- **Node Version**: 20 (as specified in package.json engines)
- **Package Manager**: pnpm with exact version from packageManager field
- **Caching**: Intelligent dependency caching for faster builds
- **Security**: Uses official GitHub Actions with proper permissions

## Performance Features

- **Dependency Caching**: pnpm dependencies are cached between runs
- **Concurrent Jobs**: Build and deploy run in sequence but are optimized
- **Artifact Upload**: Efficient transfer of build output to deployment
- **Incremental Builds**: VitePress only rebuilds changed content
