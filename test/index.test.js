const { appExpress, closeServer } = require('./../index.js');
const { casaTony, usuarioAlan, usuarioSher, loginSher, tokenTony, tokenAlan, cambiosSher } = require('./values.js');
const request = require('supertest');

describe('[ GRUPO ]', () => {
  describe('[ USUARIO ]', () => {
    let tokenSher = "";

    test('[ POST ] creación de usuario', async () => {
      await request(appExpress)
        .post(`/api/v1/usuario`)
        .send(usuarioSher)
        .expect(201)
        .expect('Content-Type', /json/);
    });

    test('[ AUTH ] usuario inicia sesión', async () => {
      const response = await request(appExpress)
        .post(`/api/v1/auth/login`)
        .send(loginSher)
        .expect(200)
        .expect('Content-Type', /json/);

      tokenSher = response.body.token;
    });

    test('[ UPDATE ] actualizar datos de usuario', async () => {
      const response = await request(appExpress)
        .put(`/api/v1/usuario`)
        .set('Authorization', `Bearer ${tokenSher}`)
        .send(cambiosSher)
        .expect(200)
        .expect('Content-Type', /json/);
      
      expect(response.body[0]).toEqual(1);
    });

    test('[ UPDATE - ERROR ] datos incorrectos', async () => {
      await request(appExpress)
        .put(`/api/v1/usuario`)
        .set('Authorization', `Bearer ${tokenSher}`)
        .send({ telefono: "7721250490" })
        .expect(500)
        .expect('Content-Type', /json/);
    });

    test('[ DELETE ] eliminar cuenta del usuario', async () => {
      await request(appExpress)
        .delete(`/api/v1/usuario`)
        .set('Authorization', `Bearer ${tokenSher}`)
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });

  describe('[ USUARIO - GRUPO ]', () => {
    test('[ POST ] usuario entra grupo', async () => {
      await request(appExpress)
        .post(`/api/v1/grupo/entraUsuario/${ casaTony.cas_cve_casa }`)
        .set('Authorization', `Bearer ${ tokenAlan }`)
        .expect(201)
        .expect('Content-Type', /json/);
    });

    test('[ POST - ERROR ] usuario ya esta en el grupo', async () => {
      await request(appExpress)
        .post(`/api/v1/grupo/entraUsuario/${ casaTony.cas_cve_casa }`)
        .set('Authorization', `Bearer ${ tokenAlan }`)
        .expect(500)
        .expect('Content-Type', /json/);
    });

    test('[ DELETE ] usuario sale del grupo', async () => {
      await request(appExpress)
        .delete(`/api/v1/grupo/saleUsuario/${ casaTony.cas_cve_casa }`)
        .set('Authorization', `Bearer ${ tokenAlan }`)
        .expect(200)
        .expect('Content-Type', /json/);
    });

    test('[ DELETE - ERROR ] usuario no pertenece al grupo', async () => {
      await request(appExpress)
        .delete(`/api/v1/grupo/saleUsuario/${ casaTony.cas_cve_casa }`)
        .set('Authorization', `Bearer ${ tokenAlan }`)
        .expect(500)
        .expect('Content-Type', /json/);
    });
  });

  describe('[ ADMIN - GRUPO ]', () => {
    test('[ POST ] admin agrega usuario por correo', async () => {
      await request(appExpress)
        .post(`/api/v1/grupo/agregarUsuario`)
        .set('Authorization', `Bearer ${ tokenTony }`)
        .send({ usu_correo: usuarioAlan.usu_correo })
        .expect(201)
        .expect('Content-Type', /json/);
    });

    test('[ POST - ERROR ] el usuario ya esta en el grupo', async () => {
      await request(appExpress)
        .post(`/api/v1/grupo/agregarUsuario`)
        .set('Authorization', `Bearer ${ tokenTony }`)
        .send({ usu_correo: usuarioAlan.usu_correo })
        .expect(500)
        .expect('Content-Type', /json/);
    });

    test('[ DELETE ] admin elimina usuario del grupo', async () => {
      await request(appExpress)
        .delete(`/api/v1/grupo/eliminarUsuario/${ usuarioAlan.usu_cve_usuario }`)
        .set('Authorization', `Bearer ${ tokenTony }`)
        .expect(200)
        .expect('Content-Type', /json/)
    });

    test('[ DELETE - ERROR ] el usuario no esta en el grupo', async () => {
      await request(appExpress)
        .delete(`/api/v1/grupo/eliminarUsuario/${ usuarioAlan.usu_cve_usuario }`)
        .set('Authorization', `Bearer ${ tokenTony }`)
        .expect(500)
        .expect('Content-Type', /json/)
    });
  });
});

closeServer();