const cilt = require("../database/cilt.config")

getAll = async () => await cilt.select('role_id', 'user_id', 'area_id', 'nik', 'name', 'photo', 'role_name', 'role_detail', 'level', 'area').from('users')
getByNik = async (nik) => await cilt.select('role_id', 'nik', 'user_id', 'area_id', 'name', 'photo', 'role_name', 'role_detail', 'level', 'area').from('users').where('nik', nik)
insert = async (data) => await cilt('mst_user').insert(data)
update = async (nik, data) => await cilt('mst_user').where('nik', nik).update(data)

module.exports = {
    getAll,
    getByNik,
    insert,
    update
}