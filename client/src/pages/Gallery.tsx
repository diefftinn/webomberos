import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function Gallery() {
  const { data: items, isLoading } = trpc.gallery.list.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const filteredItems = selectedCategory
    ? items?.filter((item) => item.category === selectedCategory)
    : items;

  const categories = Array.from(
    new Set(items?.map((item) => item.category).filter((c): c is string => !!c))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Galería</h1>
            <p className="mt-2 opacity-90">Imágenes y videos de nuestras actividades</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === undefined ? "default" : "outline"}
                  onClick={() => setSelectedCategory(undefined)}
                >
                  Todos
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category as string)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando galería...</p>
              </div>
            ) : filteredItems && filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="bg-muted p-3 space-y-3">
  {/* FILA HORIZONTAL (3 IMÁGENES) */}
  <div className="grid grid-cols-3 gap-2">
    {[item.imageUrl, item.imageUrl, item.imageUrl].map((img, i) => (
      img ? (
        <img
          key={i}
          src={img}
          alt={`${item.title} ${i + 1}`}
          className="h-32 w-full object-cover rounded"
        />
      ) : null
    ))}
  </div>

  {/* COLUMNA DEBAJO (X IMÁGENES) */}
  <div className="grid grid-cols-2 gap-2">
    {Array.from({ length: 4 }).map((_, i) =>
      item.imageUrl ? (
        <img
          key={i}
          src={item.imageUrl}
          alt={`${item.title} extra ${i + 1}`}
          className="h-28 w-full object-cover rounded"
        />
      ) : null
    )}
  </div>
</div>


                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.category && (
                        <p className="text-xs text-accent font-semibold mt-2">
                          {item.category}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay elementos en la galería</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}