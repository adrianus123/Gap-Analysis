package com.template.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class MessageProperties {
    @Autowired
    private MessageSource messageSource;

    public String getMessage(String keyword) {
        return messageSource.getMessage(keyword, null, LocaleContextHolder.getLocale());
    }
}
