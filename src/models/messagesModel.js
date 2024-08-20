import {Schema, model} from 'mongoose';

const nameCollection = 'Message';

const MessageSchema = new Schema({
    user:{type:String, required:[true, 'El nombre del usuario es obligatorio']},
    message:{type:String, required:[true, 'El mensaje es obligatorio']}
});

export const messageModel = model(nameCollection, MessageSchema);