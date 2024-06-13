const fs = require("fs");
const { Web3 } = require("web3");

// 连接到本地 RPC 节点
const web3 = new Web3("http://localhost:8563");

async function queryBlockChain() {
  try {
    // get last block number
    const blockNumber = await web3.eth.getBlockNumber();
    // get the chain id of the current provider
    const chainId = await web3.eth.getChainId();
    // get the current gas price
    const gasPrice = await web3.eth.getGasPrice();
    console.log("last block number: " + blockNumber);
    console.log("chain Id: " + chainId);
    console.log("gas price: " + gasPrice);
  } catch (error) {
    console.error("query blockchain error:", error);
  }
}

// 获取当前区块高度
async function getBlockHeight() {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log("当前区块高度:", blockNumber);
    return blockNumber;
  } catch (error) {
    console.error("获取区块高度错误:", error);
  }
}

// 获取本地账户信息
async function getAccounts() {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("本地账户信息:", accounts);
    return accounts;
  } catch (error) {
    console.error("获取账户信息错误:", error);
  }
}

// 获取指定账户地址的余额
async function getBalance(accountAddress) {
  try {
    const balance = await web3.eth.getBalance(accountAddress);
    // console.log(`账户 ${accountAddress} 的余额为:`, web3.utils.fromWei(balance, 'ether'), 'ETH');
    console.log(`账户 ${accountAddress} 的余额为:`, balance);
  } catch (error) {
    console.error("获取余额错误:", error);
  }
}

// 转账函数
async function transferFunds(
  senderAddress,
  receiverAddress,
  amount,
  privateKey
) {
  // 构建交易对象
  const transaction = {
    from: senderAddress,
    to: receiverAddress,
    value: amount,
    gas: 21000, // gas limit
    gasPrice: 100, // gas price
    type: 0,
  };

  try {
    // you might also use below `web3.eth.personal.signMessage`, depending on your use case.
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      privateKey
    );

    const tx = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log("交易哈希:", tx.transactionHash);
  } catch (error) {
    console.error("转账错误:", error);
  }
}

// Function to read keystore file and decrypt with password
async function decryptKeystoreFile(keystoreFilePath, pwdPath) {
  try {
    // Load keystore file content
    const keystoreJson = JSON.parse(fs.readFileSync(keystoreFilePath, "utf8"));
    const pwd = fs.readFileSync(pwdPath).toString().replace(/\n$/, "");
    // Decrypt keystore file
    const account = await web3.eth.accounts.decrypt(keystoreJson, pwd);
    // console.log('Decrypted account:', account);
    return account;
  } catch (error) {
    console.error("Error decrypting keystore file:", error);
  }
}

async function run() {
  // const height = await getBlockHeight();
  await queryBlockChain();
  const accounts = await getAccounts();
  accounts.forEach((account) => {
    getBalance(account);
  });
  const rootPath = "/home/bruce/nodejstestrpc/seven/";
  // for loop rootPath to get password.txt and keystore UTC file
  // for example:
  // node1/password.txt
  // node1/keystore/UTC--2024-06-13T05-33-40.250251172Z--8f6e208fd2f4fbc5ce3d0ab974c1be95832a6f61
  let privateKeys = [];
  for (let i = 1; i <= 7; i++) {
    let pwdPath = rootPath + "node" + i + "/password.txt";
    // get keystore file name which start with UTC
    // UTC--2024-06-03T02-58-44.482850657Z--48167a9376520f8a606a08b79fe166a1dff000d3
    let files = fs.readdirSync(rootPath + "node" + i + "/keystore");
    let utcFile = files.filter((file) => file.startsWith("UTC"))[0];
    let keyStorePath = rootPath + "node" + i + "/keystore/" + utcFile;
    let fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath);
    console.log(fromAccount);
    privateKeys.push(fromAccount.privateKey);
  }
  console.log("privateKeys:", privateKeys);
  // await transferFunds(fromAccount.address, '0x1f013ef87a88b3a77a405efba90c20ab0c2cb91a', 100000000, fromAccount.privateKey)
  // getBalance(fromAccount.address)
  // await new Promise(resolve => setTimeout(resolve, 10 * 1000));
  // getBalance(fromAccount.address)
}

run().catch((error) => {
  console.error("运行错误:", error);
});
