const casaTony = { cas_cve_casa: 1 };

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

const tokenTony = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidG9ueWJhcnF1ZXJhIiwiaWF0IjoxNzEwMzU2ODc1fQ.7GX62x7Cx_yIv0mj73FBS_LpW2FspLRIJiH1J7RJZOs";
const tokenAlan = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWxhbmJhc2lsaW8iLCJpYXQiOjE3MTAzNTY5MzZ9.ob3H5V5Nm9DRb19GO66veoQjvDiZspp31nv4FWEI1FI";

module.exports = {
  casaTony,
  usuarioAlan,
  usuarioSher,
  loginSher,
  tokenTony,
  tokenAlan,
  cambiosSher
}