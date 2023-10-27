const model = require('../../model/user.model');
const { encryptPassword } = require('../../services/auth.service');
const api = require('../../tools/common')

getAllUsers = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

getUserByNik = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getByNik(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertUser = async (req, res) => {
    let formData = req.body.form_data
    if (Array.isArray(formData)) {
        for (let data of formData) {
            let hashedPassword = await encryptPassword(data.password)
            data.password = hashedPassword
        }
        let data = await model.insert(formData)
        return api.ok(res, data);
    } else {
        let hashedPassword = await encryptPassword(formData.password)
        formData.password = hashedPassword
        let data = await model.insert(formData);
        return api.ok(res, data);
    }
}

updateUser = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

module.exports = {
    getAllUsers,
    getUserByNik,
    insertUser,
    updateUser
}