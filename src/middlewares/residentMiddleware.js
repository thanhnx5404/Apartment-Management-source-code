import { residentSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";
import checkObject from "../utils/checkObject.js"

export async function doesResidentExist(req, res, next) {
    const { id } = req.params

    if (!(await checkObject("nhan_khau", "id_nhan_khau", id))) {
        req.flash('error', 'Resident not found')
        return res.redirect(303, '/residents')
    }
    next();
}

export async function validateResident(req, res, next) {
    const { error } = residentSchema.validate(req.body.resident)
    console.log("validating resident")
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg)
        return res.redirect(303, '/residents')
    } else {
        next()
    }
}
