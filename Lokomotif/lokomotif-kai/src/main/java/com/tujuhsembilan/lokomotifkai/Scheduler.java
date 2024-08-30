package com.tujuhsembilan.lokomotifkai;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.tujuhsembilan.lokomotifkai.dto.DummyDto;
import com.tujuhsembilan.lokomotifkai.model.Summary;
import com.tujuhsembilan.lokomotifkai.service.DummyService;
import com.tujuhsembilan.lokomotifkai.service.LokomotifService;
import com.tujuhsembilan.lokomotifkai.service.TelegramService;

@Component
public class Scheduler {
    private final DummyService dummyService;
    private final LokomotifService lokomotifService;
    private final TelegramService telegramService;

    Logger logger = LoggerFactory.getLogger(getClass().getName());
    private Random random = new Random();
    private Integer locoNumber = 1;

    public Scheduler(DummyService dummyService, LokomotifService lokomotifService, TelegramService telegramService) {
        this.dummyService = dummyService;
        this.lokomotifService = lokomotifService;
        this.telegramService = telegramService;
    }

    @Scheduled(fixedRate = 10000)
    public void createDummyData() {
        String randomNumber = getRandomNumberWithFormat();
        String[] status = { "Beroperasi", "Tidak Beroperasi" };

        DummyDto data = new DummyDto();
        data.setLocoCode("LOK-" + randomNumber);
        data.setLocoName("Lokomotif " + randomNumber);
        data.setLocoWeight(getRandomNumber(100, 120));
        data.setLocoHeight(getRandomNumber(4, 5));
        data.setLocoLength(getRandomNumber(10, 12));
        data.setLocoWidth(getRandomNumber(2.5, 3));
        data.setLocoStatus(status[(random.nextInt(status.length))]);
        data.setTimestamps(LocalDateTime.now().toString());

        locoNumber++;
        String response = dummyService.sendDummyDataScheduler(data);
        logger.info(response);
    }

    @Scheduled(fixedRate = 3600000)
    public void storeSummaryData() {
        try {
            Summary response = lokomotifService.storeSummary();
            telegramService.sendMessageChatId(summaryReport(response.getTimestamps(), response.getTotalLoco(),
                    response.getTotalLocoActive(), response.getTotalLocoInActive()));
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    public double getRandomNumber(double min, double max) {
        double number = (Math.random() * (max - min)) + min;
        return Math.round(number * 100.0) / 100.0;
    }

    public String getRandomNumberWithFormat() {
        int randomNumber = this.random.nextInt(100000);
        DecimalFormat df = new DecimalFormat("00000");
        return df.format(randomNumber);
    }

    public String summaryReport(LocalDateTime date, long totalLoco, long totalActive, long totalInactive) {
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("EEEE, dd-MM-yyyy HH:mm:ss");
        return "Summary Report\n" + "Date: " + date.format(dateFormat) + " \n" + "Total Locomotive: " + totalLoco + "\n"
                + "Total Locomotive Active: "
                + totalActive + "\n" + "Total Locomotive Inactive: " + totalInactive + "\n";
    }
}
