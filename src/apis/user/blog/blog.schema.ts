import * as mongoose from 'mongoose';

export interface LooseObject {
    [key: string]: any;
}

export interface TypeBlogObject {
    userId?: string;
    blogId:string;
    postName: string;
    category: string[];
    description: string;
    image:string;
    timestamp?: Date;
}

export interface Blog extends TypeBlogObject, mongoose.Document { }
export const BlogSchema = new mongoose.Schema({
    postName: { type: String, required: true },
    blogId: {type:String, required:false},
    category: { type: [String], required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    timestamp: { type: Date, required: true },
});
