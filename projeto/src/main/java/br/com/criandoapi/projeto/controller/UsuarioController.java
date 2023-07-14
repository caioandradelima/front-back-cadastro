package br.com.criandoapi.projeto.controller;

import br.com.criandoapi.projeto.DAO.Iusuario;
import br.com.criandoapi.projeto.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")

public class UsuarioController{
    @Autowired
    private Iusuario dao;

    @GetMapping
    public List<Usuario> listaUsuarios (){

        return (List<Usuario>) dao.findAll();
    }
    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo = dao.save(usuario);
        return usuarioNovo;
    }

    @PutMapping("/{id}")
    public Usuario editarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) {
        usuario.setId(id); // Definir o ID recebido no objeto Usuario

        Usuario usuarioAtualizado = dao.save(usuario);
        return usuarioAtualizado;
    }


    @DeleteMapping("/{id}")
    public Optional<Usuario> excluirUsuario(@PathVariable  Integer id){
        Optional <Usuario> usuario = dao.findById(id);
        dao.deleteById(id);
        return usuario;
    }

}
