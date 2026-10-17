import React, { useEffect, useRef, useState } from 'react';

export type RevealAnimation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'fade';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // en milisegundos (ej: 100, 200)
  duration?: number; // en milisegundos (ej: 650)
  threshold?: number; // fracción del elemento visible para activar (ej: 0.15)
  rootMargin?: string;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
  width?: 'full' | 'fit';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  className = '',
  as: Component = 'div',
  width = 'full',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Si el usuario prefiere movimiento reducido, mostrar inmediatamente
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    const currentEl = elementRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentEl);

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, rootMargin, once]);

  // Obtener estilos iniciales vs visibles según la animación
  const getTransformStyles = (): { initial: string; animate: string } => {
    switch (animation) {
      case 'fade-up':
        return {
          initial: 'translate3d(0, 36px, 0)',
          animate: 'translate3d(0, 0, 0)',
        };
      case 'fade-down':
        return {
          initial: 'translate3d(0, -36px, 0)',
          animate: 'translate3d(0, 0, 0)',
        };
      case 'fade-left':
        // Entra desde la derecha deslizándose hacia la izquierda
        return {
          initial: 'translate3d(40px, 0, 0)',
          animate: 'translate3d(0, 0, 0)',
        };
      case 'fade-right':
        // Entra desde la izquierda deslizándose hacia la derecha
        return {
          initial: 'translate3d(-40px, 0, 0)',
          animate: 'translate3d(0, 0, 0)',
        };
      case 'zoom-in':
        return {
          initial: 'scale3d(0.93, 0.93, 1) translate3d(0, 16px, 0)',
          animate: 'scale3d(1, 1, 1) translate3d(0, 0, 0)',
        };
      case 'zoom-out':
        return {
          initial: 'scale3d(1.06, 1.06, 1)',
          animate: 'scale3d(1, 1, 1)',
        };
      case 'fade':
      default:
        return {
          initial: 'translate3d(0, 0, 0)',
          animate: 'translate3d(0, 0, 0)',
        };
    }
  };

  const { initial, animate } = getTransformStyles();

  const dynamicStyles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? animate : initial,
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  };

  return (
    <Component
      ref={elementRef}
      style={dynamicStyles}
      className={`transition-reveal ${
        width === 'full' ? 'w-full' : 'w-auto'
      } ${className}`}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
