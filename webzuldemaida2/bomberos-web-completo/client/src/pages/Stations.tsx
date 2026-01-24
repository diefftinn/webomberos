import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function Stations() {
  const { data: stations, isLoading } = trpc.stations.list.useQuery();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Nuestras Estaciones</h1>
            <p className="mt-2 opacity-90">Directorio de estaciones de bomberos</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando estaciones...</p>
              </div>
            ) : stations && stations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stations.map((station) => (
                  <Card key={station.id} className="p-6 hover:shadow-lg transition">
                    <h3 className="text-2xl font-bold mb-4">{station.name}</h3>
                    
                    <div className="space-y-3">
                      {station.address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">Dirección</p>
                            <p className="font-medium">{station.address}</p>
                          </div>
                        </div>
                      )}

                      {station.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">Teléfono</p>
                            <p className="font-medium">{station.phone}</p>
                          </div>
                        </div>
                      )}

                      {station.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{station.email}</p>
                          </div>
                        </div>
                      )}

                      {station.commander && (
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">Comandante</p>
                            <p className="font-medium">{station.commander}</p>
                          </div>
                        </div>
                      )}

                      {station.personnel && (
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">Personal</p>
                            <p className="font-medium">{station.personnel} bomberos</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay estaciones disponibles</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
