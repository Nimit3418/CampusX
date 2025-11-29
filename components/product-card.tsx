import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

const conditionLabels = {
  new: "New",
  like_new: "Like New",
  good: "Good",
  fair: "Fair",
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative bg-card/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-foreground/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1">
        {/* Glassmorphism gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="aspect-square bg-gradient-to-br from-secondary/50 to-secondary/20 relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20">
              <div className="text-6xl opacity-20">📦</div>
            </div>
          )}
          {product.status !== "available" && (
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="secondary" className="text-sm backdrop-blur-md bg-white/20 border-white/30">
                {product.status === "reserved" ? "Reserved" : "Sold"}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-5 relative">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-foreground/90 transition-colors">
              {product.title}
            </h3>
            <Badge
              variant="outline"
              className="shrink-0 text-xs backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10 transition-colors"
            >
              {conditionLabels[product.condition]}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground/90 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground/80 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
