import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Users, BookOpen, ImageIcon, Phone, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

import bomberoscolombia from "@/assets/images/bomberoscolombia.jpeg";
import bomberoscolombias from "@/assets/images/bomberoscolombias.png";
import moviles from "@/assets/images/moviles.png";

export default function Home() {
  const { data: news } = trpc.news.list.useQuery({ limit: 3, offset: 0 });
  const { data: services } = trpc.services.list.useQuery();
  const { data: stations } = trpc.stations.list.useQuery();
  const heroImages = [bomberoscolombia, bomberoscolombias, moviles];
const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 1500); // 15 segundos

  return () => clearInterval(interval);
}, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-white py-20 min-h-[60vh]">
  {/* Imagen del carrusel */}
  <img
    src={heroImages[currentImage]}
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay oscuro */}
  <div className="absolute inset-0 bg-black/40" />

  <div className="relative container">
    <div className="max-w-3xl">
      <h1 className="text-5xl font-bold mb-4">
        Benemérito Cuerpo de Bomberos Voluntarios zuldemaida
      </h1>
      <p className="text-xl mb-8 opacity-90">
        Dedicados a servir y proteger a nuestra comunidad con profesionalismo, valentía y compromiso.
      </p>
      <p className="text-xl mb-8 opacity-90">valor abnegacion disiplina</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/services">
          <a>
            <Button size="lg" variant="secondary">Nuestros Servicios</Button>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Contactar
            </Button>
          </a>
        </Link>
      </div>
    </div>
  </div>
</section>


        {/* Emergency Line */}
        <section className="bg-blue-900 text-white py-6">
          <div className="container flex items-center justify-center gap-4">
            <AlertCircle className="w-8 h-8" />
            <div>
              <p className="text-sm font-semibold">LÍNEA DE EMERGENCIA</p>
              <p className="text-3xl font-bold">3104401602</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4 text-center">Nuestros Servicios</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de servicios para proteger y servir a nuestra comunidad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services?.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <a>
                    <Card className="h-full p-6 hover:shadow-lg hover:border-accent transition cursor-pointer">
                      <div className="text-4xl mb-4">{service.icon || "🚒"}</div>
                      <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{service.description}</p>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4 text-center">Últimas Noticias</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Mantente informado sobre nuestras actividades y eventos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {news?.map((item) => (
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
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/news">
                <a>
                  <Button variant="outline">Ver Todas las Noticias</Button>
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center">¿Nuestro Compromiso?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Equipo Profesional</h3>
                <p className="text-muted-foreground">
                  Personal capacitado y comprometido con la excelencia en el servicio.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Compromiso Comunitario</h3>
                <p className="text-muted-foreground">
                  Dedicados a proteger y servir a nuestra comunidad sin descanso.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Capacitación Continua</h3>
                <p className="text-muted-foreground">
                  Formación constante en técnicas y procedimientos de emergencia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">¿Quieres Ser Voluntario?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Únete a nuestro equipo y sé parte de una noble causa. Necesitamos personas comprometidas como tú.
            </p>
            <Link href="/volunteers">
              <a>
                <Button size="lg" variant="secondary">Solicitar Voluntariado</Button>
              </a>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
