import { Item } from '../models/Item.js';
import Joi from 'joi';

// TODO: write a validation schema for create/update per README.md section 2.
const createSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().max(2000).allow(''),
  category: Joi.string().valid('electronics', 'clothing', 'documents', 'accessories', 'other'),
  status: Joi.string().valid('lost', 'found', 'claimed'),
  location: Joi.string(),
  reportedBy: Joi.string().hex().length(24)
});

const updateSchema = Joi.object({
  title: Joi.string().min(2).max(200),
  description: Joi.string().max(2000).allow(''),
  category: Joi.string().valid('electronics', 'clothing', 'documents', 'accessories', 'other'),
  status: Joi.string().valid('lost', 'found', 'claimed'),
  location: Joi.string(),
  reportedBy: Joi.string().hex().length(24)
});

// GET /api/items
// TODO: implement per README.md section 3.
export async function getAllItems(req, res, next) {
  try {
   const { status, category } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const items = await Item.find(filter).populate('reportedBy', ['name', 'email']);

    res.json(items);
  } catch (err) { next(err); }
}

// GET /api/items/:id
// TODO: implement per README.md section 3.
export async function getItem(req, res, next) {
  try {
    const item = await Item.findById(req.params.id).populate('reportedBy', ['name' ,'email']);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
    // TODO
  } catch (err) { next(err); }
}

// POST /api/items
// TODO: implement per README.md section 3.
export async function createItem(req, res, next) {
  try {
    // TODO
  const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const item = await Item.create(value);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/items/:id
// TODO: implement per README.md section 3.
export async function updateItem(req, res, next) {
  try {
    // TODO
    const { error, value } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const item = await Item.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) { next(err); }
}

// DELETE /api/items/:id
// TODO: implement per README.md section 3.
export async function deleteItem(req, res, next) {
  try {
    // TODO
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
}

