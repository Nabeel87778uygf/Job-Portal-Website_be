import User from "../models/user.model.js";

export const findUserByEmail = (email) => {
    return User.findOne({ email }).select("+password");
};

export const createUser = (data) => {
    return User.create(data);
};