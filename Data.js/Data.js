var Data = {
    /*
     *   Data.js
     *   author: https://github.com/SFantasy
     *   
     */
    init: function() {
        // 
    },
    setLocalStorage: function(key, value) {
        localStorage.key = JSON.stringify(value);
    },
    getLocalStorage: function(key) {
        return JSON.parse(localStorage.key);
    }
};

window.Data = Data;