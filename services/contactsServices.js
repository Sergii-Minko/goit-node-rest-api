import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";
import Contact from "../db/models/contacts.js";

const contactsPath = path.join(process.cwd(), "./db/contacts.json");

export const listContacts = () => Contact.find();

export const getContactById = (_id) => Contact.findOne({ _id });

export const addContact = (data) => Contact.create(data);

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const updateById = (filter, data) => Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);
