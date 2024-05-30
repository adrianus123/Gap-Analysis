package com.template.services.minio;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.InsufficientDataException;
import io.minio.errors.InternalException;
import io.minio.errors.InvalidResponseException;
import io.minio.errors.ServerException;
import io.minio.errors.XmlParserException;
import io.minio.http.Method;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MinioService {
    private final MinioClient minioClient;

    public String getLink(String bucket, String filename, Long expiry) throws InvalidKeyException,
            ErrorResponseException, InsufficientDataException, InternalException, InvalidResponseException,
            NoSuchAlgorithmException, XmlParserException, ServerException, IllegalArgumentException, IOException {

        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.GET)
                        .bucket(bucket)
                        .object(filename)
                        .expiry(Math.toIntExact(expiry), TimeUnit.SECONDS)
                        .build());
    }

    @Data
    @Builder
    public static class UploadOption {
        private String filename;
    }

    public void upload(MultipartFile file, String bucket, Function<MultipartFile, UploadOption> modifier) {
        try {
            UploadOption opt = modifier.apply(file);

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(opt.filename)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build());
        } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | ServerException | XmlParserException
                | IllegalArgumentException | IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public String upload(MultipartFile file, String bucket, String fileName) {
        String name = fileName + "_" + System.currentTimeMillis();
        this.upload(file, bucket,
                o -> {
                    return UploadOption.builder()
                            .filename(name)
                            .build();
                });

        return name;
    }

    public void delete(String objName, String bucket) throws InvalidKeyException,
            ErrorResponseException,
            InsufficientDataException, InternalException, InvalidResponseException,
            NoSuchAlgorithmException,
            ServerException, XmlParserException, IllegalArgumentException, IOException {
        minioClient.removeObject(RemoveObjectArgs.builder().bucket(bucket).object(objName).build());
    }
}
