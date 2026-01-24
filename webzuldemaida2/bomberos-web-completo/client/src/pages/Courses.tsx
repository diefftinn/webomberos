import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function Courses() {
  const { data: courses, isLoading } = trpc.courses.list.useQuery({ limit: 20, offset: 0 });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Programado";
      case "ongoing":
        return "En Curso";
      case "completed":
        return "Completado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Cursos y Capacitaciones</h1>
            <p className="mt-2 opacity-90">Programas de formación y desarrollo profesional</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando cursos...</p>
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="p-6 hover:shadow-lg transition overflow-hidden">
                    {course.imageUrl && (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold flex-1">{course.title}</h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${getStatusColor(course.status)}`}>
                        {getStatusLabel(course.status)}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                    <div className="space-y-2 mb-4">
                      {course.startDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>Inicio: {new Date(course.startDate).toLocaleDateString('es-CO')}</span>
                        </div>
                      )}

                      {course.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{course.location}</span>
                        </div>
                      )}

                      {course.capacity && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{course.enrolled || 0} / {course.capacity} inscritos</span>
                        </div>
                      )}
                    </div>

                    {course.instructor && (
                      <p className="text-sm text-muted-foreground mb-4">
                        <span className="font-semibold">Instructor:</span> {course.instructor}
                      </p>
                    )}

                    <Button className="w-full">Más Información</Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay cursos disponibles</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
