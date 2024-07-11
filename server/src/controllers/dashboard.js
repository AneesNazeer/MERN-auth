import Item from "../models/Dashboard.js";
import { itemSchema } from "../validation/dashboard.js";

export const createItem = async (req, res) => {
  try {
    const { error } = itemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    let { pageNo, pageSize, searchTerm, sortBy = "_id" } = req.query;

    pageNo = parseInt(pageNo) || 1;
    pageSize = parseInt(pageSize) || 10;

    const query = {};
    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }

    const skip = (pageNo - 1) * pageSize;
    const limit = pageSize;

    const data = await Item.find(query)
      .sort({ [sortBy]: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Item.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      data,
      pageNo,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
