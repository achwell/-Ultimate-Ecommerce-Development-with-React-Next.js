import {NextResponse} from "next/server";
import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";
import Category from "@/models/category";

export async function GET() {
    await dbConnect();
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 });
        return NextResponse.json(categories);
    } catch (err) {
        return NextResponse.json(err.message, { status: 500 });
    }
}
export async function POST(req) {
    await dbConnect();
    const { name } = await req.json();
    try {
        const category = await Category.create({ name, slug: slugify(name) });
        return NextResponse.json(category, {status: 201});
    } catch (e) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}
