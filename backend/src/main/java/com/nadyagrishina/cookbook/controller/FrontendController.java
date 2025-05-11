package com.nadyagrishina.cookbook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    @RequestMapping({
            "/", "/login", "/register", "/profile", "/create-recipe", "/edit/**", "/recipe/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
}

