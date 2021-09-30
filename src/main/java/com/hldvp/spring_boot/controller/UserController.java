package com.hldvp.spring_boot.controller;

import com.hldvp.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping()
public class UserController {

	@Autowired
	private UserService userService;

//	@RequestMapping()
//	public String printWelcome(ModelMap model) {
//		List<String> messages = new ArrayList<>();
//		messages.add("Hello!");
//		messages.add("I'm Spring MVC-SECURITY application");
//		messages.add("5.2.0 version by sep'19 ");
//		model.addAttribute("messages", messages);
//		return "hello";
//	}

	@GetMapping("/{id}")
	public String helloUser(Principal principal,Model model){
		model.addAttribute("user", userService.getUserByUsername(principal.getName()));
		return "user";
	}
}