const casaTony = { cas_cve_casa: 4 };
const usuarioAlan = { 
  usu_cve_usuario: 2,
  usu_correo: "alan@gmail.com"
 };

const usuarioSher = {
  usu_correo: "sherlyn@gmail.com",
	usu_password: "123456789",
	usu_username: "sher_guz",
	usu_telefono: "7721250490"
}

const cambiosSher = {
	usu_password: "12345678",
	usu_username: "sher@guz",
	usu_telefono: "7721250491"
}

const loginSher = {
	"usu_correo": "sherlyn@gmail.com",
	"usu_password": "123456789"
}

const tokenTony = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwOTU3NDY5Nn0.LRWZ8QkPxFQUNsifqRga5jjFGYSpspZNhfZef6oUua4";
const tokenAlan = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwOTU3NjIwMH0.btxLOAaCbIkhSVnzUomsAkZAg6qjG9wB8YgtTYVr4o0";

module.exports = {
  casaTony,
  usuarioAlan,
  usuarioSher,
  loginSher,
  tokenTony,
  tokenAlan,
  cambiosSher
}