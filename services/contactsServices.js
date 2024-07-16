import path from "node:path";
import Contact from "../db/models/contacts.js";

export const listContacts = async (query = {}) => {
  const { filter, fields, settings } = query;
  const { page, limit } = settings;
  const skip = (page - 1) * limit;
  const data = await Contact.find(filter, fields, { skip, limit });
  const total = await Contact.countDocuments(filter);

  return {
    data,
    total,
  };
};

export const getContactById = (filter) => {
  console.log(filter);
  return Contact.findOne(filter);
};

export const addContact = (data) => Contact.create(data);

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const updateById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);
