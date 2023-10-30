"use client";
import { useEffect } from "react";
import { useCategory } from "@/context/category";

export default function CategoryList() {
  const { fetchCategories, categories, setUpdatingCategory } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="my-5">
      {categories?.map((c) => (
        <span key={c.name}><button className="btn" onClick={() => setUpdatingCategory(c)}>
          {c.name}
        </button></span>
      ))}
    </div>
  );
}
