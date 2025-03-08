const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const incomeText = document.getElementById('income-text');
const expenseText = document.getElementById('expense-text');

const localStorageTransactions =JSON.parse(
    localStorage.getItem('transactions')
);

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();

    if(incomeText.value.trim() !== " "){
        const incomeTransaction = {
            id :generateId(),
            text: 'Income',
            amount: +incomeText.value
        }
        console.log("incomeTransaction========",incomeTransaction);
        console.log(incomeTransaction);
        transactions.push(incomeTransaction);
        console.log(incomeText);
        addTransactionDOM(incomeTransaction);
    }
    
    
    if(expenseText.value.trim() !== " "){
        const expenseTransaction ={
            id :generateId(),
            text: 'Expense',
            amount: -expenseText.value
        };
        transactions.push(expenseTransaction);
        addTransactionDOM(expenseTransaction);
    }

        updateValues();
        updateLocalStorage();

        incomeText.value =" ";
        expenseText.value=" ";
        document.getElementById('text').value ='';

}

function generateId(){
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction){
    const sign = transaction.amount <0 ? '-':'+';
    
    const item = document.createElement('li');
    item.classList.add(transaction.amount <0 ? 'minus':'plus');
    item.innerHTML=`
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class = "delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>
    `;
    if(transaction.amount !== 0){
        list.appendChild(item);
    }
    console.log("========item========")
    console.log(list);

}

function updateValues(){
    const amounts = transactions.map(transactions => transactions.amount);

    const total = amounts.reduce((acc , item)=>(acc+=item),0).toFixed(2);

    const income = amounts
    .filter(item => item>0)
    .reduce((acc , item) => (acc+= item), 0)
    .toFixed(2);
    console.log(income);

    balance.innerText =`$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = expenseText.value ? `${expenseText.value}` : "$0.00";
    
}


function removeTransaction(id){
    transactions = transactions.filter(transactions => transactions.id !==id);


    updateLocalStorage();
    init();

}

function updateLocalStorage(){
    console.log("=======transactions==========");
    console.log(transactions);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init(){
    list.innerHTML ='';
    (transactions ? transactions : []).forEach(addTransactionDOM);
    updateValues();

}
 init();

 document.addEventListener('DOMContentLoaded', function(){
    form.addEventListener('submit',function(e){

    
    e.preventDefault();
    console.log('preventDefault called');
    console.log('event', e);
    console.log('form', form);

    addTransaction();
    // form.submit();

    incomeText.value='';
    expenseText.value='';
 } );
});


 form.addEventListener('submit',addTransaction);