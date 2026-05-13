import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function News() {
  const { data: news, isLoading } = trpc.news.list.useQuery({ limit: 20, offset: 0 });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Noticias y Comunicados</h1>
            <p className="mt-2 opacity-90">Mantente informado sobre nuestras actividades</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Cargando noticias...</p>
                </div>
              ) : news && news.length > 0 ? (
                news.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <a>
                      <Card className="h-full overflow-hidden hover:shadow-lg transition cursor-pointer">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-6">
                          <p className="text-xs text-muted-foreground mb-2">
                            {new Date(item.publishedAt || new Date()).toLocaleDateString('es-CO')}
                          </p>
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
                          <div className="mt-4">
                            <Button variant="outline" size="sm">
                              Leer Más
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </a>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No hay noticias disponibles</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
