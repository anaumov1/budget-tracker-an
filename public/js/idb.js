let db;

const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function (event) {
    // Save ref to database
    const db = event.target.result;

    // created object store to store budget data offline
    db.createObjectStore('update_budget', { autoIncrement: true });
};

// if successful
request.onsuccess = function (event) {
    db = event.target.result;

    // check if application is online or not
    if (navigator.onLine) {
        uploadBudget();
    }
};

request.onerror = function (event) {
    console.log(event.target.errorCode);
};







window.addEventListener('online', uploadBudget);