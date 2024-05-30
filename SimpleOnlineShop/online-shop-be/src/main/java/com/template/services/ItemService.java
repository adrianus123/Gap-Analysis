package com.template.services;

import java.util.List;
import java.util.Random;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.template.data.MessageProperties;
import com.template.data.dto.request.CreateUpdateItem;
import com.template.data.dto.response.ApiResponse;
import com.template.data.dto.response.ItemResponse;
import com.template.models.Item;
import com.template.repositories.ItemRepository;
import com.template.services.minio.MinioService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private MessageProperties messageProperties;

    @Autowired
    private MinioService minioService;

    public ApiResponse<List<ItemResponse>> getItems() {
        List<ItemResponse> itemResponse = new ArrayList<>();

        try {
            List<Item> items = itemRepository.findAll();
            for (Item item : items) {
                if (item.getIsAvailable()) {
                    ItemResponse response = itemResponseBuilder(item);
                    itemResponse.add(response);
                }
            }

            return responseBuilder(itemResponse, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<ItemResponse> getItem(String id) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Item item = itemRepository.getByItemId(Integer.parseInt(id));
            if (item == null || !item.getIsAvailable()) {
                throw new EntityNotFoundException(messageProperties.getMessage("item.not.found"));
            }

            ItemResponse response = itemResponseBuilder(item);
            return responseBuilder(response, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<ItemResponse> addItem(CreateUpdateItem request) {
        Item newItem = Item.builder()
                .itemCode("PRD-" + randomNumber())
                .itemPic(imageName(request.getItemPic(), request.getItemName()))
                .itemName(request.getItemName())
                .itemStock(request.getItemStock())
                .itemPrice(request.getItemPrice())
                .isAvailable(true)
                .build();

        try {
            Item item = itemRepository.save(newItem);
            ItemResponse response = itemResponseBuilder(item);
            return responseBuilder(response, HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<ItemResponse> updateItem(String id, CreateUpdateItem request) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Item item = itemRepository.getByItemId(Integer.parseInt(id));
            if (item == null || !item.getIsAvailable()) {
                throw new EntityNotFoundException(messageProperties.getMessage("item.not.found"));
            }

            item.setItemName(request.getItemName());
            item.setItemPic(imageName(request.getItemPic(), request.getItemName()));
            item.setItemStock(request.getItemStock());
            item.setItemPrice(request.getItemPrice());
            itemRepository.save(item);

            ItemResponse response = itemResponseBuilder(item);
            return responseBuilder(response, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<ItemResponse> deleteItem(String id) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Item item = itemRepository.getByItemId(Integer.parseInt(id));
            if (item == null || !item.getIsAvailable()) {
                throw new EntityNotFoundException(messageProperties.getMessage("item.not.found"));
            }

            item.setIsAvailable(false);
            itemRepository.save(item);

            return responseBuilder(null, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    protected <T> ApiResponse<T> responseBuilder(T data, int statusCode,
            String statusMessage) {
        return ApiResponse.<T>builder()
                .data(data)
                .statusCode(statusCode)
                .statusMessage(statusMessage)
                .build();
    }

    protected ItemResponse itemResponseBuilder(Item item) {
        return ItemResponse.builder()
                .itemId(item.getItemId())
                .itemCode(item.getItemCode())
                .itemPic(item.getItemPic())
                .itemName(item.getItemName())
                .itemStock(item.getItemStock())
                .itemPrice(item.getItemPrice())
                .isAvailable(item.getIsAvailable())
                .lastRestock(item.getLastRestock())
                .build();
    }

    protected String randomNumber() {
        Random random = new Random();
        int randomNumber = random.nextInt(1000000000);
        return String.format("%08d", randomNumber);
    }

    protected String imageName(MultipartFile file, String name) {
        return minioService.upload(file, "simple-online-shop", name);
    }
}
