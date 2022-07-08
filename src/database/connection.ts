import mysql from 'mysql';

//create a class and apply singletone pathern

export class DatabaseConnection {
    private static pool: mysql.Pool;

    constructor() {
       DatabaseConnection.pool = mysql.createPool({
        connectionLimit : 12,
        host            : 'localhost',
        user            : 'golf_db_usr',
        password        : 'x8gago.L7g&F',
        database        : 'golf_dev'
    }) 
    }

    static getPoolInstance() {
        if (!DatabaseConnection.pool) {
            new DatabaseConnection();
        }
        return DatabaseConnection.pool;
    }
};

