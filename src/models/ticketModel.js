import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    purchaser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    }
});

export const ticketModel = mongoose.model('Ticket', ticketSchema);