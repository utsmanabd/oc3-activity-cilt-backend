const model = require('../../model/task-activity.model')
const api = require('../../tools/common')

getAllTaskActivity = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

getTaskActivityById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getTaskActivityByTaskId = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getByTaskId(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getTaskActivityByTaskIdAndMachineId = async (req, res) => {
    if (!isNaN(req.params.taskid) && !isNaN(req.params.mareaid)) {
        let data = await model.getByMachineAreaIdAndTaskId(req.params.taskid, req.params.mareaid);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getCountTaskActivityById = async (req, res) => {
    if (!isNaN(req.params.taskid) && !isNaN(req.params.mareaid)) {
        let data = await model.getCountTaskActivityById(req.params.taskid, req.params.mareaid);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

const getCountActivityPeriodByDate = async (req, res) => {
    let month = `${req.params.month}`
    let year = `${req.params.year}`
    
    if (!isNaN(+year) && !isNaN(+month)) {
        if (+month < 10) month = `0${req.params.month}`
        let data = await model.getCountActivityPeriodByDate(year, month)
        return api.ok(res, data)
    }

    if (!isNaN(+year) && !req.params.month) {
        let data = await model.getCountActivityPeriodByYear(year)
        return api.ok(res, data)
    }

    return api.error(res, "Bad request", 400)
}

const getCountActivityPeriodByDateRange = async (req, res) => {
    try {
        const fromDate = req.query.from || null
        const toDate = req.query.to || null
        if (fromDate && toDate) {
            let data = await model.getCountActivityPeriodByDateRange(fromDate, toDate)
            return api.ok(res, data)
        } else {
            return api.ok(res, [])
        }
    } catch (err) {
        api.catchError(res, err)
    }
}

insertTaskActivity = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateTaskActivity = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

updateTaskActivityByTaskId = async (req, res) => {
    let data = await model.updateByTaskId(req.params.taskId, req.body.form_data);
    return api.ok(res, data)
}

updateBatchTaskActivity = async (req, res) => {
    let data = req.body.form_data;
    data.forEach(element => {
        model.update(element.id, element.data)
    });
    return api.ok(res, data)
    
}

deleteTaskActivity = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteData(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAllTaskActivity,
    getTaskActivityById,
    getTaskActivityByTaskId,
    getTaskActivityByTaskIdAndMachineId,
    getCountTaskActivityById,
    insertTaskActivity,
    updateTaskActivity,
    updateBatchTaskActivity,
    updateTaskActivityByTaskId,
    deleteTaskActivity,
    getCountActivityPeriodByDate,
    getCountActivityPeriodByDateRange
};