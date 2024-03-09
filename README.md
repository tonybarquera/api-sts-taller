# api-sts-taller

## 🔥 Rutas Funcionales

### 😎 Usuario 
> [ GET ] /api/v1/usuario 

> [ GET ] /api/v1/usuario/:usu_cve_usuario $Obtener usuario por id$

> **[ POST ]** /api/v1/usuario $Crear un nuevo usuario$

### 🏠 Casa
> **[ POST ]** /api/v1/casa

### 👨‍👩‍👧‍👦 Grupo
> [ POST ] /api/v1/grupo $Crear grupo$

> **[ POST ]** /api/v1/grupo/entraUsuario/:cas_cve_casa $Usuario se una a grupo$

> **[ DELETE ]** /api/v1/grupo/saleUsuario/:cas_cve_casa $Usuario sale de grupo$

> [ POST ] /api/v1/grupo/agregarUsuario/:usu_cve_usuario $Admin agrega usuario por id$

> **[ POST ]** /api/v1/grupo/agregarUsuario $Admin agrega usuario por correo$

> **[ DELETE ]** /api/v1/grupo/eliminarUsuario/:usu_cve_usuario $Admin elimina usuario por id$

### ❗Pendiente
> [ UPDATE ] /api/v1/usuario/:usu_cve_usuario

> [ DELETE ] /api/v1/usuario/:usu_cve_usuario