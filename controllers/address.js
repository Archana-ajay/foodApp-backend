const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const db = require("../models");
const Address = db.Address;
const User = db.User;
const { validationResult } = require("express-validator");

const postAddress = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((error) => `${error.msg}`)
            .join(",");

        throw new BadRequestError(errorMessages);
    }
    let { address, city, state, country, postalCode } = req.body;
    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const findAddress = await Address.findOne({ where: { userId: userId } });
    if (findAddress) {
        throw new BadRequestError("address already stored");
    }

    var createAddress = await Address.create({
        userId: userId,
        address: address,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
    });

    res.status(StatusCodes.CREATED).json({
        message: "address saved",
        address: createAddress,
    });
};

const getAddress = async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const findUser = await Address.findOne({
        where: { userId: userId },
        include: [{ model: User }],
    });
    console.log(findUser);
    res.status(StatusCodes.OK).json({ Address: findUser });
};

const updateAddress = async (req, res) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((error) => `${error.msg}`)
            .join(",");

        throw new BadRequestError(errorMessages);
    }

    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const addressId = req.params.id;
    const address = await Address.findByPk(addressId);
    if (!address) {
        throw new NotFoundError("Address not found");
    }
    await address.update(req.body);
    res.status(StatusCodes.OK).json({ Address: address });
};

module.exports = {
    postAddress,
    getAddress,
    updateAddress,
};
