package ru.russvet.restapi.service;

import io.minio.*;
import io.minio.errors.*;
import io.minio.http.Method;
import liquibase.util.MD5Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.russvet.restapi.exception.ErrorType;
import ru.russvet.restapi.exception.Exc;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Сервис для работы с хранилищем изображений (Minio)
 * @since 23/03/2024
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class MinioService {

    @Value("${minio.bucket}")
    String bucketName;

    @Value("${minio.folder}")
    String folderName;

    private final MinioClient minioClient;

    /**
     * @param imageFile сохраняемое изображение
     * @return имя файлв
     * @apiNote Сохранение изображения в хранилище
     */
    public String saveImage(MultipartFile imageFile) {

        try {
            String encodedFileName = MD5Util.computeMD5(imageFile.getOriginalFilename() + Instant.now());

            if (!isBucketExists()) {
                createBucket();
            }

            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(encodedFileName)
                    .contentType(imageFile.getContentType())
                    .stream(imageFile.getInputStream(), imageFile.getSize(), 0).build());

            return encodedFileName;
        } catch (MinioException | InvalidKeyException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.MINIO_ERROR, ex.getLocalizedMessage());
        } catch (IOException | NoSuchAlgorithmException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.SERVER_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @param imageFile          сохраняемое изображение
     * @param oldEncodedFileName кодированное имя файла старого изображения
     * @return кодированное имя файла
     * @apiNote Обновление изображения в хранилище
     */
    public String updateImage(MultipartFile imageFile, String oldEncodedFileName) {
        try {
            if (!isBucketExists()) {
                throw Exc.gen(ErrorType.MINIO_ERROR,
                        String.format("Bucket: %s не существует", bucketName));
            } else {
                if (isImageExists(oldEncodedFileName)) {
                    deleteImage(oldEncodedFileName);
                }

                String encodedFileName = MD5Util.computeMD5(imageFile.getOriginalFilename() + Instant.now());

                minioClient.putObject(PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(encodedFileName)
                        .contentType(imageFile.getContentType())
                        .stream(imageFile.getInputStream(), imageFile.getSize(), 0).build());

                return encodedFileName;
            }
        } catch (MinioException | InvalidKeyException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.MINIO_ERROR, ex.getLocalizedMessage());
        } catch (IOException | NoSuchAlgorithmException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.SERVER_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @param fileName имя файла
     * @return ссылка на изображение
     * @apiNote Получение ссылки на изображение
     */
    public String getImageSrc(String fileName) {
        if (isBucketExists()) {
            try {
                int MAX_DAYS_COUNT = 7;
                return minioClient.getPresignedObjectUrl(
                        GetPresignedObjectUrlArgs.builder()
                                .method(Method.GET)
                                .bucket(bucketName)
                                .object(fileName)
                                .expiry(MAX_DAYS_COUNT, TimeUnit.DAYS)
                                .build());
            } catch (Exception ex) {
                log.error(ex.getMessage());
                throw Exc.gen(ErrorType.SERVER_ERROR, ex.getLocalizedMessage());
            }
        } else {
            throw Exc.gen(ErrorType.MINIO_ERROR,
                    String.format("Bucket: %s не существует", bucketName));
        }
    }

    /**
     * @param fileName имя файла
     * @apiNote Проверка существования изображения
     */
    public boolean isImageExists(String fileName) throws MinioException,
            InvalidKeyException,
            IOException,
            NoSuchAlgorithmException {
        try {
            minioClient.statObject(StatObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .build());
            return true;
        } catch (ErrorResponseException ex) {
            return false;
        }
    }

    /**
     * @param fileName имя файла
     * @apiNote Удаление изображения
     */
    public void deleteImage(String fileName) throws MinioException,
            InvalidKeyException,
            IOException,
            NoSuchAlgorithmException {
        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .build());
    }

    /**
     * @return результат проверки
     * @apiNote Проверка существования корзинки для изображений
     */
    private boolean isBucketExists() {
        try {
            return minioClient.bucketExists(BucketExistsArgs.builder()
                    .bucket(bucketName)
                    .build());
        } catch (Exception ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.MINIO_ERROR,
                    String.format("Ошибка проверки существования bucket: %s", bucketName));
        }
    }

    /**
     * @apiNote Создание корзинки для изображений, если её нет
     */
    private void createBucket() {
        try {
            minioClient.makeBucket(
                    MakeBucketArgs.builder()
                            .bucket(bucketName)
                            .objectLock(true)
                            .build());
        } catch (Exception ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.MINIO_ERROR);
        }
    }
}