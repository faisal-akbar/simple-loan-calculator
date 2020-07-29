// Submit button event lister
// document.getElementById('loan-form').addEventListener('submit', calculateResults);
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // hide result
    document.getElementById('results').style.display = 'none';

    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// calculate results
function calculateResults() {
    // console.log('Calculating');

    // UI Vars
    const amount = document.getElementById('amount');
    const downPayment = document.getElementById('down-payment');

    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    // const principalAmount = document.getElementById('principal-amount')
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Calculation formula
    const principal = parseFloat(amount.value);
    // const principal = parseFloat(amount.value) - parseFloat(downPayment.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    let monthly;
    if (calculatedInterest == 0) {
        monthly = (principal / calculatedPayments);
    } else {
        monthly = (principal * x * calculatedInterest) / (x - 1);
    }

    if (isFinite(monthly) && (amount.value >= 0 && interest.value >= 0 && years.value >= 0)) {
        // principalAmount.value = principal;
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
    // e.preventDefault();

}

// Error message
function showError(error) {
    // Show results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // create div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);

}

// clear error function
function clearError() {
    document.querySelector('.alert').remove();
}