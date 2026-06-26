import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext


# Configurar el contenedor de cifrado usando el algoritmo bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 1. Detectar la carpeta actual (PRUEBA_DESARROLLO/backend)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 2. Ruta directa a la subcarpeta 'sqlite3' que está a su mismo nivel
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'sqlite3', 'app_database.db')}"



engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Estructura de la tabla de usuarios
class UserDB(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

# Función para inicializar y generar las tablas automáticamente
def init_db():
    Base.metadata.create_all(bind=engine)


def obtener_hash_contrasenia(password: str) -> str:
    """Recibe la contraseña en texto plano y devuelve el hash cifrado."""
    return pwd_context.hash(password)

def verificar_contrasenia(password_plana: str, password_cifrada: str) -> bool:
    """Compara una contraseña ingresada con el hash guardado en la Base de Datos."""
    return pwd_context.verify(password_plana, password_cifrada)