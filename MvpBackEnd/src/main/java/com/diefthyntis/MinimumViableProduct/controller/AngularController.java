package com.diefthyntis.MinimumViableProduct.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// Ce contrôleur redirige toutes les requêtes non liées à une ressource statique vers index.html, 
// où Angular prendra en charge le routage côté client.

@Controller
public class AngularController {
    @GetMapping("/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/welcome";
    }
}
