import User from '../models/usersModel.js';

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const getUserById = async (id) => {
    return await User.findById(id);
};
