const boom = require('boom');
const sequelize = require('./../libs/database');
const { models } = require('./../libs/database');

class DespensaService {
  constructor() {

  }

  async obtenerDespensaCategoria(gru_cve_usuario, cat_cve_categoria) {
    const { gru_cve_casa } = await models.Grupo.findOne({
      where: {
        gru_cve_usuario: gru_cve_usuario
      }
    });

    if(!gru_cve_casa) {
      throw boom.badData('El usuario no pertenece a una casa');
    }

    const sqlQuery = `SELECT des_cve_despensa, pro_nombre, des_cantidad, CONCAT(des_contenido_neto, ' ', uni_nombre) AS contenido, des_vencimiento, pro_descripcion FROM despensa, producto, unidad WHERE des_cve_casa = ${gru_cve_casa} AND des_cve_producto = pro_cve_producto AND pro_cve_categoria = ${cat_cve_categoria} AND des_cve_unidad = uni_cve_unidad`;

    const result = await sequelize.query(sqlQuery);
    return result[0];
  }

  async eliminarDespensa(gru_cve_usuario, des_cve_despensa, des_cantidad_eliminar) {
    let result = { gru_cve_usuario, des_cve_despensa, des_cantidad_eliminar };
    
    // obtener casa del usuario
    const { gru_cve_casa } = await models.Grupo.findOne({
      where: {
        gru_cve_usuario: gru_cve_usuario
      }
    });

    if(!gru_cve_casa) {
      throw boom.badData('El usuario no pertenece a una casa');
    }

    // validar que despensa pertenece a la casa
    const despensa = await models.Despensa.findOne({
      where: {
        des_cve_despensa: des_cve_despensa
      }
    });

    if(!despensa) {
      throw boom.badData('Esta despensa no pertenece a la casa');
    }

    // validar que des_cantidad > des_cantidad_eliminar
    const { des_cantidad } = despensa;

    if(des_cantidad_eliminar > des_cantidad) {
      throw boom.badData('No podemos eliminar más productos de los que hay');
    }

    // [UPD] si des_cantidad_eliminar < des_cantidad
    // [DEL] si des_cantidad_eliminar == des_cantidad 
    if(des_cantidad_eliminar < des_cantidad) {
      const cantidad = des_cantidad - des_cantidad_eliminar;

      result = await models.Despensa.update({ des_cantidad: cantidad }, {
        where: {
          des_cve_despensa: des_cve_despensa
        }
      });
    } else {
      result = await models.Despensa.destroy({
        where: {
          des_cve_despensa: des_cve_despensa
        }
      });
    }    
    
    return result;
  }
}

module.exports = DespensaService;