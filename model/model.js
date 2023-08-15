const conn = require('./connection')
const pluralize = require('pluralize');
class Model{
    constructor(obj = {}){
        this.setObjProp(obj)
    }
    
    setObjProp(obj){
        for (const key in obj) {
           this[key] = obj[key]
                
            }
        }
        static get tableName(){
            return pluralize(this.name.replace(/.[A-Z]/,(v)=> v[0] + '_' + v[1])).toLowerCase()
        }

        async save() {
            try {
                let columns = Object.keys(this)
                let values = Object.values(this)
                let sql = `INSERT into ${this.constructor.tableName} (${columns.join(',')}) VALUES (${'?'.repeat(columns.length).split('').join(', ')})`
                let [result] = await conn.execute(sql,values)
                this.id = result.insertId
                return result.affectedRows > 0
            } catch (error) {
                console.log(error.message + ' ' + error.name);
            }
        }
    }

    module.exports = Model
