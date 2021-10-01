package com.hldvp.spring_boot.controller;

import com.hldvp.spring_boot.model.User;
import com.hldvp.spring_boot.service.RoleService;
import com.hldvp.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Controller
@RequestMapping()
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/admins")
    public String allUser(Model model){
        model.addAttribute("users",userService.getAllUsers());
        model.addAttribute("roles",roleService.getAllRoles());
        model.addAttribute("user", new User());
        return "/admins";
    }

    @GetMapping("/user")
    public String helloUser(Principal principal, Model model){
        //model.addAttribute("user", userService.getUserByUsername(principal.getName()));
        return "/user";
    }

//    @GetMapping("/new")
//    public String addNewUser(Model model){
//        model.addAttribute("user", new User());
//        return "/new";
//    }

    @PostMapping("/admins")
    public String createUser(@ModelAttribute("user") User user,
                             @RequestParam(value = "select_role", required = false) String[] role){
        userService.saveUser(user, role);
        return "redirect:/admins";
    }

//    @GetMapping("/{id}/update")
//    public String editUser(@PathVariable("id") long id, Model model){
//        model.addAttribute("user", userService.getUserById(id));
//        return "update";
//    }

    @PatchMapping("/{id}")
    public String updateUser(@ModelAttribute("user") User user,
                             @RequestParam(value = "select_role",required = false) String[] role){
        userService.saveUser(user, role);
        return "redirect:/admins";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") long id){
        userService.deleteUser(id);
        return "redirect:/admins";
    }
}
