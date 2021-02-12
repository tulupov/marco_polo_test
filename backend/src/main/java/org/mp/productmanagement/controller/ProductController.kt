package org.mp.productmanagement.controller

import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.Flow
import org.mp.productmanagement.entity.Product
import org.mp.productmanagement.repository.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
@RequestMapping("/api")
class ProductController {

    @Autowired
    lateinit var productRepository: ProductRepository

    @FlowPreview
    @GetMapping("/products")
    suspend fun products(): Flow<Product> {
        return try {
            productRepository.findAll()
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/product/{id}")
    suspend fun get(@PathVariable("id") id: Long): Product? {
        return try {
            productRepository.findById(id)
        } catch (e: Exception) {
            if (!productRepository.existsById(id)) {
                throw ResponseStatusException(HttpStatus.NOT_FOUND)
            } else {
                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
            }
        }
    }

    @PostMapping("/product")
    suspend fun insert(@RequestBody product: Product): Product {
        return try {
            productRepository.save(product)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }

    @PutMapping("/product/{id}")
    suspend fun update(@PathVariable("id") id: Long, @RequestBody product: Product): Product {
        return try {
            if (!productRepository.existsById(id)) {
                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
            }
            productRepository.save(product.copy(id = id))
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }

    @DeleteMapping("/product/{id}")
    suspend fun delete(@PathVariable("id") id: Long) {
        try {
            productRepository.deleteById(id)
        } catch (e: Exception) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)
        }
    }
}
