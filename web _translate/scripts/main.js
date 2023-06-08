function generateSiblingInputs() {
    const numSiblings = document.getElementById('num-siblings').value;
    const siblingsContainer = document.getElementById('siblings-container');
    siblingsContainer.innerHTML = '';

    for (let i = 1; i <= numSiblings; i++) {
        const siblingDiv = document.createElement('div');
        siblingDiv.className = 'sibling';
        siblingDiv.innerHTML = `
            <h3>Sibling ${i}</h3>
            <label>Is Single:</label>
            <input type="checkbox" class="is-single" checked>
            <label>Monthly Salary:</label>
            <input type="number" class="monthly-salary" step="0.01">
            <label>Monthly Expenses:</label>
            <input type="number" class="monthly-expenses" step="0.01">
            <label>Budget Allocation Factor:</label>
            <input type="number" class="budget-allocation" step="0.01">
            <label>Number of Dependents:</label>
            <input type="number" class="num-dependents" disabled>
        `;
        siblingsContainer.appendChild(siblingDiv);
    }
    
    document.getElementById('calculate-button').style.display = 'block';
}

function calculateShares() {
    const totalAmount = parseFloat(document.getElementById('total-amount').value);
    const siblings = document.getElementsByClassName('sibling');
    let siblingShares = [];

    for (let sibling of siblings) {
        const isSingle = sibling.getElementsByClassName('is-single')[0].checked;
        const monthlySalary = parseFloat(sibling.getElementsByClassName('monthly-salary')[0].value);
        const monthlyExpenses = parseFloat(sibling.getElementsByClassName('monthly-expenses')[0].value);
        const budgetAllocation = parseFloat(sibling.getElementsByClassName('budget-allocation')[0].value);

        let disposableIncome;
        
        if (isSingle) {
            disposableIncome = monthlySalary - monthlyExpenses;
        } else {
            const numDependents = parseFloat(sibling.getElementsByClassName('num-dependents')[0].value);
            disposableIncome = (monthlySalary - monthlyExpenses) / (1 + numDependents);
        }

        const share = disposableIncome * budgetAllocation;
        siblingShares.push(share);
    }

    const sumOfShares = siblingShares.reduce((sum, share) => sum + share, 0);
    const normalizedShares = siblingShares.map(share => share * totalAmount / sumOfShares);

    let resultHTML = '<h2>Result:</h2>';
    normalizedShares.forEach((share, index) => {
        resultHTML += `<p>Share for sibling ${index + 1}: ${share.toFixed(2)}</p>`;
    });
    
    document.getElementById('result').innerHTML = resultHTML;

    const totalSumOfShares = normalizedShares.reduce((sum, share) => sum + share, 0);
    document.getElementById('total').innerHTML = `Total sum of shares: ${totalSumOfShares.toFixed(2)}`;
}

document.getElementById('siblings-container').addEventListener('change', (e) => {
    if (e.target.className === 'is-single') {
        const numDependentsInput = e.target.parentElement.getElementsByClassName('num-dependents')[0];
        numDependentsInput.disabled = e.target.checked;
    }
});
