import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function Info() {
  const { data: history } = trpc.data.institutional.list.useQuery({ section: "history" });
  const { data: organizational } = trpc.data.institutional.list.useQuery({ section: "organizational" });
  const { data: policies } = trpc.data.institutional.list.useQuery({ section: "policies" });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Información Institucional</h1>
            <p className="mt-2 opacity-90">Conoce más sobre nuestro cuerpo de bomberos</p>
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
