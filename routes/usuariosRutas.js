const ruta=require("express").Router();
const usuarioClase=require("../clases/UsuarioClase")
const UsuarioBD=require("../bd/usuariosBD");
const productosBD = require("../bd/productosBD");
const productoClase=require("../clases/productoClase");
const Producto = require("../clases/productoClase");


ruta.get("/", (req,res)=>{
    res.render("formulario");
})



ruta.post("/agregarUsuario",(req,res)=>{
        var usuario1=new usuarioClase(req.body);
        console.log(usuario1.mostrarDatos);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            const usuariobd=new UsuarioBD();
            usuariobd.nuevoUsuario(usuario1.mostrarDatos);
            res.redirect("/mostrarUsuario");
        }
        else{
            res.render("error")
        }
         
});

ruta.get("/mostrarUsuario",async(req,res)=>{
    const usuariobd=new UsuarioBD();
    const usuariosMySql=await usuariobd.mostrarUsuarios();
    var usuariosCorrectos=[];
    usuariosMySql.forEach(usuario => {
       var usuario1 = new usuarioClase(usuario);
       if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
          usuariosCorrectos.push(usuario);
       }
       
   }); 
   res.render ("mostrarUsuarios",{usuariosCorrectos}); 
});

ruta.get("/editarUsuario/:idusuario", async(req,res)=>{
    try {
        const usuariobd=new UsuarioBD();
        const usuario= await usuariobd.usuarioId(req.params.idusuario);
        //console.log(usuario);
        res.render("editarUsuario",usuario);
    } catch (error) {
        console.log(error);
        res.end();
    }
    
});

ruta.post("/editarUsuario", async(req,res)=>{
    try {
        const usuariobd= new UsuarioBD();
        console.log(req.body);
        await usuariobd.editarUsuario(req.body);
        console.log("Usuario editado correctamente"); 
        res.redirect("/");
    } catch (error) {
        console.log("Error al editar el usuario");
    }
        
});

ruta.get("/borrarUsuario/:idusuario",async (req,res)=>{
  try {
   const usuariobd = new UsuarioBD();
   await usuariobd.borrarUsuario(req.params.idusuario);
   res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

ruta.post("/agregarProducto",(req,res)=>{
    var producto1=new productoClase(req.body);
    console.log(producto1.mostrarDatos);
    if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.precio!=undefined){
        const productobd=new productosBD();
        productobd.nuevoProducto(producto1.mostrarDatos);
        res.redirect("/mostrarProducto");
    }
    else{
        res.render("error")
    }
     
});

ruta.get("/agregarProducto",(req,res)=>{
    res.render("formularioP")
});

ruta.get("/mostrarProducto",async(req,res)=>{
    const productobd=new productosBD();
    const productosMySql=await productobd.mostrarProducto();
    var productosCorrectos=[];
    productosMySql.forEach(producto => {
       var producto1 = new productoClase(producto);
       if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.precio!=undefined){
        productosCorrectos.push(producto);
       }
       
   }); 
   res.render ("mostrarProducto",{productosCorrectos}); 
});

ruta.get("/editarProducto/:id_prod", async(req,res)=>{
    try {
        const productobd=new productosBD();
        const producto= await productobd.productoId(req.params.id_prod);
        
        res.render("editarProducto",producto);
    } catch (error) {
        console.log(error);
        res.end();
    }
    
});

ruta.post("/editarProducto", async(req,res)=>{
    try {
        const productobd= new productosBD();
        console.log(req.body);
        await productobd.editarProducto(req.body);
        console.log("Producto editado correctamente"); 
        res.redirect("/mostrarProducto");
    } catch (error) {
        console.log("Error al editar el Producto");
    }
        
});

ruta.get("/borrarProducto/:id_prod",async (req,res)=>{
  try {
   const productobd = new productosBD();
   await productobd.borrarProducto(req.params.id_prod);
   res.redirect("/mostrarProducto");
  } catch (error) {
    console.log(error);
  }
});
module.exports=ruta;
