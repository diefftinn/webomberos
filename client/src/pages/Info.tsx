import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import mona from "@/assets/images/mona.png";
import extintores from "@/assets/images/extintores.png";
import curso from "@/assets/images/curso.png";
import gonolea from "@/assets/images/gonolea.png";

export default function Info() {
  const { data: history } = trpc.data.institutional.list.useQuery({ section: "history" });
  const { data: organizational } = trpc.data.institutional.list.useQuery({ section: "organizational" });
  const { data: policies } = trpc.data.institutional.list.useQuery({ section: "policies" });
  const institutionalCards = [
  {
    title: "¿Quiénes Somos?",
    content: `El Cuerpo de Bomberos Voluntarios de Armenia, Quindío, es una entidad encargada de la gestión del riesgo, prevención y atención de incendios, rescates y calamidades. Recibe apoyo del Gobierno del Quindío para el fortalecimiento de sus instalaciones físicas.`
  },
  {
    title: "Misión",
    content: `Prevención, extinción de incendios, rescate y salvamento de personas y bienes, trabajando con profesionalismo, valentía y compromiso social.`
  },
  {
    title: "Reconocimiento Institucional",
    content: `El Gobierno del Quindío ha realizado inversiones para el reforzamiento de las instalaciones físicas del cuerpo de bomberos, fortaleciendo su capacidad operativa.`
  },
  {
    title: "Contexto y Emergencias",
    content: `En Colombia, los cuerpos de bomberos voluntarios son parte fundamental del Sistema Nacional de Atención de Desastres. Para emergencias, se recomienda contactar las líneas locales.`
  }
];
const backgroundImages = [mona, extintores, curso, gonolea];

const [bgIndex, setBgIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setBgIndex((prev) => (prev + 1) % backgroundImages.length);
  }, 10000); // 10 segundos

  return () => clearInterval(interval);
}, []);



/* const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % institutionalCards.length);
  }, 10000); // 10 segundos

  return () => clearInterval(interval);
}, []);
 */

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden py-24">
  {/* SLIDER DE FONDO */}
  <div
    className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
    style={{
      width: `${backgroundImages.length * 100}%`,
      transform: `translateX(-${bgIndex * (100 / backgroundImages.length)}%)`,
    }}
  >
    {backgroundImages.map((img, i) => (
      <div
        key={i}
        className="w-full h-full bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${img})` }}
      />
    ))}
  </div>

  {/* OVERLAY OSCURO */}
  <div className="absolute inset-0 bg-black/60" />

  {/* CONTENIDO (TARJETAS) */}
  <div className="relative z-10 container">
    <h2 className="text-4xl font-bold text-white mb-12 text-center">
      Información Institucional
    </h2>

    <div className="flex justify-center">
      <div className="grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {institutionalCards.map((card, i) => (
          <Card
            key={i}
            className="p-6 bg-white/90 backdrop-blur-md shadow-lg"
          >
            <h3 className="text-xl font-bold mb-3 text-accent text-center">
              {card.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-center">
              {card.content}
            </p>
          </Card>
        ))}
      </div>
    </div>
  </div>
</section>

    


        <section className="py-12">
          <div className="container">
            {/* History Section */}
            {history && history.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Historia</h2>
                <div className="space-y-6">
                  {history.map((item) => (
                    <Card key={item.id} className="p-6">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">{item.content}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Organizational Section */}
            {organizational && organizational.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Estructura Organizacional</h2>
                <div className="space-y-6">
                  {organizational.map((item) => (
                    <Card key={item.id} className="p-6">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">{item.content}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Policies Section */}
            {policies && policies.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Políticas de Calidad</h2>
                <div className="space-y-6">
                  {policies.map((item) => (
                    <Card key={item.id} className="p-6">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">{item.content}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {!history && !organizational && !policies && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay información disponible</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
