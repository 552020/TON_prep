# TON Hello World part II:

Step by step guide for writing your first smart contract

- Step 1: Define our first smart contract
- Step 2: Set up your local machine

We will need node.js. But we already have it from hello world part 1 at least.

- Step 3: Set up the project

1. Create a new directory for the project 'Counter'
2. Cd in it and run `npm create ton@latest`: choose `Counter` as project name, and `An empty contract (FunC)` wenn asked to Choose the project template. We are asked to choose a 'First created contract name (PascalCase)'. I choose, guess what ... `Counter`.

This is what get executed when we run the script: https://github.com/ton-org/create-ton.

3. A new repo got created. Notice that the repo containing the smart contract has been deleted, otherwise we should have add a git module to have the code of the smart contract in this ton_prep repo.

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

### 1. **storage**

The storage section has basically a getter and a setter to read and write data into and from the blockchain, serving as custom getters and setters for managing the contract's state.

```func
(int) load_data() inline {                 ;; read function declaration - returns int as result
  var ds = get_data().begin_parse();       ;; load the storage cell and start parsing as a slice
  return (ds~load_uint(64));               ;; read a 64 bit unsigned int from the slice and return it
}

() save_data(int counter) impure inline {  ;; write function declaration - takes an int as arg
  set_data(begin_cell()                    ;; store the storage cell and create it with a builder
    .store_uint(counter, 64)               ;; write a 64 bit unsigned int to the builder
    .end_cell());                          ;; convert the builder to a cell
}

```

#### load_data and save_data

The `load_data` and `save_data` functions are 'custom' functions that leverage the standard library functions `get_data` and `set_data`. These wrappers handle the storage and retrieval of the counter value in our counter application.

The **load_data** function retrieves the contract's data cell with `get_data()`, converts it to a slice using `begin_parse()`, and reads the stored 64-bit unsigned counter value with `ds~load_uint(64)`. The `~` operator updates `ds` to exclude the read bits, leaving `ds` as the remainder slice. This custom function leverages library functions to manage and convert the contract's persistent storage for the counter application. A _remainder slice_ is the portion of the original slice that remains after a certain number of bits have been read from it. When a slice is parsed using a function like `load_uint`, the specified number of bits are consumed, and the slice is updated to exclude these bits, leaving the rest as the remainder. This allows for efficient sequential reading of data from the slice.

The **save_data** function encodes and stores the new counter value into the contract's persistent storage. It creates a new data cell using `begin_cell()`, stores the 64-bit unsigned counter value with `store_uint(counter, 64)`, and finalizes the cell with `end_cell()`. The resulting cell is then saved to the contract's storage using `set_data()`. This custom function leverages library functions to handle and persistently update the contract's storage for the counter application. In `save_data`, a new data cell is constructed to store the counter value. The `begin_cell()` function initializes a cell builder, and `store_uint(counter, 64)` adds the 64-bit unsigned integer to this cell. The `end_cell()` function finalizes the cell, making it ready to be saved. This process ensures that the updated counter value is correctly encoded and stored in the blockchain's persistent storage.

#### Further notes

- The **return type** is inside parentheses. If a function doens't return anything that we'll have `()`.
- The `inline` **modifieer** indicates that this function should be inlined by the compiler to optimize performance.
- `var ds = get_data().begin_parse();` FunC is a **statically typed** language, ensuring type safety at compile time. Variable types can be inferred using the `var` keyword, so explicit type declarations are not always necessary. Since `get_data().begin_parse();` returns a `slice` data type, the compiler will knows that `ds` is a `slice`. This line could have been written also as`slice ds = get_data().begin_parse();`
- `ds` in this context means `data slice`.
- `return (ds~load_uint(64));`: the `~` symbol in FunC is used for **modifying method calls**, allowing multiple method calls to be combined in a single expression. The `.` symbol in FunC is used for **non-modifying method calls**, enabling method chaining without altering the original object.

### 2. **messages**

In TON we have internal, external and log messages. Internal messages are messages between actors both inside the blockcahin, extermal messages are messages originating from outside, and log messages and messages from the inside of the blockchainto the outside.

A "message" is the main form of communication between actors. In Ethreum we have transaction and messages, and in the BitCoin blockcahin we have only transactions. 3.

### 3. **getters**
