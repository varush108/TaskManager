const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/taskManager.db'
})

const Tasks = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    priority: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'incomplete'
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    due: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

const Notes = db.define('notes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    taskId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})


module.exports = {
    db,
    Tasks,
    Notes
}