import { Link } from "wouter";
import { Flame, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6" />
              <span className="font-bold text-lg">Bomberos Voluntarios Zuldemaida</span>
            </div>
            <p className="text-sm opacity-80">
              Dedicados a servir y proteger a nuestra comunidad con profesionalismo y compromiso.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news">
                  <a className="hover:opacity-80 transition">Noticias</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:opacity-80 transition">Servicios</a>
                </Link>
              </li>
              <li>
                <Link href="/stations">
                  <a className="hover:opacity-80 transition">Estaciones</a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="hover:opacity-80 transition">Cursos</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/info">
                  <a className="hover:opacity-80 transition">Acerca de Nosotros</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="hover:opacity-80 transition">Galería</a>
                </Link>
              </li>
              <li>
                <Link href="/volunteers">
                  <a className="hover:opacity-80 transition">Voluntariado</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:opacity-80 transition">Contacto</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Emergencia: 3104401602</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>(+57) 3104401602</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@bomberos.local</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Armenia Quindio, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80">
            <p>&copy; 2026 Benemérito Cuerpo de Bomberos Voluntarios zuldemaida Armenia Quindio. Todos los derechos reservados diefertisoft.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100 transition">Política de Privacidad</a>
              <a href="#" className="hover:opacity-100 transition">Términos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
