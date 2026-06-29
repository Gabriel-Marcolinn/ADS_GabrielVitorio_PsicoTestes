package com.psicotestes.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }

    @GetMapping(value = "/{path:[^\\.]*}/{subpath:[^\\.]*}")
    public String forwardNested() {
        return "forward:/index.html";
    }
}
