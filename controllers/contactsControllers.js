import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

import parsePaginationParams from "../helpers/parsePaginationParams.js";

export const getAllContacts = async (req, res, next) => {
  try {
    console.log(req.query);
    const { page, limit, favorite } = parsePaginationParams(req.query);
    const settings = { page, limit };
    const { _id: owner } = req.user;
    let filter = {};
    if (favorite !== "") {
      filter = { owner, favorite };
    } else {
      filter = { owner };
    }
    console.log(filter);
    const data = await contactsService.listContacts({ filter, settings });
    res.json({
      status: 200,
      message: "Contacts get successfully",
      ...data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.getContactById({ _id, owner });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.removeContact({ _id, owner });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.updateById({ _id, owner }, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavoriteContact = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.updateStatusContact(
      { _id, owner },
      req.body
    );
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
  updateFavoriteContact,
};
