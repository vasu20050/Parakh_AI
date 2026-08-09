import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "Parakh AI"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    
    # 100% Free Local Database & Storage
    DATABASE_URL: str = "sqlite+aiosqlite:///./parakh_ai.db"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    JWT_SECRET_KEY: str = "local_open_source_parakh_ai_key_2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    
    # File Storage
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE_MB: int = 100
    
    # 100% Free Open-Source Engines
    USE_LOCAL_OPEN_SOURCE_ONLY: bool = True
    OLLAMA_URL: str = "http://localhost:11434/api/generate"
    OLLAMA_MODEL: str = "llama3"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
