import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function Services() {
  const { data: services, isLoading } = trpc.services.list.useQuery();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Nuestros Servicios</h1>
            <p className="mt-2 opacity-90">Servicios integrales para la protección de la comunidad</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando servicios...</p>
              </div>
            ) : services && services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <Link key={service.id} href={`/services/${service.id}`}>
                    <a>
                      <Card className="p-8 hover:shadow-lg transition cursor-pointer">
                        <div className="text-5xl mb-4">{service.icon || "🚒"}</div>
                        <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        <Button variant="outline">Más Información</Button>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay servicios disponibles</p>
              </div>
            )}
          </div>
        </section>

        {/* Request Service Section */}
        <section className="py-12 bg-muted">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">¿Necesitas Solicitar un Servicio?</h2>
              <p className="text-muted-foreground mb-6">
                Contáctanos para solicitar inspecciones técnicas, servicios especiales o más información.
              </p>
              <Link href="/contact">
                <a className="inline-block">
                  <Button size="lg">Contactar Ahora</Button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
