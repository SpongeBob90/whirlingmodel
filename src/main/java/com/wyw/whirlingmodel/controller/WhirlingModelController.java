package com.wyw.whirlingmodel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author wyw
 * @date 2018\1\31 0031 15:44
 */
@Controller
public class WhirlingModelController {

    @GetMapping(value = "/index")
    public String index() {
        return "html/whirlingModel.html";
    }

}
