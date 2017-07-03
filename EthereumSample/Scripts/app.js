var web3Library = require('web3');

function showAccounts() {
    const web3 = new web3Library(new web3Library.providers.HttpProvider("http://localhost:8545"));
    const accounts = web3.eth.accounts;
    const divAccounts = document.createElement("div");
    const hAccounts = document.createElement("h1");
    hAccounts.innerText = "Счета";
    divAccounts.appendChild(hAccounts);
    accounts.forEach(account => {
        const divAccount = document.createElement("div");
        divAccount.innerText = account;
        divAccounts.appendChild(divAccount);
    });
    document.body.appendChild(divAccounts);
}

function demoSendCoinContract(code) {
    const web3 = new web3Library(new web3Library.providers.HttpProvider("http://localhost:8545"));
    const accounts = web3.eth.accounts;
    
    const contract = web3.eth.compile.solidity(code);
    const SendCoinContract = web3.eth.contract(contract.info.abiDefinition);
    const deployedContract = SendCoinContract.new({ from: accounts[0], data: contract.code, gas: 200000 }, function (e, contract) {
        if (!e) {
            if (!contract.address) {
                console.log("Contract transaction hash waiting to be mined");
                console.log("Transaction Hash: " + contract.transactionHash);
            } else {
                console.log(" Contract mined! Адрес: " + contract.address);
                
                const contractInstance = SendCoinContract.at(contract.address);

                const balanceBefore = document.createElement("div");
                const balanceBefore0 = contractInstance.getBalance.call(accounts[0]);
                const balanceBefore1 = contractInstance.getBalance.call(accounts[1]);
                balanceBefore.innerHTML = "Балансы счетов до отправки денег:<BR/>" + accounts[0] + ' = ' + balanceBefore0 + '<BR/>' + accounts[1] + ' = ' + balanceBefore1;
                document.body.appendChild(balanceBefore);
                
                contractInstance.sendCoin(accounts[1], 2000, { from: accounts[0] });

                const balanceAfter = document.createElement("div");
                const balanceAfter0 = contractInstance.getBalance.call(accounts[0]);
                const balanceAfter1 = contractInstance.getBalance.call(accounts[1]);
                balanceAfter.innerHTML = "Балансы счетов после отправки денег:<BR/>" + accounts[0] + ' = ' + balanceAfter0 + '<BR/>' + accounts[1] + ' = ' + balanceAfter1;
                document.body.appendChild(balanceAfter);
            }
        }
    });
}

function demoSellCarContract(code) {
    const web3 = new web3Library(new web3Library.providers.HttpProvider("http://localhost:8545"));
    const accounts = web3.eth.accounts;

    const contract = web3.eth.compile.solidity(code);
    const SellCarContract = web3.eth.contract(contract.info.abiDefinition);
    const deployedContract = SellCarContract.new('Toyota X10', { from: accounts[0], data: contract.code, gas: 470000 }, function (e, contract) {
        if (!e) {
            if (!contract.address) {
                console.log("Contract transaction hash waiting to be mined");
                console.log("Transaction Hash: " + contract.transactionHash);
            } else {
                console.log(" Contract mined! Адрес: " + contract.address);

                const contractInstance = SellCarContract.at(contract.address);
                console.log(contractInstance.getCar());
                contractInstance.sell(2000, { from: accounts[0] });
                console.log(contractInstance.getCar());
                contractInstance.buy({ from: accounts[1] });
                console.log(contractInstance.getCar());
                contractInstance.confirm({ from: accounts[0] });
                console.log(contractInstance.getCar());

                //const balanceBefore1 = contractInstance.getBalance.call(accounts[1]);
                //balanceBefore.innerHTML = "Балансы счетов до отправки денег:<BR/>" + accounts[0] + ' = ' + balanceBefore0 + '<BR/>' + accounts[1] + ' = ' + balanceBefore1;
                //document.body.appendChild(balanceBefore);

                //contractInstance.sendCoin(accounts[1], 10000, { from: accounts[0] });

                //const balanceAfter = document.createElement("div");
                //const balanceAfter0 = contractInstance.getBalance.call(accounts[0]);
                //const balanceAfter1 = contractInstance.getBalance.call(accounts[1]);
                //balanceAfter.innerHTML = "Балансы счетов после отправки денег:<BR/>" + accounts[0] + ' = ' + balanceAfter0 + '<BR/>' + accounts[1] + ' = ' + balanceAfter1;
                //document.body.appendChild(balanceAfter);
            }
        }
    });
}

module.exports = { showAccounts, demoSendCoinContract, demoSellCarContract };