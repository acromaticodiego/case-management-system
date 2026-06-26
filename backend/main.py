from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
# 🆕 Importamos las funciones de cifrado desde tu archivo database
from database import SessionLocal, init_db, UserDB, obtener_hash_contrasenia, verificar_contrasenia

app = FastAPI(title="Sistema de Gestión de Casos - API")

# Inicializar la base de datos al arrancar el microservicio
init_db()

# Configuración de CORS para recibir las peticiones de tus archivos HTML/CSS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite conectar tu Frontend local sin bloqueos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para abrir y cerrar la conexión con la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Reglas de validación para recibir los datos de registro (Pydantic)
class UserRegister(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    confirm_password: str

# Reglas de validación para recibir los datos de inicio de sesión
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Endpoint POST para registrar nuevos usuarios
@app.post("/register")
def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    # 1. Validar que la contraseña coincida con la confirmación
    if user_data.password != user_data.confirm_password:
        raise HTTPException(status_code=400, detail="Las contraseñas no coinciden.")
    
    # 2. Validar que el correo corporativo no exista en la base de datos
    existing_user = db.query(UserDB).filter(UserDB.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo electrónico ya está registrado.")
    
    # 🆕 3. CIFRAR LA CONTRASEÑA ANTES DE GUARDARLA
    # Transformamos el texto plano en un hash seguro e indescifrable
    password_segura = obtener_hash_contrasenia(user_data.password)
    
    # 4. Insertar el nuevo usuario en la tabla de SQLite
    new_user = UserDB(
        fullname=user_data.fullname,
        email=user_data.email,
        hashed_password=password_segura  # <-- Guardamos la versión cifrada
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "status": "success", 
        "message": "Usuario registrado exitosamente en la base de datos", 
        "user_id": new_user.id
    }

# Endpoint POST para validar el inicio de sesión
@app.post("/login")
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    # 1. Buscar si el correo existe en la base de datos
    user = db.query(UserDB).filter(UserDB.email == user_data.email).first()
    
    # 🆕 2. Verificar de manera segura la contraseña usando passlib
    # Si el usuario no existe, o si existe pero la contraseña ingresada no coincide con el hash:
    if not user or not verificar_contrasenia(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400, 
            detail="Usuario o contraseña incorrectos. Por favor, intente de nuevo."
        )
    
    # Si todo coincide con éxito:
    return {
        "status": "success",
        "message": "¡Acceso concedido!",
        "user": {
            "fullname": user.fullname,
            "email": user.email
        }
    }