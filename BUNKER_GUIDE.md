# 🛡️ GUÍA DE DESPLIEGUE: EL BÚNKERO (V16.0.0)

Para que tu "Máquina de Hacer Dinero" sea **100% tuya, privada e inatacable**, sigue estos pasos para desplegar en un **VPS Privado (Hetzner, DigitalOcean o tu propio servidor)**.

## 1. Requisitos del Búnker
- Un VPS con Ubuntu 22.04+ (Recomendado: 2 vCPU, 4GB RAM).
- Dominio propio (opcional pero recomendado para SSL).
- Docker y Docker-Compose instalados.

## 2. Preparación del Código (Ofuscación)
Antes de subir el código al servidor, ejecuta:
```bash
# Instalar PyArmor para cifrar la lógica
python -m pip install pyarmor

# Ofuscar el backend
cd backend
pyarmor gen main.py
```
Esto creará una carpeta `dist/` con tu código **encriptado**. Sube solo el contenido de `dist/` al servidor.

## 3. Despliegue con Docker
En la raíz de tu servidor, usa el archivo `docker-compose.yml` incluido:
```bash
docker-compose up -d --build
```

## 4. Seguridad de Red (Firewall)
Bloquea todos los puertos excepto el **443 (HTTPS)** y el **22 (SSH)**.
Usa **Nginx Proxy Manager** o **Traefik** para gestionar el certificado SSL automáticamente.

## 5. Acceso Soberano
Tu app solo responderá si incluyes tu `SOVEREIGN_KEY` en la pantalla inicial de la Vault. 

> [!IMPORTANT]
> **NUNCA** compartas tu archivo `.env` ni tu `SOVEREIGN_KEY`. Si pierdes la llave, tendrás que resetearla manualmente en el servidor.

---
**Tu soberanía financiera comienza ahora.**
