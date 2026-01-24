import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Heart, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const volunteerSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
  address: z.string().optional(),
  birthDate: z.string().optional(),
  idNumber: z.string().optional(),
  experience: z.string().optional(),
});

type VolunteerForm = z.infer<typeof volunteerSchema>;

export default function Volunteers() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const createVolunteer = trpc.volunteers.create.useMutation();

  const onSubmit = async (data: VolunteerForm) => {
    setIsSubmitting(true);
    try {
      await createVolunteer.mutateAsync(data);
      toast.success("Solicitud de voluntariado enviada exitosamente");
      reset();
    } catch (error) {
      toast.error("Error al enviar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-accent to-accent/80 text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Voluntariado</h1>
            <p className="mt-2 opacity-90">Únete a nuestro equipo de bomberos voluntarios</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Servicio Comunitario</h3>
                <p className="text-muted-foreground">
                  Contribuye al bienestar y seguridad de tu comunidad.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Equipo Profesional</h3>
                <p className="text-muted-foreground">
                  Trabaja con bomberos experimentados y capacitados.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Capacitación</h3>
                <p className="text-muted-foreground">
                  Recibe formación profesional en técnicas de emergencia.
                </p>
              </Card>
            </div>

            {/* Application Form */}
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Formulario de Inscripción</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                    <Input
                      {...register("name")}
                      placeholder="Tu nombre completo"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="tu@email.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Teléfono *</label>
                      <Input
                        {...register("phone")}
                        placeholder="Tu teléfono"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección</label>
                    <Input
                      {...register("address")}
                      placeholder="Tu dirección"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Fecha de Nacimiento</label>
                      <Input
                        {...register("birthDate")}
                        type="date"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cédula/ID</label>
                      <Input
                        {...register("idNumber")}
                        placeholder="Tu número de identificación"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Experiencia Previa</label>
                    <Textarea
                      {...register("experience")}
                      placeholder="Cuéntanos sobre tu experiencia en servicios de emergencia o voluntariado"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Requirements Section */}
            <div className="mt-12 max-w-2xl mx-auto">
              <Card className="p-8 bg-muted">
                <h3 className="text-xl font-bold mb-4">Requisitos</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Ser mayor de 18 años</li>
                  <li>✓ Tener documento de identidad vigente</li>
                  <li>✓ Gozar de buena salud física y mental</li>
                  <li>✓ Disponibilidad para capacitación</li>
                  <li>✓ Compromiso con la seguridad comunitaria</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
