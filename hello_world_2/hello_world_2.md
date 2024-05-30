# TON Hello World part II:

Step by step guide for writing your first smart contract

- Step 1: Define our first smart contract
- Step 2: Set up your local machine

We will need node.js. But we already have it from hello world part 1 at least.

- Step 3: Set up the project

1. Create a new directory for the project 'Counter'
2. Cd in it and run `npm create ton@latest`: choose `Counter` as project name, and `An empty contract (FunC)` wenn asked to Choose the project template. We are asked to choose a 'First created contract name (PascalCase)'. I choose, guess what ... `Counter`.

This is what get executed when we run the script: https://github.com/ton-org/create-ton.

3. A new repo got created:

- **CLI Output**

```bash
   | __ )| |  | | | | ____|  _ \|  _ \|_ _| \ | |_   _|
    |  _ \| |  | | | |  _| | |_) | |_) || ||  \| | | |
    | |_) | |__| |_| | |___|  __/|  _ < | || |\  | | |
    |____/|_____\___/|_____|_|   |_| \_\___|_| \_| |_|
                     TON development for professionals

Your new project is ready, available commands:

 >  cd Counter
 change directory to your new project

 >  npx blueprint build
 choose a smart contract and build it

 >  npx blueprint test
 run the default project test suite

 >  npx blueprint run
 choose a script and run it (eg. a deploy script)

 >  npx blueprint create AnotherContract
 create all the necessary files for another new contract

For help and docs visit https://github.com/ton-community/blueprint
```

- **File structure**

Counter/
├── contracts/
│ ├── imports/
│ │ ├── stdlib.fc
│ │ └── counter.fc
├── node_modules/
├── scripts/
│ └── deployCounter.ts
├── tests/
│ └── Counter.spec.ts
├── wrappers/
│ ├── Counter.compile.ts
│ └── Counter.ts
├── .gitignore
├── .prettierignore
├── .prettierrc
├── jest.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

## Explanation of the structure:

- **contracts/**: Contains the smart contracts.

  - **imports/**: Contains imported files for the smart contracts.
    - **stdlib.fc**: A standard library file.
    - **counter.fc**: The main smart contract file.

- **node_modules/**: Contains all the npm dependencies.

- **scripts/**: Contains deployment scripts.

  - **deployCounter.ts**: Script to deploy the counter contract.

- **tests/**: Contains test files.

  - **Counter.spec.ts**: Test specification file for the counter contract.

- **wrappers/**: Contains wrapper files for interacting with the contracts.

  - **Counter.compile.ts**: Script to compile the counter contract.
  - **Counter.ts**: Wrapper for the counter contract.

- **.gitignore**: -
- **.prettierignore**: Prettier ignore file to specify files and directories to ignore formatting.
- **.prettierrc**: Configuration file for Prettier.
- **jest.config.ts**: Configuration file for Jest, a JavaScript testing framework.
- **package-lock.json**: Automatically generated file for tracking project dependencies.
- **package.json**: Configuration file for npm, including project metadata and dependencies.
- **README.md**: -
- **tsconfig.json**: Configuration file for TypeScript compiler options.

- Step 4: Structuring our smart contract

We are going to write the code for our smart contract in `./Counter/contracts/counter.fc`.

> Much like everything else in life, smart contracts in FunC are divided into 3 sections. These sections are: storage, messages and getters.

Storage, message and getters are just euristic principle, like to write clean and structured code. When they say 'smart contract in FuncC are divided into 3 sections ...', they mean that the structure of the code you are going to write in the `contract_name.fc` in the `contracts` folder of your `Contract_name` dir, should have these three sections.

1. **storage**
2. **messages**
3. **getters**
