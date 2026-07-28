"use client";

import { useState } from "react";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Textarea from "@/components/admin/ui/Textarea";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import ProductCard from "./ProductCard";

import {
  createFeaturedProduct,
  updateFeaturedSection,
  deleteFeaturedProduct,
} from "@/lib/admin/featured-products";

interface Section {
  id: number;

  sectionLabelEn: string;
  sectionLabelAr: string;

  headingEn: string;
  headingAr: string;

  quoteEn: string;
  quoteAr: string;
}

interface Product {
  id: number;

  titleEn: string;
  titleAr: string;

  categoryEn: string;
  categoryAr: string;

  imagePath: string;
  imageUrl: string;

  href: string;

  displayOrder: number;

  isActive: boolean;
}

interface Props {
  section: Section;
  products: Product[];
}

export default function FeaturedProductsForm({
  section,
  products,
}: Props) {
  const [sectionForm, setSectionForm] = useState<Section>(section);
  const [productList, setProductList] = useState<Product[]>(products);
  const [loadingSection, setLoadingSection] = useState(false);
  const [loadingAddProduct, setLoadingAddProduct] = useState(false);

  const handleProductChange = (id: number, updated: Product) => {
    setProductList((prev) =>
      prev.map((item) => (item.id === id ? updated : item))
    );
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteFeaturedProduct(product.id, product.imagePath);

      setProductList((prev) =>
        prev.filter((item) => item.id !== product.id)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleAddProduct = async () => {
    try {
      setLoadingAddProduct(true);
      const newProduct = await createFeaturedProduct();

      const newProductItem: Product = {
        id: newProduct.id,

        titleEn: newProduct.title_en || "New Product",
        titleAr: newProduct.title_ar || "منتج جديد",

        categoryEn: newProduct.category_en || "",
        categoryAr: newProduct.category_ar || "",

        imagePath: newProduct.image || "",

        imageUrl: newProduct.image
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/website-assets/${newProduct.image}?t=${Date.now()}`
          : "",

        href: newProduct.href || "#",

        displayOrder: newProduct.display_order ?? 999,

        isActive: newProduct.is_active ?? true,
      };

      setProductList((prev) =>
        [...prev, newProductItem].sort(
          (a, b) => a.displayOrder - b.displayOrder
        )
      );

      alert("Product created successfully.");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    } finally {
      setLoadingAddProduct(false);
    }
  };

  const handleSaveSection = async () => {
    try {
      setLoadingSection(true);
      await updateFeaturedSection(sectionForm);

      alert("Section updated successfully.");
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Failed to update section.");
    } finally {
      setLoadingSection(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <SectionTitle title="Featured Section" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Section Label EN"
            value={sectionForm.sectionLabelEn}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionLabelEn: e.target.value,
              })
            }
          />

          <Input
            label="Section Label AR"
            value={sectionForm.sectionLabelAr}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionLabelAr: e.target.value,
              })
            }
          />

          <Input
            label="Heading EN"
            value={sectionForm.headingEn}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingEn: e.target.value,
              })
            }
          />

          <Input
            label="Heading AR"
            value={sectionForm.headingAr}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingAr: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-6 space-y-6">
          <Textarea
            label="Quote EN"
            rows={4}
            value={sectionForm.quoteEn}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                quoteEn: e.target.value,
              })
            }
          />

          <Textarea
            label="Quote AR"
            rows={4}
            value={sectionForm.quoteAr}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                quoteAr: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-6">
          <Button onClick={handleSaveSection} disabled={loadingSection}>
            {loadingSection ? "Saving Section..." : "Save Section"}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle title="Featured Products" />

          <Button onClick={handleAddProduct} disabled={loadingAddProduct}>
            {loadingAddProduct ? "Adding..." : "+ Add Product"}
          </Button>
        </div>

        <div className="space-y-8">
          {productList.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No featured products available. Click "+ Add Product" to create one.
            </div>
          ) : (
            productList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onChange={(updated) =>
                  handleProductChange(product.id, updated)
                }
                onDelete={() => handleDelete(product)}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
}