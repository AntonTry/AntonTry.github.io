class DbConnection {
    static getConnection() {
        const firebase = require('firebase');
        const config = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
        };
        const app = firebase.initializeApp(config);
        return app.database();
    }
}