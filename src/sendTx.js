const fs = require('fs')
const {Web3} = require('web3')

// 连接到本地 RPC 节点
const web3 = new Web3('http://localhost:8562');

async function queryBlockChain() {
    try {

        // get last block number
        const blockNumber = await web3.eth.getBlockNumber();
        // get the chain id of the current provider
        const chainId = await web3.eth.getChainId();
        // get the current gas price
        const gasPrice = await web3.eth.getGasPrice();
        console.log("last block number: " + blockNumber)
        console.log("chain Id: " + chainId)
        console.log("gas price: " + gasPrice)
    } catch (error) {
        console.error('query blockchain error:', error);
    }
}

// 获取当前区块高度
async function getBlockHeight() {
    try {
        const blockNumber = await web3.eth.getBlockNumber();
        console.log('当前区块高度:', blockNumber);
        return blockNumber
    } catch (error) {
        console.error('获取区块高度错误:', error);
    }
}

// 获取本地账户信息
async function getAccounts() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('本地账户信息:', accounts);
        return accounts
    } catch (error) {
        console.error('获取账户信息错误:', error);
    }
}

// 获取指定账户地址的余额
async function getBalance(accountAddress) {
    try {
        const balance = await web3.eth.getBalance(accountAddress);
        // console.log(`账户 ${accountAddress} 的余额为:`, web3.utils.fromWei(balance, 'ether'), 'ETH');
        console.log(`账户 ${accountAddress} 的余额为:`, balance);
    } catch (error) {
        console.error('获取余额错误:', error);
    }
}

// 转账函数
async function transferFunds(senderAddress, receiverAddress, amount, privateKey) {
    // 构建交易对象
    const transaction = {
        from: senderAddress,
        to: receiverAddress,
        value: amount,
        gas: 21000, // gas limit
        gasPrice:100, // gas price
        type: 0,
      };

    try {
        // you might also use below `web3.eth.personal.signMessage`, depending on your use case.
        const signedTransaction = await web3.eth.accounts.signTransaction(
            transaction,
            privateKey,
        );
        
        const tx = await web3.eth.sendSignedTransaction(
            signedTransaction.rawTransaction,
        );
        console.log('交易哈希:', tx.transactionHash);
    } catch (error) {
        console.error('转账错误:', error);
    }
}

// Function to read keystore file and decrypt with password
async function decryptKeystoreFile(keystoreFilePath, pwdPath) {
    try {
        // Load keystore file content
        const keystoreJson = JSON.parse(fs.readFileSync(keystoreFilePath, 'utf8'))
        const pwd = fs.readFileSync(pwdPath).toString().replace(/\n$/, '')
        // Decrypt keystore file
        const account = await web3.eth.accounts.decrypt(keystoreJson, pwd)
        // console.log('Decrypted account:', account);
        return account
    } catch (error) {
        console.error('Error decrypting keystore file:', error);
    }
}

async function run() {
    // const height = await getBlockHeight();
    await queryBlockChain()
    const accounts = await getAccounts();
    accounts.forEach(account => {
        getBalance(account)
    });
    let keyStorePath = '/home/bruce/go-ethereum/privnet/seven/node1/keystore/UTC--2023-12-25T15-29-12.815843682Z--74f4effb0b538baec703346b03b6d9292f53a4cd'
    let pwdPath = '/home/bruce/go-ethereum/privnet/seven/node1/password.txt'
    keyStorePath = '/home/bruce/pr164/go-ethereum/privnet/seven/node1/keystore/UTC--2023-12-25T15-29-12.815843682Z--74f4effb0b538baec703346b03b6d9292f53a4cd'
    pwdPath = '/home/bruce/pr164/go-ethereum/privnet/seven/node1/password.txt'
    let fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath)
    console.log(fromAccount)

    keyStorePath = '/home/bruce/pr164/go-ethereum/privnet/seven/node2/keystore/UTC--2023-12-25T15-29-14.396449621Z--910ad1641b7125eff746accdca1f11148b22f472'
    pwdPath = '/home/bruce/pr164/go-ethereum/privnet/seven/node2/password.txt'
    fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath)
    console.log(fromAccount)

    keyStorePath = '/home/bruce/pr164/go-ethereum/privnet/seven/node3/keystore/UTC--2023-12-25T15-29-15.872313300Z--fef5f250af14df73f983caab7b1f5002189c42e0'
    pwdPath = '/home/bruce/pr164/go-ethereum/privnet/seven/node3/password.txt'
    fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath)
    console.log(fromAccount)

    keyStorePath = '/home/bruce/pr164/go-ethereum/privnet/seven/node4/keystore/UTC--2023-12-25T15-29-17.304499492Z--c51964013acbc6b271feecb0febd9e7a01202930'
    pwdPath = '/home/bruce/pr164/go-ethereum/privnet/seven/node4/password.txt'
    fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath)
    console.log(fromAccount)

    keyStorePath = '/home/bruce/pr164/go-ethereum/privnet/seven/node5/keystore/UTC--2023-12-25T15-29-18.753764616Z--c5bbd9652546bc96be3dec97a38ee335f7873dfa'
    pwdPath = '/home/bruce/pr164/go-ethereum/privnet/seven/node5/password.txt'
    fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath)
    console.log(fromAccount)

    keyStorePath = '/home/bruce/pr164/go-ethereum/privnet/seven/node6/keystore/UTC--2023-12-25T15-29-20.190245088Z--26f1794b81df2b832545b8b6bbca196b82e4feb1'
    pwdPath = '/home/bruce/pr164/go-ethereum/privnet/seven/node6/password.txt'
    fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath)
    console.log(fromAccount)

    keyStorePath = '/home/bruce/pr164/go-ethereum/privnet/seven/node7/keystore/UTC--2023-12-25T15-29-21.665593257Z--0b51369d02e47ee3f143391b837aa08c31aaa19b'
    pwdPath = '/home/bruce/pr164/go-ethereum/privnet/seven/node7/password.txt'
    fromAccount = await decryptKeystoreFile(keyStorePath, pwdPath)
    console.log(fromAccount)
    // await transferFunds(fromAccount.address, '0x1f013ef87a88b3a77a405efba90c20ab0c2cb91a', 100000000, fromAccount.privateKey)
    // getBalance(fromAccount.address)
    // await new Promise(resolve => setTimeout(resolve, 10 * 1000));
    // getBalance(fromAccount.address)
}

run().catch(error => {
    console.error('运行错误:', error);
});