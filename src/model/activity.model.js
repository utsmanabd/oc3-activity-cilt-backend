const cilt = require("../database/cilt.config");

getAll = async () => await cilt.select("*").from("activity")
getById = async (id) => await cilt.select("*").from("mst_activity").where("activity_id", id);
insert = async (data) => await cilt("mst_activity").insert(data);
update = async (id, data) => await cilt("mst_activity").where("activity_id", id).update(data);
deleteData = async (id) => await cilt("mst_activity").where("activity_id", id).del()

getByMachineId = async (id) => await cilt.select(cilt.raw(
    `ac.activity_id, ac.name AS activity, ct.name AS category, ac.standard, ac.periode FROM mst_activity ac LEFT JOIN mst_category ct ON ac.category_id = ct.category_id WHERE ac.m_area_id = ${id} AND ac.is_removed = 0`
))

getByAreaId = async (id) => await cilt.select("*").from("activity").where("area_id", id)

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    getByMachineId,
    getByAreaId
}