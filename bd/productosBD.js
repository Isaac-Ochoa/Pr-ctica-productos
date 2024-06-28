const ConectarBD=require("./conectarBD");

class productosBD extends ConectarBD{
    constructor(){
        super();
    }

    async nuevoProducto(producto){
        const sql="INSERT INTO productos values (null,'"+producto.nombre+"','"+producto.descripcion+"','"+producto.precio+"');";
        try {
        await this.conectarMysql();
        await this.conexion.execute(sql);
        console.log("Crea un nuevo producto");
        await this.cerrarConexion();
        } catch (error) {
            console.log("Error al agreagar el producto "+error);
        }
    }

    async mostrarProducto() {
        const sql="SELECT * FROM productos;";
        try {
            await this.conectarMysql();
            const [productosMySql]=await this.conexion.query(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return(productosMySql);
        } catch (error) {
            console.log("Error al obtener los datos");
            console.error(sql);
            
        }
    }

  async productoId(id){
    const sql="SELECT * FROM productos WHERE id_prod = "+id+";";
    try {
        await this.conectarMysql();
        const [[producto]]= await this.conexion.execute(sql);
        await this.cerrarConexion();
        console.log("Consulta correcta por id");
        return producto;
    } catch (error) {
        console.error("Error al consultar por id "+ error);
        console.error(sql);
    }

  }
  async editarProducto(producto){
    
    const sql2=`UPDATE productos SET 
    nombre='${producto.nombre}',
    descripcion='${producto.descripcion}',
    precio='${producto.precio}'
    WHERE id_prod=${producto.id_prod};`;
    try {
        await this.conectarMysql();
        await this.conexion.execute(sql2)
        await this.cerrarConexion();
        console.log("Actualizacion correcta del producto ");
    } catch (error) {
        console.error("Error al editar producto "+ error);
        console.error(sql2);
        
    }
  }

  async borrarProducto(id_prod){
    const sql="DELETE FROM productos WHERE id_prod="+id_prod;
    try {
        await this.conectarMysql();
        await this.conexion.execute(sql);
        await this.cerrarConexion();
        console.log("producto borrado");

    } catch (error) {
        console.error("Error al borrar el producto");
        console.log(sql);
    }
  }

}

module.exports=productosBD;