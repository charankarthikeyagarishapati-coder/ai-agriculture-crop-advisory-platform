# API Documentation - AI Agriculture Crop Advisory Platform

Base URL: `/api`

All request & response payloads use `application/json` unless uploading multipart form data.
Authenticated endpoints require a Bearer token header: `Authorization: Bearer <jwt_token>`

---

## 1. Authentication APIs

### `POST /auth/register`
Creates a new farmer or admin account.
- **Request Body:**
```json
{
  "email": "farmer@example.com",
  "password": "securepassword123",
  "name": "Alex Farmer",
  "role": "farmer",
  "location": "Fresno, CA",
  "farm_size_acres": 30,
  "soil_type": "Loamy"
}
```
- **Response (201 Created):**
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "uuid",
    "email": "farmer@example.com",
    "name": "Alex Farmer",
    "role": "farmer"
  }
}
```

### `POST /auth/login`
Authenticates a user and returns a JWT token.
- **Request Body:**
```json
{
  "email": "farmer@agri.ai",
  "password": "password123"
}
```
- **Response (200 OK):**
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "11111111-1111-1111-1111-111111111111",
    "email": "farmer@agri.ai",
    "name": "John Deere Farmer",
    "role": "farmer"
  }
}
```

---

## 2. Crop Advisory & Health Diagnosis APIs

### `POST /advisory`
Generates personalized agricultural advice using Gemini 3.6 / 1.5 Pro AI.
- **Request Body:**
```json
{
  "crop_name": "Tomato",
  "soil_type": "Loamy",
  "growth_stage": "Flowering",
  "location": "Central Valley, CA",
  "symptoms": ["Yellowing leaves", "Leaf curl"],
  "irrigation_method": "Drip"
}
```
- **Response (200 OK):**
```json
{
  "id": "uuid",
  "title": "Tomato Foliar Health & Nutrient Recovery Plan",
  "recommendations": [
    "Apply targeted calcium nitrate foliar spray to correct leaf curl.",
    "Monitor night temperatures to adjust irrigation timing."
  ],
  "fertilizer": "Apply N-P-K 10-10-20 with soluble Calcium (15 lbs/acre)",
  "irrigation": "Drip irrigation at 1.5 inches per week in two split applications",
  "prevention": [
    "Sanitize pruning tools between rows",
    "Maintain mulch layer to preserve root moisture"
  ],
  "risk_level": "Medium"
}
```

### `POST /diagnosis`
Analyzes crop leaf images to diagnose diseases via Google Gemini Multimodal Vision API.
- **Request Body:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "crop_name": "Tomato",
  "location": "Fresno, CA"
}
```
- **Response (200 OK):**
```json
{
  "id": "uuid",
  "disease": "Tomato Early Blight (Alternaria solani)",
  "confidence": 92.5,
  "recommendations": [
    "Apply copper hydroxide or chlorothalonil spray.",
    "Remove infected lower foliage."
  ],
  "fertilizer": "Foliar application of Potassium & Zinc sulfate",
  "irrigation": "Avoid overhead watering; maintain morning drip irrigation",
  "prevention": [
    "Practice 3-year crop rotation",
    "Use resistant cultivars"
  ],
  "symptoms_detected": [
    "Concentric rings on lower leaves",
    "Yellow chlorotic halo"
  ],
  "severity": "Moderate"
}
```

---

## 3. History & Weather APIs

### `GET /history`
Returns past advisories and crop disease diagnoses for the authenticated farmer.
- **Query Params:** `type=all|advisory|diagnosis`, `search=tomato`, `limit=20`
- **Response (200 OK):**
```json
{
  "advisories": [...],
  "diagnoses": [...]
}
```

### `GET /weather`
Fetches live agricultural weather forecasts (temperature, humidity, evapotranspiration, rain risk).
- **Query Params:** `location=Fresno, CA` or `lat=36.74&lon=-119.77`
- **Response (200 OK):**
```json
{
  "location": "Fresno, CA",
  "temperature": 28.2,
  "humidity": 58,
  "condition": "Clear",
  "wind_speed": 10.2,
  "precipitation_probability": 5,
  "evapotranspiration_mm": 5.1,
  "forecast": [...]
}
```

---

## 4. User Profile & Admin APIs

### `GET /profile` & `PUT /profile`
Gets or updates user profile settings (farm location, default soil type, farm size).

### `GET /admin/stats`
Access restricted to `admin` role. Returns platform usage metrics, user demographics, top diagnosed diseases, and system logs.
