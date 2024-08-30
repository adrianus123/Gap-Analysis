package com.tujuhsembilan.lokomotifkai.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class TelegramService {
    Logger logger = LoggerFactory.getLogger(TelegramService.class);

    private String telegramBotToken = "6937174399:AAHfUdf99asRVTvjRiDV_IQfX6ebZmEmSkM";

    private String chatId = "6194033764";

    public String sendMessageChatId(String message) {
        String response = "";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String sendMessageUrl = String.format("https://api.telegram.org/bot%s/sendMessage", telegramBotToken);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("chat_id", chatId);
        map.add("text", message);
        map.add("parse_mode", "markdown");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        try {
            response = restTemplate.postForObject(sendMessageUrl, request, String.class);
            logger.info("Summary send successfully to Telegram");
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return response;
    }
}
