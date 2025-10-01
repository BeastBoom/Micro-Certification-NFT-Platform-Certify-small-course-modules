# 🚀 Aptos CertiFi Setup Guide

**Complete step-by-step guide to set up the Micro Certification NFT Platform on Aptos blockchain.**

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js 18+** and **npm/yarn/pnpm**
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### Aptos Development Environment
- **Aptos CLI** - [Installation Guide](https://aptos.dev/tools/aptos-cli/install-cli/)
- **Aptos Wallet** (Petra, Martian, or compatible wallet)

---

## 🛠 Installation Steps

### Step 1: Clone and Setup Project

```bash
# Clone the repository
git clone <your-repository-url>
cd micro-certification-nft-platform

# Install dependencies
npm install

# or if you prefer yarn
yarn install

# or if you prefer pnpm
pnpm install
```

### Step 2: Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your configuration
nano .env  # or use your preferred editor
```

**Configure your `.env` file:**

```env
# Aptos Network Configuration
VITE_APTOS_NETWORK=devnet
VITE_APTOS_NODE_URL=https://fullnode.devnet.aptoslabs.com/v1
VITE_APTOS_FAUCET_URL=https://faucet.devnet.aptoslabs.com

# Smart Contract Configuration (will be updated after deployment)
VITE_MODULE_ADDRESS=0x19004ee0356664f98fe6a8add771a2747a2b38328a70af222faccb3fdfe226ad
VITE_MODULE_NAME=MicroCertification

# Application Configuration
VITE_APP_NAME=Aptos CertiFi
VITE_APP_DESCRIPTION=Micro Certification NFT Platform
VITE_APP_URL=http://localhost:5173
```

### Step 3: Aptos Account Setup

**For Smart Contract Deployment:**

```bash
# Navigate to contracts directory
cd backend/contracts

# Initialize Aptos account for devnet
aptos init --network devnet

# This will create:
# - .aptos/config.yaml (account configuration)
# - A new keypair for your account

# Fund your account with test APT tokens
aptos account fund-with-faucet --account default --network devnet
```

**Verify your account:**

```bash
# Check account balance
aptos account list --query balance --account default

# View account information
aptos account list --account default
```

### Step 4: Smart Contract Deployment

**Compile the Move contract:**

```bash
# Still in backend/contracts directory
aptos move compile

# You should see output like:
# Compiling, may take a little while to download git dependencies...
# BUILDING MicroCertification
# {
#   "Result": [
#     "19004ee0356664f98fe6a8add771a2747a2b38328a70af222faccb3fdfe226ad::MicroCertification"
#   ]
# }
```

**Run tests (optional but recommended):**

```bash
aptos move test

# This will run all tests in the tests/ directory
```

**Deploy to Aptos Devnet:**

```bash
aptos move publish --network devnet

# You'll see prompts like:
# package size 1234 bytes
# Do you want to submit a transaction for a range of [1234 - 1234] Octas at a gas unit price of 100 Octas? [yes/no]
# Type 'yes' and press Enter

# After successful deployment, copy the transaction hash and account address
# Update your .env file with the deployed contract address
```

**Important:** After deployment, update your `.env` file with the actual deployed contract address!

### Step 5: Frontend Development Setup

```bash
# Return to project root
cd ../..

# Verify all dependencies are installed
npm list --depth=0

# Start the development server
npm run dev

# Your application should be available at:
# http://localhost:5173
```

---

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start frontend development server
npm run dev

# The application will be available at http://localhost:5173
# Hot module replacement (HMR) is enabled for instant updates
```

### Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview

# The built files will be in the dist/ directory
```

### Smart Contract Operations

```bash
# Compile Move contracts
npm run move:compile

# Test Move contracts
npm run move:test

# Publish/deploy contracts
npm run move:publish
```

---

## 🔧 Configuration Details

### Aptos Network Configuration

**Devnet (Recommended for Development):**
- Network: `devnet`
- Node URL: `https://fullnode.devnet.aptoslabs.com/v1`
- Faucet URL: `https://faucet.devnet.aptoslabs.com`
- Explorer: `https://explorer.aptoslabs.com/?network=devnet`

**Testnet (Pre-production Testing):**
- Network: `testnet`
- Node URL: `https://fullnode.testnet.aptoslabs.com/v1`
- Faucet URL: `https://faucet.testnet.aptoslabs.com`
- Explorer: `https://explorer.aptoslabs.com/?network=testnet`

**Mainnet (Production):**
- Network: `mainnet`
- Node URL: `https://fullnode.mainnet.aptoslabs.com/v1`
- Explorer: `https://explorer.aptoslabs.com/?network=mainnet`

### Wallet Setup

1. **Install Petra Wallet:**
   - Go to [Petra Wallet](https://petra.app/)
   - Install browser extension
   - Create new wallet or import existing

2. **Switch to Devnet:**
   - Open Petra wallet
   - Click on network selector (top right)
   - Select "Devnet"

3. **Fund Your Wallet:**
   ```bash
   # Using Aptos CLI
   aptos account fund-with-faucet --account <YOUR_WALLET_ADDRESS> --network devnet

   # Or use the web faucet
   # Visit: https://aptoslabs.com/testnet-faucet
   ```

---

## 📁 Project Structure Overview

```
micro-certification-nft-platform/
├── 📂 backend/
│   └── 📂 contracts/
│       ├── 📂 sources/
│       │   └── 📄 MicroCertification.move    # Main smart contract
│       └── 📄 Move.toml                      # Move package configuration
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/                    # React components
│   │   │   ├── 📂 common/                    # Layout, Header, Footer
│   │   │   ├── 📂 certification/             # Certification-specific components
│   │   │   ├── 📂 wallet/                    # Wallet connection components
│   │   │   └── 📂 ui/                        # Reusable UI components
│   │   ├── 📂 pages/                         # Main application pages
│   │   ├── 📂 hooks/                         # Custom React hooks
│   │   ├── 📂 services/                      # API and blockchain services
│   │   ├── 📂 types/                         # TypeScript type definitions
│   │   └── 📂 utils/                         # Utility functions and constants
│   ├── 📄 index.html                         # HTML entry point
│   └── 📄 package.json                       # Frontend dependencies
├── 📄 .env.example                           # Environment variables template
├── 📄 .gitignore                             # Git ignore rules
├── 📄 README.md                              # Project documentation
├── 📄 package.json                           # Main package configuration
├── 📄 tailwind.config.js                     # Tailwind CSS configuration
├── 📄 tsconfig.json                          # TypeScript configuration
└── 📄 vite.config.ts                         # Vite build configuration
```

---

## 🔍 Testing Your Setup

### 1. Verify Smart Contract Deployment

```bash
# Check if contract is deployed
aptos account list --query resources --account <YOUR_DEPLOYED_ADDRESS>

# You should see the MicroCertification module listed
```

### 2. Test Frontend Wallet Connection

1. Open http://localhost:5173
2. Click "Connect Wallet" button
3. Select your wallet (Petra)
4. Approve connection
5. Verify wallet address appears in UI

### 3. Test Contract Interaction

1. Navigate to "Dashboard" page
2. Try initializing issuer profile
3. Create a test certification
4. Verify transaction on Aptos Explorer

---

## 🐛 Troubleshooting

### Common Issues and Solutions

**1. Aptos CLI Installation Issues:**

```bash
# On macOS
brew install aptos

# On Ubuntu/Debian
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3

# Verify installation
aptos --version
```

**2. Move Compilation Errors:**

```bash
# Clear build cache
rm -rf build/

# Recompile
aptos move compile --dev
```

**3. Wallet Connection Issues:**

- Ensure wallet is on the correct network (devnet)
- Clear browser cache and cookies
- Disable other wallet extensions temporarily
- Check console for error messages

**4. Transaction Failures:**

- Verify account has sufficient APT balance
- Check gas fee settings
- Ensure contract address is correct in .env
- Verify network connectivity

**5. Frontend Build Issues:**

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

### Getting Help

- **Aptos Documentation:** https://aptos.dev/
- **Aptos Discord:** https://discord.gg/aptoslabs
- **Move Language Guide:** https://move-language.github.io/move/
- **React Documentation:** https://react.dev/

---

## 🚀 Next Steps

After successful setup:

1. **Explore the Application:**
   - Browse certification programs
   - Create issuer profile
   - Issue test certifications
   - View analytics dashboard

2. **Customize for Your Needs:**
   - Modify smart contract logic
   - Update UI components
   - Add new features
   - Configure branding

3. **Deploy to Production:**
   - Deploy contract to Aptos mainnet
   - Build and deploy frontend
   - Set up monitoring and analytics
   - Configure production environment variables

4. **Community and Marketing:**
   - Set up social media presence
   - Create documentation website
   - Engage with Aptos ecosystem
   - Build partnerships with educational institutions

---

## 📚 Additional Resources

### Development Tools
- **Aptos CLI Reference:** https://aptos.dev/tools/aptos-cli/
- **Move Prover:** https://aptos.dev/tools/move-prover/
- **Aptos TypeScript SDK:** https://github.com/aptos-labs/aptos-ts-sdk

### Aptos Ecosystem
- **Aptos Explorer:** https://explorer.aptoslabs.com/
- **Aptos Bridge:** https://bridge.aptoslabs.com/
- **Aptos Ecosystem Projects:** https://aptosfoundation.org/ecosystem/projects

### Learning Resources
- **Move Tutorial:** https://aptos.dev/tutorials/
- **Aptos Developer Tutorials:** https://aptos.dev/tutorials/
- **Move by Examples:** https://move-language.github.io/move/

---

**🎉 Congratulations!** You now have a fully functional Aptos NFT Certification platform. Start exploring, customizing, and building amazing features!

For questions or support, please check our documentation or reach out to the community.
