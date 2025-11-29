import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { SplineProductShowcase } from "@/components/3d/spline-product-showcase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { PRODUCT_CATEGORIES } from "@/lib/types"
import type { Product } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select("*, seller:profiles(*)")
    .eq("status", "available")
    .order("created_at", { ascending: false })

  if (params.category) {
    query = query.eq("category", params.category)
  }

  if (params.search) {
    query = query.ilike("title", `%${params.search}%`)
  }

  const { data: products } = await query

  // Use mock data if no products are found in the database
  const displayProducts = products && products.length > 0 ? products : mockProducts

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Products</h1>
              <p className="text-muted-foreground mt-1">Buy and sell campus essentials</p>
            </div>
            <Link href="/products/create">
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                <Plus className="h-4 w-4 mr-2" />
                Sell Product
              </Button>
            </Link>
          </div>

          {/* 3D Product Showcase - Optional Feature */}
          {/* Uncomment to display an interactive 3D product preview */}
          {/* <div className="mb-12">
            <SplineProductShowcase 
              title="Featured 3D Product Preview"
              description="Experience our products in interactive 3D"
            />
          </div> */}

          {/* Search and Filters */}
          <div className="mb-8">
            <form className="flex gap-3 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input name="search" placeholder="Search products..." defaultValue={params.search} className="pl-10" />
              </div>
              <Button type="submit" variant="outline">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap gap-2">
              <Link href="/products">
                <Badge
                  variant={!params.category ? "default" : "outline"}
                  className={`cursor-pointer ${!params.category ? "bg-foreground text-background" : ""}`}
                >
                  All
                </Badge>
              </Link>
              {PRODUCT_CATEGORIES.map((category) => (
                <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
                  <Badge
                    variant={params.category === category ? "default" : "outline"}
                    className={`cursor-pointer ${params.category === category ? "bg-foreground text-background" : ""}`}
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {displayProducts && displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                {params.search || params.category
                  ? "Try adjusting your search or filters"
                  : "Be the first to list a product!"}
              </p>
              <Link href="/products/create">
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  <Plus className="h-4 w-4 mr-2" />
                  List a Product
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
