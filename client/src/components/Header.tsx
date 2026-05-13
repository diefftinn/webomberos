import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Flame } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigationItems = [
    { label: "Inicio", href: "/" },
    { label: "Noticias", href: "/news" },
    { label: "Servicios", href: "/services" },
    { label: "Estaciones", href: "/stations" },
    { label: "Cursos", href: "/courses" },
    { label: "Galería", href: "/gallery" },
    { label: "Información", href: "/info" },
    { label: "Contacto", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-2xl text-accent hover:opacity-80 transition">
              <Flame className="w-8 h-8 text-accent" />
              <span className="hidden sm:inline">Bomberos Voluntarios zuldemaida</span>
              <span className="sm:hidden">Bomberos</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Bienvenido, {user.name}
                </span>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <a className="text-sm font-medium text-accent hover:underline">
                      Panel Admin
                    </a>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logout()}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => window.location.href = getLoginUrl()}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-md transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-border">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="px-3 py-2 border-t border-border mt-2 pt-2">
              {user ? (
                <>
                  <p className="text-sm text-muted-foreground mb-2">
                    {user.name}
                  </p>
                  {user.role === "admin" && (
                    <Link href="/admin">
                      <a className="block text-sm font-medium text-accent hover:underline mb-2">
                        Panel Admin
                      </a>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => window.location.href = getLoginUrl()}
                >
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
