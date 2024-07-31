package com.template.services;

import java.util.List;
import java.util.Random;
import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.template.data.MessageProperties;
import com.template.data.dto.request.ItemRequest;
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

    @Value("${minio.bucketName}")
    private String bucketName;

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

    public ApiResponse<ItemResponse> addItem(ItemRequest request) {
        Item newItem = Item.builder()
                .itemCode("PRD-" + randomNumber())
                .itemPic(imageName(request.getItemPic(), request.getItemName()))
                .itemName(request.getItemName())
                .itemStock(request.getItemStock())
                .itemPrice(request.getItemPrice())
                .isAvailable(true)
                .lastRestock(LocalDate.now())
                .build();

        try {
            Item item = itemRepository.save(newItem);
            ItemResponse response = itemResponseBuilder(item);
            return responseBuilder(response, HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<ItemResponse> updateItem(String id, ItemRequest request) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Item item = itemRepository.getByItemId(Integer.parseInt(id));
            if (item == null || !item.getIsAvailable()) {
                throw new EntityNotFoundException(messageProperties.getMessage("item.not.found"));
            }

            // Delete existing image in minio
            if (item.getItemPic() != null) {
                minioService.delete(item.getItemPic(), bucketName);
            }

            // Update item data
            item.setItemName(request.getItemName());
            item.setItemPic(imageName(request.getItemPic(), request.getItemName()));
            item.setItemStock(request.getItemStock());
            item.setItemPrice(request.getItemPrice());
            item.setLastRestock(LocalDate.now());
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
                .itemPic(generateLink(item.getItemPic()))
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
        return minioService.upload(file, bucketName, name);
    }

    protected String generateLink(String objectName) {
        try {
            return minioService.getLink(bucketName, objectName, 3600L);
        } catch (Exception e) {
            return null;
        }
    }
}
